import React, { useState } from 'react';
import { Table, Button, Space, Tag, Select, Input, Modal } from 'antd';

const InternshipListings = () => {
  // Sample internship data
  const initialInternships = [
    { 
      id: 1, 
      company: "Google", 
      title: "UX Design Intern", 
      duration: "10 weeks", 
      industry: "Tech",
      type: "Paid",
      postedDate: "2025-05-01",
      expectedSalary: "$20/hour",
      skillsRequired: "Figma, Sketch, Adobe XD",
      jobDescription: "Assist the design team with UX/UI design tasks, prototyping, and user research.",
    },
    { 
      id: 2, 
      company: "Apple", 
      title: "Graphic Design Intern", 
      duration: "12 weeks", 
      industry: "Tech",
      type: "Paid",
      postedDate: "2025-05-03",
      expectedSalary: "$18/hour",
      skillsRequired: "Illustrator, Photoshop, InDesign",
      jobDescription: "Work on creative graphic design projects, from concept to completion.",
    },
    { 
      id: 3, 
      company: "Adobe", 
      title: "UI/UX Design Intern", 
      duration: "6 months", 
      industry: "Design",
      type: "Paid",
      postedDate: "2025-04-28",
      expectedSalary: "$25/hour",
      skillsRequired: "Adobe XD, Sketch, User Research",
      jobDescription: "Collaborate on UI/UX design projects, wireframing, prototyping, and user testing.",
    },
    { 
      id: 4, 
      company: "Disney", 
      title: "Animation Intern", 
      duration: "3 months", 
      industry: "Entertainment",
      type: "Paid",
      postedDate: "2025-04-25",
      expectedSalary: "$22/hour",
      skillsRequired: "Maya, Blender, Storyboarding",
      jobDescription: "Assist in the creation of animated content, including character design and animation.",
    },
    { 
      id: 5, 
      company: "Nike", 
      title: "Product Design Intern", 
      duration: "4 months", 
      industry: "Fashion",
      type: "Unpaid",
      postedDate: "2025-05-05",
      expectedSalary: "$0",
      skillsRequired: "SolidWorks, Adobe Illustrator",
      jobDescription: "Design product concepts and prototypes, assist with material selection and testing.",
    }
  ];

  // Default filter values - changed to empty/null to show all data initially
  const [searchText, setSearchText] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState(null); // Changed to null
  const [selectedDuration, setSelectedDuration] = useState(null); // Changed to null
  const [selectedType, setSelectedType] = useState(null); // Changed to null
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);

  // Dropdown options
  const industries = [...new Set(initialInternships.map(item => item.industry))];
  const durations = [...new Set(initialInternships.map(item => item.duration))];
  const types = [...new Set(initialInternships.map(item => item.type))];

  // Filter internships based on the selected filters
  const filteredInternships = initialInternships.filter(i => {
    const matchesText = searchText === '' || 
      i.company.toLowerCase().includes(searchText.toLowerCase()) ||
      i.title.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesIndustry = !selectedIndustry || i.industry === selectedIndustry;
    const matchesDuration = !selectedDuration || i.duration === selectedDuration;
    const matchesType = !selectedType || i.type === selectedType;

    return matchesText && matchesIndustry && matchesDuration && matchesType;
  });

  // Table columns
  const columns = [
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company'
    },
    {
      title: 'Position',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration'
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'Paid' ? 'green' : 'orange'}>
          {type}
        </Tag>
      )
    },
    {
      title: 'Posted Date',
      dataIndex: 'postedDate',
      key: 'postedDate'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            style={{ backgroundColor: '#319795', borderColor: '#319795' }}
            onClick={() => showDetails(record)}
          >
            View Details
          </Button>
        </Space>
      )
    }
  ];

  const showDetails = (internship) => {
    setSelectedInternship(internship);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedInternship(null);
  };

  const resetFilters = () => {
    setSearchText('');
    setSelectedIndustry(null); // Reset to null
    setSelectedDuration(null); // Reset to null
    setSelectedType(null); // Reset to null
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '24px', color: '#333' }}>
        SCAD Internship Opportunities
      </h1>

      {/* Search and Filter Section */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px',
        alignItems: 'center'
      }}>
        <Input
          placeholder="Search by company or position"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '300px' }}
        />

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Select
            placeholder="Filter by industry"
            style={{ width: '180px' }}
            value={selectedIndustry}
            onChange={(value) => setSelectedIndustry(value)}
            allowClear
          >
            {industries.map(industry => (
              <Select.Option key={industry} value={industry}>
                {industry}
              </Select.Option>
            ))}
          </Select>

          <Select
            placeholder="Filter by duration"
            style={{ width: '180px' }}
            value={selectedDuration}
            onChange={(value) => setSelectedDuration(value)}
            allowClear
          >
            {durations.map(duration => (
              <Select.Option key={duration} value={duration}>
                {duration}
              </Select.Option>
            ))}
          </Select>

          <Select
            placeholder="Paid/Unpaid"
            style={{ width: '180px' }}
            value={selectedType}
            onChange={(value) => setSelectedType(value)}
            allowClear
          >
            {types.map(type => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>

          <Button 
            onClick={resetFilters}
            style={{ marginLeft: '8px' }}
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Result Count */}
      <div style={{ marginBottom: '16px', color: '#666' }}>
        Showing {filteredInternships.length} of {initialInternships.length} internships
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredInternships}
        rowKey="id"
        bordered
        pagination={{ pageSize: 10 }}
        style={{ marginBottom: '24px' }}
      />

      {/* Modal for displaying company details */}
      <Modal
        title="Internship Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedInternship && (
          <div style={{ lineHeight: '1.6' }}>
            <h3 style={{ marginBottom: '16px' }}>{selectedInternship.title} at {selectedInternship.company}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <p><strong>Type:</strong> <Tag color={selectedInternship.type === 'Paid' ? 'green' : 'orange'}>
                  {selectedInternship.type}
                </Tag></p>
              </div>
              <div>
                <p><strong>Expected Salary:</strong> {selectedInternship.expectedSalary}</p>
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <p><strong>Skills Required:</strong></p>
              <p>{selectedInternship.skillsRequired}</p>
            </div>
            <div style={{ marginTop: '16px' }}>
              <p><strong>Job Description:</strong></p>
              <p>{selectedInternship.jobDescription}</p>
            </div>
          </div>
        )}
      </Modal>

      <div style={{ 
        marginTop: '40px', 
        paddingTop: '20px', 
        borderTop: '1px solid #eee',
        color: '#666',
        fontSize: '14px'
      }}>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>Contact SCAD Career Services: careerservices@scad.edu</p>
      </div>
    </div>
  );
};

export default InternshipListings;
