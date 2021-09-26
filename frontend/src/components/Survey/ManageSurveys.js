import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ManageSurveys() {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState();
  const [emails, setEmails] = useState();

  useEffect(() => {
    axios.get('http://localhost:8080/api/survey')
        .then(response => {
          setSurveys(response.data);
        });
  }, []);

  const handleShare = (event) => {
    const surveyIndex = surveys.findIndex(s => s.id == event.target.id);
    setSelectedSurvey(surveys[surveyIndex]);
  }

  const handleEmailInputChange = (event) => {
    setEmails(event.target.value);
  }

  const handleCancel = (event) => {
    event.preventDefault();
    setSelectedSurvey();
    setEmails('');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(emails);
    if (emails) {
      var emailList = emails.split(",").map(function(item) {
        return item.trim();
      });

      axios.post('http://localhost:8080/api/survey/' + selectedSurvey.id + '/share', emailList)
        .then(response => {
          response.data.map(element => {
            console.log('localhost:3000/survey/attend/' + element);
          });

          setSelectedSurvey();
          setEmails('');
      });
    }
  }

  return <div>
      <h2>Manage Surveys</h2>
      <br/>
      <br/>
      <br/>
      <div>
      <table style={{ margin : "0 auto", textAlign : "left", borderSpacing: "20px" }}>
        <thead>
          <tr>
            <td><strong>Description</strong></td>
            <td><strong>Rate of Participation</strong></td>
            <td><strong>Rate of Satisfaction</strong></td>
            <td><strong>Share</strong></td>
          </tr>
        </thead>
        <tbody>
          {surveys.length ?
            surveys.map((survey, index) => 
              <tr className="indent" key = { index }>
                <td>{ survey.description }</td>
                <td>{ (survey.attendeeCount / (survey.shareCount > 0 ? survey.shareCount : 1)).toFixed(2) }</td>
                <td>{ survey.score.toFixed(2) }</td>
                <td><button onClick={handleShare} id={survey.id}>&#128389;</button></td>
              </tr>
            ) : <tr></tr>
          }
        </tbody>
      </table>
      <dialog open={selectedSurvey}>
        <div>
          <div>
            <textarea style={{ width: "300px" }} rows={6} value={emails} onChange={handleEmailInputChange} 
              placeholder={ "Enter email address" }></textarea>
          </div>
          <button style={{ width: "50%" }} onClick={handleCancel}>Cancel</button>
          <button style={{ width: "50%" }} onClick={handleSubmit}>Submit</button>
        </div>
      </dialog>
      </div>
    </div>;
}
