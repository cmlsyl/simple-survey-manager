package com.cs.simplesurveymanager.util;

import java.util.Arrays;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cs.simplesurveymanager.entity.Survey;
import com.cs.simplesurveymanager.entity.SurveyQuestion;
import com.cs.simplesurveymanager.entity.SurveyQuestionOption;
import com.cs.simplesurveymanager.service.SurveyQuestionService;
import com.cs.simplesurveymanager.service.SurveyService;

@Component
public class InitialSurveyGenerator {

	@Autowired
	private SurveyService surveyService;

	@Autowired
	private SurveyQuestionService surveyQuestionService;

	@PostConstruct
	private void init() {
		insertJobSatisfactionSurvey();
	}

	private void insertJobSatisfactionSurvey() {
		Survey survey = new Survey();
		survey.setDescription("Job Satisfaction");

		surveyService.save(survey);

		SurveyQuestion question = new SurveyQuestion();
		question.setSurvey(survey);
		question.setQuestion("Are you satisfied with your workplace?");

		SurveyQuestionOption optionYes = new SurveyQuestionOption("Yes", 1.0);
		SurveyQuestionOption optionNo = new SurveyQuestionOption("No", 0.0);
		question.setOptions(Arrays.asList(optionYes, optionNo));

		surveyQuestionService.save(question);
	}
}
