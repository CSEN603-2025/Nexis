import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Typography, Modal, Button, Form, Rate, message } from 'antd';

const { Option } = Select;
const { Title } = Typography;

const EvaluationManagement = () => {
  // State for evaluations data
  const [evaluations, setEvaluations] = useState([]);
  // State for search, filter, selected evaluation, and modals
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDownloadModalVisible, setIsDownloadModalVisible] = useState(false);
  const [evaluationToDelete, setEvaluationToDelete] = useState(null);
  const [evaluationToDownload, setEvaluationToDownload] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  // Initial data
  useEffect(() => {
    const mockEvaluations = [
      {
        id: 1,
        studentName: 'John Doe',
        studentId: 'ST12345',
        internshipCompany: 'Tech Solutions Inc.',
        startDate: '2025-01-15',
        endDate: '2025-04-15',
        supervisor: 'Jane Smith',
        technicalSkills: 4,
        communication: 5,
        teamwork: 4,
        problemSolving: 5,
        punctuality: 4,
        overallRating: 4.4,
        feedback: 'John demonstrated excellent technical abilities and was always eager to learn.',
        createdAt: '2025-04-16',
        updatedAt: '2025-04-16',
      },
      {
        id: 2,
        studentName: 'Emma Johnson',
        studentId: 'ST67890',
        internshipCompany: 'Global Marketing Group',
        startDate: '2025-02-01',
        endDate: '2025-05-01',
        supervisor: 'Robert Brown',
        technicalSkills: 3,
        communication: 5,
        teamwork: 5,
        problemSolving: 4,
        punctuality: 5,
        overallRating: 4.4,
        feedback: 'Emma showed strong communication skills and was a great team player.',
        createdAt: '2025-05-02',
        updatedAt: '2025-05-02',
      },
    ];
    setEvaluations(mockEvaluations);
  }, []);

  // Log evaluations state changes
  useEffect(() => {
    console.log('Evaluations state updated:', evaluations);
  }, [evaluations]);

  // Filter evaluations based on search and status
  const filteredEvaluations = evaluations.filter((evaluation) => {
    const matchesSearch =
      searchText === '' ||
      evaluation.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
      evaluation.studentId.toLowerCase().includes(searchText.toLowerCase()) ||
      evaluation.internshipCompany.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || evaluation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle View Details button click
  const handleViewDetails = (record) => {
    console.log('View Details clicked for evaluation:', record.id); // Debug log
    setSelectedEvaluation(record);
    setIsDetailsModalVisible(true);
  };

  // Handle Details modal close
  const handleDetailsModalClose = () => {
    console.log('Details modal closed'); // Debug log
    setIsDetailsModalVisible(false);
    setSelectedEvaluation(null);
  };

  // Handle Create button click
  const handleCreate = () => {
    setIsEditing(false);
    setIsFormModalVisible(true);
    form.resetFields();
  };

  // Handle Edit button click
  const handleEdit = (record) => {
    setIsEditing(true);
    setSelectedEvaluation(record);
    setIsFormModalVisible(true);
    form.setFieldsValue(record);
  };

  // Handle Delete confirmation modal
  const handleDeleteConfirm = (record) => {
    setEvaluationToDelete(record);
    setIsDeleteModalVisible(true);
  };

  // Handle actual deletion
  const handleDeleteConfirmed = () => {
    if (evaluationToDelete) {
      setEvaluations(prev => prev.filter(evaluation => evaluation.id !== evaluationToDelete.id));
      message.success('Evaluation deleted successfully');
      setIsDeleteModalVisible(false);
      setEvaluationToDelete(null);
    }
  };

  // Handle Download Evaluation
  const handleDownload = (record) => {
    setEvaluationToDownload(record);
    setIsDownloadModalVisible(true);
  };

  // Function to print the evaluation
  const printEvaluation = () => {
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      const content = generatePrintContent(evaluationToDownload);
      printWindow.document.write(content);
      printWindow.document.close();
      
      // Print after content has loaded
      printWindow.onload = function() {
        printWindow.print();
      };
      
      setIsDownloadModalVisible(false);
    } else {
      message.error('Unable to open print window. Please check your pop-up settings.');
    }
  };

  // Generate printable content
  const generatePrintContent = (evaluation) => {
    if (!evaluation) return '';
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Internship Evaluation - ${evaluation.studentName}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 40px;
            line-height: 1.6;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #0d9488;
            padding-bottom: 10px;
          }
          .section {
            margin-bottom: 20px;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #0d9488;
          }
          .rating-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
          }
          .feedback {
            margin-top: 20px;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 5px;
          }
          .stars {
            color: #FFD700;
            letter-spacing: 2px;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          table, th, td {
            border: 1px solid #ddd;
          }
          th, td {
            padding: 12px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Student Internship Evaluation</h1>
          <h2>${evaluation.studentName} (${evaluation.studentId})</h2>
        </div>
        
        <div class="section">
          <div class="section-title">Internship Details</div>
          <table>
            <tr>
              <th>Company</th>
              <td>${evaluation.internshipCompany}</td>
            </tr>
            <tr>
              <th>Period</th>
              <td>${evaluation.startDate} to ${evaluation.endDate}</td>
            </tr>
            <tr>
              <th>Supervisor</th>
              <td>${evaluation.supervisor}</td>
            </tr>
            <tr>
              <th>Evaluation Date</th>
              <td>${evaluation.updatedAt}</td>
            </tr>
          </table>
        </div>
        
        <div class="section">
          <div class="section-title">Performance Ratings</div>
          <table>
            <tr>
              <th>Skill Area</th>
              <th>Rating</th>
            </tr>
            <tr>
              <td>Technical Skills</td>
              <td><div class="stars">${'★'.repeat(evaluation.technicalSkills)}${'☆'.repeat(5-evaluation.technicalSkills)}</div></td>
            </tr>
            <tr>
              <td>Communication</td>
              <td><div class="stars">${'★'.repeat(evaluation.communication)}${'☆'.repeat(5-evaluation.communication)}</div></td>
            </tr>
            <tr>
              <td>Teamwork</td>
              <td><div class="stars">${'★'.repeat(evaluation.teamwork)}${'☆'.repeat(5-evaluation.teamwork)}</div></td>
            </tr>
            <tr>
              <td>Problem Solving</td>
              <td><div class="stars">${'★'.repeat(evaluation.problemSolving)}${'☆'.repeat(5-evaluation.problemSolving)}</div></td>
            </tr>
            <tr>
              <td>Punctuality</td>
              <td><div class="stars">${'★'.repeat(evaluation.punctuality)}${'☆'.repeat(5-evaluation.punctuality)}</div></td>
            </tr>
            <tr>
              <th>Overall Rating</th>
              <td><div class="stars">${'★'.repeat(Math.round(evaluation.overallRating))}${'☆'.repeat(5-Math.round(evaluation.overallRating))}</div> (${evaluation.overallRating}/5)</td>
            </tr>
          </table>
        </div>
        
        <div class="section">
          <div class="section-title">Supervisor Feedback</div>
          <div class="feedback">
            ${evaluation.feedback}
          </div>
        </div>
        
        <div class="footer">
          <p>This evaluation was generated on ${new Date().toLocaleDateString()} by the Student Internship Management System.</p>
        </div>
      </body>
      </html>
    `;
  };

  // Handle Form submission (Create/Update)
  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      const now = new Date().toISOString().split('T')[0];
      const scores = [
        values.technicalSkills,
        values.communication,
        values.teamwork,
        values.problemSolving,
        values.punctuality,
      ];
      const overallRating = parseFloat((scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1));

      if (isEditing && selectedEvaluation) {
        // Update existing evaluation
        setEvaluations(
          evaluations.map((evaluation) =>
            evaluation.id === selectedEvaluation.id
              ? { ...values, id: selectedEvaluation.id, overallRating, updatedAt: now, status: selectedEvaluation.status }
              : evaluation
          )
        );
        message.success('Evaluation updated successfully');
      } else {
        // Create new evaluation
        const newEvaluation = {
          ...values,
          id: Math.max(...evaluations.map((e) => e.id), 0) + 1,
          overallRating,
          createdAt: now,
          updatedAt: now,
          status: 'Completed', // Default to Completed for new evaluations
          internshipCompany: values.internshipCompany || 'Unknown', // Default for consistency with mock data
        };
        setEvaluations([...evaluations, newEvaluation]);
        message.success('Evaluation created successfully');
      }

      setIsFormModalVisible(false);
      form.resetFields();
      setSelectedEvaluation(null);
    });
  };

  // Table columns
  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: 'Period',
      key: 'period',
      render: (_, record) => `${record.startDate} to ${record.endDate}`,
    },
   
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button
            style={{ backgroundColor: '#0d9488', borderColor: '#0d9488', color: '#fff' }}
            onClick={() => handleViewDetails(record)}
          >
            View Details
          </Button>
          <Button
            style={{ backgroundColor: '#0d9488', borderColor: '#0d9488', color: '#fff' }}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            style={{ backgroundColor: '#0d9488', borderColor: '#0d9488', color: '#fff' }}
            onClick={() => handleDeleteConfirm(record)}
          >
            Delete
          </Button>
          <Button
            style={{ backgroundColor: '#0d9488', borderColor: '#0d9488', color: '#fff' }}
            onClick={() => handleDownload(record)}
          >
            Download Evaluation
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Student Internship Evaluations</Title>

      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '16px',
          alignItems: 'center',
        }}
      >
        <Button
          style={{ backgroundColor: '#0d9488', borderColor: '#0d9488', color: '#fff' }}
          onClick={handleCreate}
        >
          Create Evaluation
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredEvaluations}
        rowKey="id"
        bordered
        pagination={{ pageSize: 10 }}
      />

      {/* Modal for Evaluation Details */}
      {selectedEvaluation && (
        <Modal
          title={`Evaluation for ${selectedEvaluation.studentName}`}
          open={isDetailsModalVisible}
          onCancel={handleDetailsModalClose}
          footer={[
            <Button
              key="close"
              style={{ backgroundColor: '#0d9488', borderColor: '#0d9488', color: '#fff' }}
              onClick={handleDetailsModalClose}
            >
              Close
            </Button>,
          ]}
        >
          <div style={{ padding: '10px 0' }}>
            <div style={{ margin: '15px 0', borderTop: '1px solid #eee', paddingTop: '15px' }}>
              <p><strong>Technical Skills:</strong> {selectedEvaluation.technicalSkills}/5</p>
              <p><strong>Communication:</strong> {selectedEvaluation.communication}/5</p>
              <p><strong>Teamwork:</strong> {selectedEvaluation.teamwork}/5</p>
              <p><strong>Problem Solving:</strong> {selectedEvaluation.problemSolving}/5</p>
              <p><strong>Punctuality:</strong> {selectedEvaluation.punctuality}/5</p>
              <p><strong>Overall Rating:</strong> {selectedEvaluation.overallRating}/5</p>
            </div>
            <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '5px' }}>
              <p><strong>Feedback:</strong></p>
              <p>{selectedEvaluation.feedback}</p>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal for Delete Confirmation */}
      <Modal
        title="Confirm Delete"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="delete"
            danger
            onClick={handleDeleteConfirmed}
          >
            Delete
          </Button>,
        ]}
      >
        {evaluationToDelete && (
          <p>Are you sure you want to delete the evaluation for <strong>{evaluationToDelete.studentName}</strong>? This action cannot be undone.</p>
        )}
      </Modal>

      {/* Modal for Download Preview */}
      <Modal
        title="Download Evaluation"
        open={isDownloadModalVisible}
        onCancel={() => setIsDownloadModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsDownloadModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="download"
            style={{ backgroundColor: '#0d9488', borderColor: '#0d9488', color: '#fff' }}
            onClick={printEvaluation}
          >
            Print/Save as PDF
          </Button>,
        ]}
        width={800}
      >
        {evaluationToDownload && (
          <div style={{ maxHeight: '400px', overflow: 'auto', padding: '10px', border: '1px solid #eee' }}>
            <h3>Preview</h3>
            <p>Click the button below to print or save this evaluation as a PDF.</p>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h2>Student Internship Evaluation</h2>
              <h3>{evaluationToDownload.studentName} ({evaluationToDownload.studentId})</h3>
            </div>
            
            <div style={{ margin: '15px 0' }}>
              <div style={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>Internship Details</div>
              <p><strong>Company:</strong> {evaluationToDownload.internshipCompany}</p>
              <p><strong>Period:</strong> {evaluationToDownload.startDate} to {evaluationToDownload.endDate}</p>
              <p><strong>Supervisor:</strong> {evaluationToDownload.supervisor}</p>
            </div>
            
            <div style={{ margin: '15px 0' }}>
              <div style={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>Performance Ratings</div>
              <p><strong>Technical Skills:</strong> {evaluationToDownload.technicalSkills}/5</p>
              <p><strong>Communication:</strong> {evaluationToDownload.communication}/5</p>
              <p><strong>Teamwork:</strong> {evaluationToDownload.teamwork}/5</p>
              <p><strong>Problem Solving:</strong> {evaluationToDownload.problemSolving}/5</p>
              <p><strong>Punctuality:</strong> {evaluationToDownload.punctuality}/5</p>
              <p><strong>Overall Rating:</strong> {evaluationToDownload.overallRating}/5</p>
            </div>
            
            <div style={{ margin: '15px 0' }}>
              <div style={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>Supervisor Feedback</div>
              <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '5px' }}>
                {evaluationToDownload.feedback}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal for Create/Edit Evaluation */}
      <Modal
        title={isEditing ? 'Edit Evaluation' : 'Create Evaluation'}
        open={isFormModalVisible}
        onCancel={() => setIsFormModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsFormModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            style={{ backgroundColor: '#0d9488', borderColor: '#0d9488', color: '#fff' }}
            onClick={handleFormSubmit}
          >
            {isEditing ? 'Update' : 'Create'}
          </Button>,
        ]}
        width={800}
      >
        <Form form={form} layout="vertical">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item name="studentName" label="Student Name" rules={[{ required: true, message: 'Please enter student name' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="studentId" label="Student ID" rules={[{ required: true, message: 'Please enter student ID' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="internshipCompany" label="Company" rules={[{ required: true, message: 'Please enter company name' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="supervisor" label="Supervisor" rules={[{ required: true, message: 'Please enter supervisor name' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="startDate" label="Start Date" rules={[{ required: true, message: 'Please select start date' }]}>
              <Input type="date" />
            </Form.Item>
            <Form.Item name="endDate" label="End Date" rules={[{ required: true, message: 'Please select end date' }]}>
              <Input type="date" />
            </Form.Item>
          </div>

          <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '16px 0 8px' }}>Performance Ratings</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item name="technicalSkills" label="Technical Skills" rules={[{ required: true, message: 'Please rate technical skills' }]}>
              <Rate count={5} />
            </Form.Item>
            <Form.Item name="communication" label="Communication" rules={[{ required: true, message: 'Please rate communication' }]}>
              <Rate count={5} />
            </Form.Item>
            <Form.Item name="teamwork" label="Teamwork" rules={[{ required: true, message: 'Please rate teamwork' }]}>
              <Rate count={5} />
            </Form.Item>
            <Form.Item name="problemSolving" label="Problem Solving" rules={[{ required: true, message: 'Please rate problem solving' }]}>
              <Rate count={5} />
            </Form.Item>
            <Form.Item name="punctuality" label="Punctuality" rules={[{ required: true, message: 'Please rate punctuality' }]}>
              <Rate count={5} />
            </Form.Item>
          </div>

          <Form.Item name="feedback" label="Feedback" rules={[{ required: true, message: 'Please enter feedback' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EvaluationManagement;