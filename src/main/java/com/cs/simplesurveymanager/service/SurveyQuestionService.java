package com.cs.simplesurveymanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cs.simplesurveymanager.entity.SurveyQuestion;
import com.cs.simplesurveymanager.repository.SurveyQuestionRepository;

@Service
public class SurveyQuestionService {

	@Autowired
	private SurveyQuestionRepository surveyQuestionRepository;

	public SurveyQuestion save(SurveyQuestion surveyQuestion) {
		return surveyQuestionRepository.save(surveyQuestion);
	}

	public List<SurveyQuestion> saveAll(List<SurveyQuestion> surveyQuestionList) {
		return surveyQuestionRepository.saveAll(surveyQuestionList);
	}

	public List<SurveyQuestion> findBySurveyId(long surveyId) {
		return surveyQuestionRepository.findBySurvey_id(surveyId);
	}
}
