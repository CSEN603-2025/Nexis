import React, { useState } from 'react';
import { Table, Input, Select, Typography, Modal, Button } from 'antd';

const { Option } = Select;
const { Title } = Typography;

const Interns = () => {
  // State for interns data
  const [internsData, setInternsData] = useState([
    {
      key: '1',
      name: 'Alex Johnson',
      id: 'W2201045',
      position: 'Software Engineering Intern',
      date: '2025-04-20',
      status: 'Current',
    },
    {
      key: '2',
      name: 'Jamie Smith',
      id: 'W2201089',
      position: 'Software Engineering Intern',
      date: '2025-04-19',
      status: 'Current',
    },
    {
      key: '3',
      name: 'Taylor Wilson',
      id: 'W2201023',
      position: 'Marketing Assistant',
      date: '2025-04-18',
      status: 'Completed',
    },
    {
      key: '4',
      name: 'Morgan Lee',
      id: 'W2201067',
      position: 'Data Analyst Intern',
      date: '2025-04-15',
      status: 'Completed',
    },
  ]);

  // State for search, filter, selected intern, and modal visibility
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle status change for dropdown
  const handleStatusChange = (key, newStatus) => {
    setInternsData((prevInterns) =>
      prevInterns.map((intern) =>
        intern.key === key ? { ...intern, status: newStatus } : intern
      )
    );
    // Update selected intern's status if they are selected
    if (selectedIntern && selectedIntern.key === key) {
      setSelectedIntern((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Filter data based on search and status
  const filteredData = internsData.filter((intern) => {
    const matchesSearch =
      searchText === '' ||
      intern.name.toLowerCase().includes(searchText.toLowerCase()) ||
      intern.position.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || intern.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle View Details button click
  const handleViewDetails = (record) => {
    setSelectedIntern(record);
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedIntern(null);
  };

  // Table columns
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
      title: 'Start Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Select
            value={record.status}
            style={{ width: 130 }}
            onChange={(value) => handleStatusChange(record.key, value)}
          >
            <Option value="Current">Current</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          style={{ backgroundColor: '#0d9488', borderColor: '#0d9488', color: '#fff' }}
          onClick={() => handleViewDetails(record)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Interns</Title>

      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '16px',
          alignItems: 'center',
        }}
      >
        <Input.Search
          placeholder="Search by name or position"
          allowClear
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />

        <Select
          value={statusFilter}
          style={{ width: 150 }}
          onChange={(value) => setStatusFilter(value)}
        >
          <Option value="all">All Statuses</Option>
          <Option value="Current">Current</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      </div>

      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={false}
      />

      {/* Modal for Intern Details */}
      {selectedIntern && (
        <Modal
          title={selectedIntern.status === 'Completed' ? `${selectedIntern.name}'s Details` : 'Details Unavailable'}
          open={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button
              key="close"
              style={{ backgroundColor: '#0d9488', borderColor: '#0d9488', color: '#fff' }}
              onClick={handleModalClose}
            >
              Close
            </Button>,
          ]}
        >
          {selectedIntern.status === 'Completed' ? (
            <div>
              <p><strong>Student ID:</strong> {selectedIntern.id}</p>
              <p><strong>Position:</strong> {selectedIntern.position}</p>
              <p><strong>Start Date:</strong> {selectedIntern.date}</p>
              <p><strong>Status:</strong> {selectedIntern.status}</p>
            </div>
          ) : (
            <p>Details can only be viewed for interns who have completed their internship.</p>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Interns;