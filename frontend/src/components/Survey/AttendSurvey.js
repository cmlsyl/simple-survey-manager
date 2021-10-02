import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Typography } from '@mui/material';
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
      <Container maxWidth="md">
        <h3>Attend Survey</h3>
        <Paper elevation={3} style={{ paddingTop: "10px", paddingBottom: "30px" }}>
          <Box sx={{ display: "flex", p: 1 }}>
            <Box sx={{ p: 1, flexGrow: 1, textAlign:"left" }}>
              <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                component="div"
              >{ survey?.description }</Typography>
            </Box>
            <Box sx={{ p: 1 }}>
              {!completed && survey && 
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              }
            </Box>
          </Box>
          <Box sx={{ p: 2, flexGrow: 1, textAlign:"left" }}>
            {questions.length > 0 &&
              questions.map((question, index) =>
                <div key = { index }>
                  <FormControl>
                    <FormLabel>{ question.question }</FormLabel>
                    <RadioGroup
                      row
                      name={"" + question.id}
                      onChange={onOptionSelect}
                    >
                      {
                        question.options.map((option, optionIndex) => 
                          <FormControlLabel key = { optionIndex } control={<Radio />} value={option} label={option} />
                        )
                      }
                    </RadioGroup>
                  </FormControl>
                </div>
              )
            }
          </Box>

          {completed && <span>Thanks for your participation!</span> }
          {!completed && !survey && <span>You have already answered this survey!</span> }
        </Paper>
      </Container>
    </div>;
}
