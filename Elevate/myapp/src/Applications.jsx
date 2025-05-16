import React, { useState } from 'react';
import { Table, Select, Button, Modal } from 'antd';

const { Option } = Select;

const initialApplications = [
  {
    key: '1',
    name: 'Alex Johnson',
    id: 'W2201045',
    position: 'Software Engineering Intern',
    date: '2025-04-20',
    status: 'Finalised',
    year: '3rd Year',
    university: 'Global University of Computing',
  },
  {
    key: '2',
    name: 'Jamie Smith',
    id: 'W2201089',
    position: 'Software Engineering Intern',
    date: '2025-04-19',
    status: 'Accepted',
    year: '2nd Year',
    university: 'Tech Valley Institute',
  },
  {
    key: '3',
    name: 'Taylor Wilson',
    id: 'W2201023',
    position: 'Marketing Assistant',
    date: '2025-04-18',
    status: 'Rejected',
    year: '4th Year',
    university: 'National College of Business',
  },
  {
    key: '4',
    name: 'Morgan Lee',
    id: 'W2201067',
    position: 'Data Analyst Intern',
    date: '2025-04-15',
    status: 'Finalised',
    year: '3rd Year',
    university: 'Global University of Computing',
  },
  {
    key: '5',
    name: 'Casey Brown',
    id: 'W2201012',
    position: 'UX/UI Design Intern',
    date: '2025-03-25',
    status: 'Accepted',
    year: 'Final Year',
    university: 'Creative Arts University',
  },
];

const Applications = () => {
  const [applications, setApplications] = useState(initialApplications);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [positionFilter, setPositionFilter] = useState(null);

  const handleStatusChange = (key, newStatus) => {
    const updated = applications.map(app =>
      app.key === key ? { ...app, status: newStatus } : app
    );
    setApplications(updated);
  };

  const showStudentDetails = (student) => {
    setSelectedStudent(student);
    setModalVisible(true);
  };

  const filteredApplications = positionFilter
    ? applications.filter(app =>
        app.position.toLowerCase() === positionFilter.toLowerCase()
      )
    : applications;

  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Student ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Applied Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button
            type="primary"
            style={{ backgroundColor: '#319795' }}
            onClick={() => showStudentDetails(record)}
          >
            View Details
          </Button>
          <Select
            value={record.status}
            style={{ width: 130 }}
            onChange={(value) => handleStatusChange(record.key, value)}
          >
            <Option value="Finalised">Finalised</Option>
            <Option value="Accepted">Accepted</Option>
            <Option value="Rejected">Rejected</Option>
          </Select>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Applications</h1>

  <Select
  style={{ width: 250, margin: '20px 0' }}
  placeholder="Filter by Post"
  value={positionFilter || 'all'}
  onChange={(value) => {
    setPositionFilter(value === 'all' ? null : value);
  }}
>
  <Option value="all">All Positions</Option>
  <Option value="Software Engineering Intern">Software Engineering Intern</Option>
  <Option value="Marketing Assistant">Marketing Assistant</Option>
  <Option value="Data Analyst Intern">Data Analyst Intern</Option>
  <Option value="UX/UI Design Intern">UX/UI Design Intern</Option>
</Select>

      <Table
        columns={columns}
        dataSource={filteredApplications}
        pagination={false}
        bordered={false}
      />

      <Modal
        title="Student Details"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedStudent && (
          <div style={{ lineHeight: '1.8em' }}>
            <p><strong>Current Year:</strong> {selectedStudent.year}</p>
            <p><strong>University:</strong> {selectedStudent.university}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Applications;
