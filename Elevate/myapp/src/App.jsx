// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import NormalStudent from './NormalStudent';
import StudentDashboard from './StudentDashboard';
import ScadDashboard from './scadDashboard';
import Reports from './Reports';
import StudentProfile from './students';
import Internships from './internships';
import MainLayout from './MainLayout';
import StudentProfile from './studentProfile';
import Evaluations from './Evaluations';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student" element={<NormalStudent />} />
        <Route path='/pro' element={<StudentDashboard />} />
       <Route element={<MainLayout />}>
    <Route path="/reports" element={<Reports />} />
       <Route path="/Evaluations" element={<Evaluations />} />
      <Route path="/scaddashboard" element={<ScadDashboard />} />
      <Route path="/internships" element={<Internships />} />
      <Route path="/students" element={<StudentList />} />
      <Route path="/students/:id" element={<StudentProfile />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
