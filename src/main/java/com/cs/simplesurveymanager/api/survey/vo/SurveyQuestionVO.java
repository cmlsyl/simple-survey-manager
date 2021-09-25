package com.cs.simplesurveymanager.api.survey.vo;

import java.util.List;

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
public class SurveyQuestionVO {
	private Survey survey;
	private List<SurveyQuestion> questions;
}
