package com.cs.simplesurveymanager.api.survey.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cs.simplesurveymanager.api.survey.vo.SurveyQuestionVO;
import com.cs.simplesurveymanager.entity.Survey;
import com.cs.simplesurveymanager.entity.SurveyParticipant;
import com.cs.simplesurveymanager.entity.SurveyParticipantAnswer;
import com.cs.simplesurveymanager.entity.SurveyQuestion;
import com.cs.simplesurveymanager.service.SurveyParticipantService;
import com.cs.simplesurveymanager.service.SurveyQuestionService;
import com.cs.simplesurveymanager.service.SurveyService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/survey")
public class SurveyController {

	@Autowired
	private SurveyService surveyService;

	@Autowired
	private SurveyQuestionService surveyQuestionService;

	@Autowired
	private SurveyParticipantService surveyParticipantService;

	@GetMapping()
	private ResponseEntity<List<Survey>> get() {
		List<Survey> surveyList = surveyService.findAll();
		return ResponseEntity.ok(surveyList);
	}

	@GetMapping("/{id}")
	public ResponseEntity<SurveyQuestionVO> getById(@PathVariable("id") long id) {
		Survey survey = surveyService.findById(id);
		if (survey != null) {
			List<SurveyQuestion> questions = surveyQuestionService.findBySurveyId(survey.getId());
			SurveyQuestionVO surveyQuestionVO = new SurveyQuestionVO(survey, questions);
			return ResponseEntity.ok(surveyQuestionVO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("/{id}/share")
	public ResponseEntity<Void> share(@PathVariable("id") long surveyId, @RequestBody List<String> emails) {
		Survey survey = surveyService.findById(surveyId);
		if (survey != null) {
			for (String email : emails) {
				try {
					String token = surveyService.share(survey, email);

					System.out.println("localhost:8080/survey/attend/" + token);
					// TODO send mail
				} catch (Exception e) {
					return ResponseEntity.badRequest().build();
				}
			}
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/attend/{token}")
	public ResponseEntity<SurveyQuestionVO> attend(@PathVariable("token") String token) {
		SurveyParticipant participant = surveyParticipantService.findByToken(token);

		if (participant != null) {
			List<SurveyQuestion> questions = surveyQuestionService.findBySurveyId(participant.getSurvey().getId());
			SurveyQuestionVO surveyQuestionVO = new SurveyQuestionVO(participant.getSurvey(), questions);
			return ResponseEntity.ok(surveyQuestionVO);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("/answer/{token}")
	public ResponseEntity<Void> answer(@PathVariable("token") String token, @RequestBody List<SurveyParticipantAnswer> answers) {
		SurveyParticipant participant = surveyParticipantService.findByToken(token);

		if (participant != null) {
			if (participant.getAnswers() != null && !participant.getAnswers().isEmpty()) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
			}

			List<SurveyQuestion> questions = surveyQuestionService.findBySurveyId(participant.getSurvey().getId());

			// if all questions were answered then save else return error
			if (questions.stream().allMatch(q -> answers.stream().anyMatch(a -> a.getSurveyQuestion().getId() == q.getId()))) {
				participant.setAnswers(answers);

				// compute score via coefficient average of answers
				double score = answers.stream().mapToDouble(answer -> {
					// find and return coefficient
					return questions.stream()
							.filter(question -> question.getId() == answer.getSurveyQuestion().getId())
							.map(question -> {
								// find selected label then return coefficient
								// if selected label is not in options then return 0
								// to handle non-optional questions
								return question.getOptions().stream()
									.filter(option -> option.getLabel().equals(answer.getAnswer()))
									.map(option -> option.getCoefficient())
									.findFirst().orElse(0.0);
							}).findFirst().orElse(0.0);
				}).average().orElse(0.0);

				participant.setScore(score);

				surveyService.handleAttendee(participant);

				return ResponseEntity.ok().build();
			} else {
				return ResponseEntity.badRequest().build();
			}
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
