package com.cs.simplesurveymanager.api.survey.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.cs.simplesurveymanager.entity.SurveyQuestion;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SurveyQuestionDTO {
	private long id;
	private String question;
	private List<SurveyQuestionOptionDTO> options;

	public SurveyQuestionDTO(SurveyQuestion question) {
		this.id = question.getId();
		this.question = question.getQuestion();
		this.options = question.getOptions().stream()
				.map(q -> new SurveyQuestionOptionDTO(q.getLabel(), q.getCoefficient()))
				.collect(Collectors.toList());
	}
}
