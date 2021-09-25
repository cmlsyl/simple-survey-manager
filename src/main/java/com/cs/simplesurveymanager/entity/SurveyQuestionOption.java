package com.cs.simplesurveymanager.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class SurveyQuestionOption {

	@Column
	private String label;

	@Column
	private double coefficient;
}
