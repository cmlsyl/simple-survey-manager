package com.cs.simplesurveymanager.service;

import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cs.simplesurveymanager.entity.Survey;
import com.cs.simplesurveymanager.entity.SurveyParticipant;
import com.cs.simplesurveymanager.repository.SurveyRepository;

@Service
public class SurveyService {

	@Autowired
	private SurveyRepository surveyRepository;

	@Autowired
	private SurveyParticipantService surveyParticipantService;

	public Survey save(Survey survey) {
		return surveyRepository.save(survey);
	}

	public List<Survey> findAll() {
		return surveyRepository.findAll();
	}

	public Survey findById(long id) {
		return surveyRepository.findById(id);
	}

	@Transactional
	public String share(Survey survey, String email) {
		String token = new String(Base64.getEncoder().encode(String.format("%d-%s", survey.getId(), email).getBytes()));

		SurveyParticipant participant = new SurveyParticipant();
		participant.setToken(token);
		participant.setSurvey(survey);
		surveyParticipantService.save(participant);

		survey.setShareCount(survey.getShareCount() + 1);
		save(survey);

		return token;
	}

	@Transactional
	public void handleAttendee(SurveyParticipant participant) {
		surveyParticipantService.save(participant);

		Survey survey = findById(participant.getSurvey().getId());

		int attendeeCount = survey.getAttendeeCount();
		double surveyScore = ((survey.getScore() * attendeeCount) + participant.getScore()) / (attendeeCount + 1);

		survey.setScore(surveyScore);
		survey.setAttendeeCount(attendeeCount + 1);
		save(survey);
	}
}
