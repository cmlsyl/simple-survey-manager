package com.cs.simplesurveymanager.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class SurveyParticipantAnswer {

	@ManyToOne
	@JoinColumn(name = "surveyQuestion", nullable = false)
	private SurveyQuestion surveyQuestion;

	@Column
	private String answer;
}
