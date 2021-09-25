package com.cs.simplesurveymanager.entity;

import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "SurveyQuestion")
public class SurveyQuestion {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@ManyToOne
	@JoinColumn(name = "survey", nullable = false)
	private Survey survey;

	@Column
	private String question;

	@ElementCollection
	@CollectionTable(name = "SurveyQuestionOption", joinColumns = @JoinColumn(name = "surveyQuestion"))
	private List<SurveyQuestionOption> options;
}
