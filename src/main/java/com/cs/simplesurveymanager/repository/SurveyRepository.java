package com.cs.simplesurveymanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cs.simplesurveymanager.entity.Survey;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {
	Survey findById(long id);
}
