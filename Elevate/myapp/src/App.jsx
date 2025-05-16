// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import NormalStudent from './NormalStudent';
import StudentDashboard from './StudentDashboard';
import ScadDashboard from './scaddashboard';
import Reports from './reports';
import StudentList from './students';
import Internships from './internships';
import MainLayout from './MainLayout';
import Studentscad from './studentProfile';
import Evaluations from './EvaluationForms';
import Workshops from './WorkshopsManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes without MainLayout */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student" element={<NormalStudent />} />
        <Route path="/pro" element={<StudentDashboard />} />

        {/* Routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/scaddashboard" element={<ScadDashboard />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/EvaluationForms" element={<Evaluations />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/workshopsManagement" element={<Workshops />} />
          <Route path="/students/:id" element={<Studentscad />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App; 
