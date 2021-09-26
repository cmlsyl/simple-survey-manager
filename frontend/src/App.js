import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AttendSurvey from './components/Survey/AttendSurvey';
import ManageSurveys from './components/Survey/ManageSurveys';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
					<Route path="/survey/attend/:token" component={AttendSurvey} />
          <Route path="/" component={ManageSurveys} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
