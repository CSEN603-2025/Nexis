// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NormalStudent from './NormalStudent';
import Search from './Search';
import Company from './Company';
import Student2 from './student2';
import InternshipDashboard from './InternshipDashboard';
import Workshops from './Workshops';
import Assessment from './Assessment';
import Analytics from './Analytics';
import Registration from './registration';
import FAMainLayout from './faMainLayout';
import FacultyProfile from './faculty';


import Evaluate from './Evaluate';
import Library from './Library';
import Welcome from './Welcome';
import ScadDashboard from './scaddashboard';
import Reports from './reports';
import StudentList from './students';
import Internships from './internships';
import EvaluatePro from './EvaluatePro';
import Studentscad from './studentProfile';
import Evaluations from './EvaluationForms';
import    WorkshopsManagement from './WorkshopsManagement';
import { BrowserRouter as Router,   Navigate } from "react-router-dom";
import EvaluationForms from './EvaluationForms';
import ReportSubmissions from './ReportSubmissions';
import Evaluate1 from "./Evaluationsfa";
import ReportPro from './ReportPro';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/student" element={<NormalStudent />} />
        <Route path='/prol' element={<internship />} />
        <Route path='/search' element={<Search />} />
       
        <Route path="/new" element={<InternshipDashboard />} />
        <Route path="/Workshop" element={<Workshops />} />
        <Route path="/Assessment" element={<Assessment />} />
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/student2" element={<Student2 />} />
        

        <Route path="/eval" element={<Evaluate />} />
        <Route path="/lib" element={<Library />} />
        <Route path="/Rpro" element={<ReportPro />} />
        <Route path="/Epro" element={<EvaluatePro/>} />
        
        


   
          <Route path="/scaddashboard" element={<ScadDashboard />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/EvaluationForms" element={<Evaluations />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/workshopsManagement" element={< WorkshopsManagement />} />
          <Route path="/students/:id" element={<Studentscad />} />
       
        <Route element={<FAMainLayout />}>
         <Route path="/faculty" element={<FacultyProfile />} />
         <Route path="/Evaluationsfa" element={<Evaluate1 />} />
         </Route>

      <Route path="/" element={<Navigate to="/company" replace />} />
       <Route path="/company" element={<Company />} />
       <Route path="/evaluate2" element={<EvaluationForms />} />
       <Route path="/ReportStudent" element={<ReportSubmissions />} />
       

    
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
