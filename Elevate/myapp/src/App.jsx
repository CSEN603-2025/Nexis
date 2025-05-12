// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import NormalStudent from './NormalStudent';
import Search from './Search';
import ReportSubmissions from './ReportSubmissions';
import EvaluationForms from './EvaluationForms';
import WorkshopsManagement from './WorkshopsManagement';
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student" element={<NormalStudent />} />
        <Route path='/prol' element={<internship />} />
        <Route path='/search' element={<Search />} />
        <Route path='/report-submissions' element={<ReportSubmissions />} />
        <Route path="/evaluation-forms" element={<EvaluationForms />} />
        <Route path="/Workshops-management" element={<WorkshopsManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 