package com.cs.simplesurveymanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cs.simplesurveymanager.entity.SurveyParticipant;

@Repository
public interface SurveyParticipantRepository extends JpaRepository<SurveyParticipant, Long> {
	SurveyParticipant findByToken(String token);
}