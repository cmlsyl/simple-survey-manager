import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, {  useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function AddSurvey() {
  const history = useHistory();

  const initialData = {
    description: "",
    questions: [
      {
        question: "",
        options: []
      }
    ]
  }

  const [data, setData] = useState(initialData);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/api/survey', data)
      .then(response => {
        console.log(response);
    });
  }

  const addQuestion = (event) => {
    event.preventDefault();
    setData({
      description: data.description,
      questions: [...data.questions, {
        question: "",
        options: []
      }]
    });
  }

  const removeQuestion = (event, questionIndex) => {
    event.preventDefault();
    setData({
      description: data.description,
      questions: [...data.questions.slice(0, questionIndex), 
        ...data.questions.slice(questionIndex + 1)]
    });
  }

  const addOption = (event, questionIndex) => {
    event.preventDefault();
    setData({
      description: data.description,
      questions: [...data.questions.slice(0, questionIndex), {
        question: data.questions[questionIndex].question,
        options: [...data.questions[questionIndex].options, {
          value: "",
          coefficient: 1
        }]
      }, ...data.questions.slice(questionIndex + 1)]
    });
  }

  const removeOption = (event, questionIndex, optionIndex) => {
    event.preventDefault();
    setData({
      description: data.description,
      questions: [...data.questions.slice(0, questionIndex), {
        question: data.questions[questionIndex].question,
        options: [...data.questions[questionIndex].options.slice(0, optionIndex), 
        ...data.questions[questionIndex].options.slice(optionIndex + 1)]
      }, ...data.questions.slice(questionIndex + 1)]
    });
  }

  return <div>
        <Container maxWidth="md">
          <Paper elevation={3} style={{ paddingTop: "10px", paddingBottom: "30px" }}>
            <Box sx={{ display: "flex", p: 1 }}>
              <Box sx={{ flexGrow: 1, textAlign:"left" }}>
                <Typography
                  sx={{ flex: '1 1 100%' }}
                  variant="h6"
                  component="div"
                >Add Survey</Typography>
              </Box>
              <Box>
                <Button variant="outlined" onClick={addQuestion} startIcon={<span className="material-icons">add</span>}>
                  Add Question
                </Button>
              </Box>
            </Box>

            <Box sx={{ display: "flex", p: 2 }}>
              <TextField
                  variant="standard"
                  label="Description"
                  multiline
                  fullWidth
                  value={data.description}
              />
            </Box>

            <Typography
                  sx={{ textAlign: "left", p: 2 }}
                  variant="h6"
                  component="div"
                >Questions</Typography>
            <Box sx={{ ml: 2, mr: 2, textAlign:"left", maxHeight: "64vh", overflowY: "auto" }}>
              {data.questions.length > 0 &&
                  data.questions.map((question, questionIndex) => 
                      <Box key={questionIndex} sx={{ p: 2, background: questionIndex % 2 === 0 ? "#eee" : "#ddd" }}>
                          <TextField
                              variant="standard"
                              label={ "Question " + (questionIndex + 1) }
                              multiline
                              fullWidth
                              rows={2}
                              value={question.question}
                          />
                          <Button sx={{  mt: 1, position: "relative", ml: -8 }} variant="contained" color="error" onClick={(event) => removeQuestion(event, questionIndex)}><span className="material-icons">close</span></Button>
                          {question.options.map((option, optionIndex) =>
                            <div key={optionIndex}>
                              <TextField
                                  variant="standard"
                                  label="Option"
                                  value={option.value}
                              />
                              <TextField
                                  sx={{  ml: 2, mr: 2, width: 60 }}
                                  type="number"
                                  variant="standard"
                                  label="Coefficient"
                                  value={option.coefficient}
                              />
                              <Button sx={{  mt: 1 }} variant="contained" color="error" onClick={(event) => removeOption(event, questionIndex, optionIndex)}><span className="material-icons">close</span></Button>
                            </div>
                          )}
                          <div>
                            <Button sx={{  mt: 1 }} variant="contained" onClick={(event) => addOption(event, questionIndex)} startIcon={<span className="material-icons">add</span>}>
                              Add Option
                            </Button>
                          </div>
                      </Box>
                  )
              }
            </Box>
            <Box sx={{ display: "flex", p: 1 }}>
              <Box sx={{ flexGrow: 1, textAlign:"left" }}>
              </Box>
              <Box>
                <Button color="error" onClick={() => history.push('/')}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
              </Box>
            </Box>
        </Paper>
      </Container>
    </div>;
}