package com.cs.simplesurveymanager.api.survey.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.cs.simplesurveymanager.entity.Survey;
import com.cs.simplesurveymanager.entity.SurveyQuestion;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SurveyDetailDTO {
	private SurveyDTO survey;
	private List<SurveyQuestionDTO> questions;

	public SurveyDetailDTO(Survey survey, List<SurveyQuestion> questions) {
		this.survey = new SurveyDTO(survey);
		this.questions = questions.stream()
				.map(question -> new SurveyQuestionDTO(question))
				.collect(Collectors.toList());
	}
}
