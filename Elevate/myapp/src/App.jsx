// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import NormalStudent from './NormalStudent';
import Search from './Search';
import Company from './Company';

import InternshipDashboard from './InternshipDashboard';
import Workshops from './Workshops';
import Assessment from './Assessment';
import Analytics from './Analytics';
import Registration from './registration';
import FacultyProfile from './faculty';

import StudentDashboard from './StudentDashboard';
import ScadDashboard from './scaddashboard';
import Reports from './reports';
import StudentList from './students';
import Internships from './internships';
import MainLayout from './MainLayout';
import Studentscad from './studentProfile';
import Evaluations from './EvaluationForms';
import    WorkshopsManagement from './WorkshopsManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student" element={<NormalStudent />} />
        <Route path='/prol' element={<internship />} />
        <Route path='/search' element={<Search />} />
        <Route path="/faculty" element={<FacultyProfile />} />
        <Route path="/new" element={<InternshipDashboard />} />
        <Route path="/Workshop" element={<Workshops />} />
        <Route path="/Assessment" element={<Assessment />} />
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/reg" element={<Registration />} />

        <Route path='/pro' element={<StudentDashboard />} />
       <Route element={<MainLayout />}>
    <Route path="/reports" element={<Reports />} />
       <Route path="/EvaluationForms" element={<Evaluations />} />
      <Route path="/scaddashboard" element={<ScadDashboard />} />
      <Route path="/internships" element={<Internships />} />
      <Route path="/students" element={<StudentList />} />
       <Route path="/WorkshopsManagement" element={<Workshops />} />
      <Route path="/students/:id" element={<Studentscad />} />
       <Route path="/company" element={<Company />} />

    
      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
