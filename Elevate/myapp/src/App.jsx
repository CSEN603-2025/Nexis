// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import NormalStudent from './NormalStudent';
import Search from './Search';


import InternshipDashboard from './InternshipDashboard';
import Workshops from './Workshops';
import Assessment from './Assessment';
import Analytics from './Analytics';
import Registration from './registration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student" element={<NormalStudent />} />
        <Route path='/prol' element={<internship />} />
        <Route path='/search' element={<Search />} />
        
       
        <Route path="/new" element={<InternshipDashboard />} />
        <Route path="/Workshop" element={<Workshops />} />
        <Route path="/Assessment" element={<Assessment />} />
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/reg" element={<Registration />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App; 