package com.cs.simplesurveymanager.api.survey.dto;

import com.cs.simplesurveymanager.entity.Survey;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SurveyDTO {
	private long id;
	private String description;
	private int shareCount;
	private int attendeeCount;
	private double score;

	public SurveyDTO(Survey survey) {
		this.id = survey.getId();
		this.description = survey.getDescription();
		this.shareCount = survey.getShareCount();
		this.attendeeCount = survey.getAttendeeCount();
		this.score = survey.getScore();
	}
}