import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AttendSurvey() {
  const [params] = useState(useParams());
  const [survey, setSurvey] = useState();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/api/survey/attend/' + params.token)
        .then(response => {
          setSurvey(response.data.survey);
          setQuestions(response.data.questions);
        });
  }, []);

  const onOptionSelect = (event) => {
    const answerIndex = answers.findIndex(a => a.surveyQuestion.id == event.target.name);

    if (answerIndex > -1) {
      answers[answerIndex] = {
        surveyQuestion : {
          id: event.target.name
        },
        answer: event.target.value
      }
      setAnswers(answers);
    } else {
      const answer = {
        surveyQuestion : {
          id: event.target.name
        },
        answer: event.target.value
      }
      setAnswers([...answers, answer]);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8080/api/survey/answer/' + params.token, answers)
      .then(response => {
        setQuestions([]);
        setCompleted(true);
      });
  }

  return <div>
      <h2>Attend Survey</h2>
      <h4>{survey?.description}</h4>
      <br/>
      <br/>
      <br/>
      <div>
        {questions.length ?
          questions.map((question, index) => 
            <div key = { index }>
              <span>{ question.question }</span>
              <div>
                {
                  question.options.map((option, optionIndex) => 
                    <span key = { optionIndex }>
                      <input type="radio" value={option} name={question.id} onClick={onOptionSelect}/> {option}
                    </span>
                  )
                }
              </div>
            </div>
          ) : <span></span>
        }
      </div>
      <br/>
      <br/>
      <div>{completed ? <span>Thanks for your participation!</span> :
        survey ? <button onClick={handleSubmit}>Submit</button> :
        <span>You have already answered this survey!</span> }</div>
    </div>;
}
