// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import NormalStudent from './NormalStudent';
import Search from './Search';
<<<<<<< Updated upstream
 
=======
import ReportSubmissions from './ReportSubmissions';
import EvaluationForms from './EvaluationForms';
import WorkshopsManagement from './WorkshopsManagement';
import InternshipDashboard from './InternshipDashboard';
import Workshops from './Workshops';
import Assessment from './Assessment';
import Analytics from './Analytics';
import Registration from './registration';

>>>>>>> Stashed changes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student" element={<NormalStudent />} />
        <Route path='/prol' element={<internship />} />
        <Route path='/search' element={<Search />} />
<<<<<<< Updated upstream
=======
        <Route path='/report-submissions' element={<ReportSubmissions />} />
        <Route path="/evaluation-forms" element={<EvaluationForms />} />
        <Route path="/Workshops-management" element={<WorkshopsManagement />} />
        <Route path="/new" element={<InternshipDashboard />} />
        <Route path="/Workshop" element={<Workshops />} />
        <Route path="/Assessment" element={<Assessment />} />
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/reg" element={<Registration />} />
        
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
}

export default App; 