// src/components/StudentProfile.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './students.css'; // Reuse existing styling

// Ideally imported from a centralized data context or API in real use
const mockStudents = [
  { id: 1, name: "Emma Johnson", email: "emma.j@student.scad.edu", major: "MET", year: "Junior", status: "Pending" },
  { id: 2, name: "Marcus Lee", email: "m.lee@student.scad.edu", major: "IET", year: "Sophomore", status: "Flagged" },
  { id: 3, name: "Sofia Patel", email: "sofia.p@student.scad.edu", major: "EMS", year: "Senior", status: "Accepted" },
  { id: 4, name: "Jackson Smith", email: "j.smith@student.scad.edu", major: "MET", year: "Freshman", status: "Accepted" },
  { id: 5, name: "Olivia Garcia", email: "o.garcia@student.scad.edu", major: "IET", year: "Senior", status: "Rejected" },
  { id: 6, name: "Ethan Williams", email: "e.williams@student.scad.edu", major: "IET", year: "Junior", status: "Rejected" },
  { id: 7, name: "Ava Rodriguez", email: "a.rodriguez@student.scad.edu", major: "Law", year: "Sophomore", status: "Accepted" },
  { id: 8, name: "Noah Chen", email: "n.chen@student.scad.edu", major: "Business", year: "Senior", status: "Pending" },
  { id: 9, name: "Mia Taylor", email: "m.taylor@student.scad.edu", major: "Law", year: "Freshman", status: "Pending" },
  { id: 10, name: "Liam Brown", email: "l.brown@student.scad.edu", major: "Business", year: "Junior", status: "Flagged" },
];

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const found = mockStudents.find(s => s.id === parseInt(id));
    setStudent(found);
  }, [id]);

  if (!student) return <div className="content"><h2>Student not found</h2></div>;

  return (
    <div className="content">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to Student List
      </button>
      <div className="card profile-card">
        <div className="card-header">
          <h2>{student.name}</h2>
        </div>
        <div className="card-body">
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Major:</strong> {student.major}</p>
          <p><strong>Year:</strong> {student.year}</p>
          <p><strong>Status:</strong> 
            <span className={`status-badge status-${student.status.toLowerCase().replace(/\s+/g, '-')}`}>
              {student.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
