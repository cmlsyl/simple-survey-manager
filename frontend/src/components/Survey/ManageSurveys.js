import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddSurvey from './AddSurvey';

export default function ManageSurveys() {
  const [surveys, setSurveys] = useState([]);
  const [addDialogVisible, setAddDialogVisible] = useState(false);
  const [shareDialogVisible, setShareDialogVisible] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState();
  const [emails, setEmails] = useState();

  useEffect(() => {
    axios.get('http://localhost:8080/api/survey')
        .then(response => {
          setSurveys(response.data);
        });
  }, []);

  const showAddDialog = () => {
    setAddDialogVisible(true);
  }

  const closeAddDialog = () => {
    setAddDialogVisible(false);
  }

  const handleShare = (event) => {
    const surveyIndex = surveys.findIndex(s => s.id == event.target.id);
    setSelectedSurvey(surveys[surveyIndex]);
    setShareDialogVisible(true);
  }

  const handleEmailInputChange = (event) => {
    setEmails(event.target.value);
  }

  const handleShareDialogClose = (event) => {
    event.preventDefault();
    setSelectedSurvey();
    setEmails('');
    setShareDialogVisible(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emails) {
      var emailList = emails.split(",").map(function(item) {
        return item.trim();
      });

      axios.post('http://localhost:8080/api/survey/' + selectedSurvey.id + '/share', emailList)
        .then(response => {
          response.data.map(element => {
            console.log('localhost:3000/survey/attend/' + element);
          });

          handleShareDialogClose(event);
      });
    }
  }

  return <div>
      <AddSurvey visible={addDialogVisible} close={closeAddDialog} />
      <Container maxWidth="md">
        <Paper elevation={3} style={{ paddingTop: "10px", paddingBottom: "30px" }}>
          <Box sx={{ display: "flex", p: 1 }}>
            <Box sx={{ p: 1, flexGrow: 1, textAlign:"left" }}>
              <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                component="div"
              >Manage Surveys</Typography>
            </Box>
            <Box sx={{ p: 1 }}>
              <Button variant="outlined" onClick={showAddDialog} startIcon={<span className="material-icons">add</span>}>
                Add New
              </Button>
            </Box>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Rate of Participation</strong></TableCell>
                <TableCell><strong>Rate of Satisfaction</strong></TableCell>
                <TableCell><strong>Share</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {surveys.length ?
                surveys.map((survey, index) => 
                  <TableRow className="indent" key = { index }>
                    <TableCell>{ survey.description }</TableCell>
                    <TableCell>{ (survey.attendeeCount / (survey.shareCount > 0 ? survey.shareCount : 1)).toFixed(2) }</TableCell>
                    <TableCell>{ survey.score.toFixed(2) }</TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={handleShare} id={survey.id}>
                        <span className="material-icons">send</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : <TableRow></TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
      </Container>
      <Dialog open={shareDialogVisible} onClose={handleShareDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Share Survey
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="standard"
            label="Emails"
            multiline
            fullWidth
            rows={6}
            value={emails} onChange={handleEmailInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleShareDialogClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>;
}
