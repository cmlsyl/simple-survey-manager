package com.cs.simplesurveymanager.api.survey.dto;

import lombok.Setter;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SurveyQuestionOptionDTO {
	private String label;
	private double coefficient;
}
