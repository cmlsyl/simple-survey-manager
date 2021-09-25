package com.cs.simplesurveymanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cs.simplesurveymanager.entity.SurveyQuestion;

@Repository
public interface SurveyQuestionRepository extends JpaRepository<SurveyQuestion, Long> {
	List<SurveyQuestion> findBySurvey_id(long surveyId);
}
