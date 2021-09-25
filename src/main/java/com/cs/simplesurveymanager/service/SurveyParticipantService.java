package com.cs.simplesurveymanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cs.simplesurveymanager.entity.SurveyParticipant;
import com.cs.simplesurveymanager.repository.SurveyParticipantRepository;

@Service
public class SurveyParticipantService {

	@Autowired
	private SurveyParticipantRepository surveyParticipantRepository;

	public SurveyParticipant save(SurveyParticipant surveyParticipant) {
		return surveyParticipantRepository.save(surveyParticipant);
	}

	public SurveyParticipant findByToken(String token) {
		return surveyParticipantRepository.findByToken(token);
	}
}
