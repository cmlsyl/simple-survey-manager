import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import React, {  useState } from 'react';

export default function AddSurvey(props) {
  const initialData = {
    description: "",
    questions: [
      {
        question: "",
        options: [
            ""
        ]
      }
    ]
  }

  const [data, setData] = useState(initialData);
  const {visible, close} = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data) {
      axios.post('http://localhost:8080/api/survey', data)
        .then(response => {
          console.log(response);
      });
    }
  }

  const handleClose = (event) => {
    setData(initialData);
    close();
  }

  return <Dialog open={visible} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
            Add Survey
        </DialogTitle>
        <DialogContent>
            <TextField
                variant="standard"
                label="Description"
                multiline
                fullWidth
                value={data.description}
            />
            {data.questions.length > 0 &&
                data.questions.map((question, questionIndex) => 
                    <div key={questionIndex}>
                        <TextField
                            variant="standard"
                            label="Question"
                            multiline
                            fullWidth
                            rows={2}
                            value={question.question}
                        />
                        {question.options.map((option, optionIndex) => 
                            <TextField
                                key={optionIndex}
                                variant="standard"
                                label="Option"
                                value={option}
                            />
                        )}
                    </div>
                )
            }
        </DialogContent>
        <DialogActions>
            <Button color="error" onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>;
}