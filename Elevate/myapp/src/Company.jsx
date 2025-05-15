import './internship-portal.css';
// Add this at the top of your file (if missing)
import 'antd/dist/reset.css'; // For Ant Design v5+
import { useNavigate } from 'react-router-dom';
import CompanyEvaluations from './CompanyEvaluations';
import InternshipListing from './InternshipListing';
import Applications from './Applications';
import Interns from './Interns';

import React, { useState } from 'react';
import {
 Input, Modal,Layout, Menu, Avatar, Badge, Button, Tag, List, ConfigProvider,Typography, Row, Col, Card, Table,Space,Form,Select,DatePicker
} from 'antd';
import {
  DashboardOutlined, FileTextOutlined, TeamOutlined,
  MailOutlined, SettingOutlined,EyeOutlined, EditOutlined, DeleteOutlined,PlusOutlined 
} from '@ant-design/icons';

const { Option } = Select;


const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const messages = [
  { id: 1, subject: 'SCAD accepted your application!' },
  { id: 3, subject: 'Alex Johnson applied for Data Analyst Intern!' },
  { id: 2, subject: 'Hana applied for Software Engineering Intern!' },
];



const Company = () => {

const handleStatusChange = (key, newStatus) => {
  console.log('Key:', key, 'New Status:', newStatus);
  setInternsData((prevData) =>
    prevData.map((intern) =>
      intern.key === key ? { ...intern, status: newStatus } : intern
    )
  );
};
   const [showEvaluations, setShowEvaluations] = useState(false);
     const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
    const [selectedInternship, setSelectedInternship] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);

      const [isFormVisible, setIsFormVisible] = useState(false);
  const [form] = Form.useForm();

   const [isEditMode, setIsEditMode] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  const [searchText, setSearchText] = useState('');
  

  const recentActivities = [
    {
      title: 'New application received',
      description: 'Alex Johnson applied for Software Engineering Intern',
      time: 'Today, 09:45 AM',
    },
    {
      title: 'Application status updated',
      description: "Taylor Wilson's application was accepted",
      time: 'Yesterday, 03:20 PM',
    },
    {
      title: 'New intern onboarded',
      description: 'Morgan Lee started as Data Analyst Intern',
      time: 'April 20, 2025',
    },
    {
      title: 'New internship posted',
      description: 'Software Engineering Intern position was published',
      time: 'April 15, 2025',
    },
  ];
  const handleViewProfile = (record) => {
    // Generate consistent dummy data based on record key
    const randomUni = universities[parseInt(record.key) % universities.length];
    const randomYear = years[parseInt(record.key) % years.length];
    const randomGender = genders[parseInt(record.key) % genders.length];
    
    setSelectedApplicant({
      ...record,
      university: randomUni,
      year: randomYear,
      gender: randomGender
    });
    setIsProfileVisible(true);
  };
  
  const [showList, setShowList] = useState(false);
  const [isPostModalVisible, setIsPostModalVisible] = useState(false);
  const handlePostNewClick = () => setIsPostModalVisible(true);
const handlePostModalCancel = () => setIsPostModalVisible(false);
const [selectedPaidFilter, setSelectedPaidFilter] = useState("all");

const handlePostSubmit = (values) => {
  console.log('Submitted:', values);
  setIsPostModalVisible(false);
};

  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);


  // Dummy data generators
  const universities = [
    'Harvard University', 
    'Stanford University',
    'MIT',
    'University of California',
    'NYU',
    'Columbia University'
  ];
  
  const years = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];
  const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

  const renderContent = () => {

  const [internshipData, setInternshipData] = useState([
    {
      key: "1",
      position: "Software Engineering Intern",
      duration: "1 month",
     paid: "unpaid",
      postedDate: "2025-04-15",
      applications: 12,
    },
    {
      key: "2",
      position: "Marketing Assistant",
       duration: "1 month",
         paid: "paid",
      postedDate: "2025-04-10",
      applications: 8,
    },

      {
    key: "3",
    position: "Data Analyst Intern",
    duration: "1 month",
    paid: "paid",
    postedDate: "2025-04-05",
    applications: 15,
  },

  ]);

  


  const handlePostNewClick = () => {
    setIsFormVisible(true);
  };
const handleView = (key) => {
    const internship = internshipData.find(item => item.key === key);
    setSelectedInternship(internship);
    setDetailVisible(true);
  };


const handleFormSubmit = (values) => {
  if (isEditMode) {
    // Update existing internship
    setInternshipData(prevData => 
      prevData.map(item => 
        item.key === editingKey 
          ? { 
              ...item,
              position: values.position,
              postedDate: values.posteddate,
              duration: values.Duration,
              description: values.description,
              salary: values['Salary (if paid)'],
              paid: values.Paidorunpaid,
              skills: values.skills,
              applications: values.applications // Add this line
            } 
          : item
      )
    );
  } else {
    const newInternship = {
      key: Date.now().toString(),
      position: values.position,
      duration: values.Duration,
      postedDate: values.posteddate,
      applications: values.applications, // Use the form value
      description: values.description,
      salary: values['Salary (if paid)'],
      paid: values.Paidorunpaid,
      skills: values.skills
    };
    setInternshipData(prevData => [...prevData, newInternship]);
  }

  form.resetFields();
  setIsFormVisible(false);
  setIsEditMode(false);
  setEditingKey('');
};

const handleEdit = (key) => {
  const internship = internshipData.find(item => item.key === key);
  if (internship) {
    form.setFieldsValue({
      position: internship.position,
      posteddate: internship.postedDate, // Note: matches Form.Item name
      Duration: internship.duration,     // Note: matches Form.Item name
      skills: internship.skills,
      'Salary (if paid)': internship.salary,
      Paidorunpaid: internship.paid,
      description: internship.description,
      applications: internship.applications
    });
    setEditingKey(key);
    setIsEditMode(true);
    setIsFormVisible(true);
  }
};
  const handleFormCancel = () => {
    form.resetFields();
    setIsFormVisible(false);
  };
const handleDelete = (key) => {
  console.log("Attempting to delete key:", key);

  setInternshipData(prevData => {
    const newData = prevData.filter(item => item.key === key ? false : true);
    console.log("New data after deletion:", newData);
    return newData;
  });
};

    switch (activeTab) {  
                            
case 'internship-posts':
  

  return (
    <div style={{ padding: '20px' }}>
     <Title level={2}>Internship Posts</Title>
      
      {/* Internship Form Modal */}
      <Modal
        title="Create New Internship"
        open={isFormVisible}  // Note: 'visible' is deprecated, use 'open' in newer Ant Design versions
        onCancel={handleFormCancel}
        footer={[
          <Button key="back" onClick={handleFormCancel}>
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={() => form.submit()}
            style={{ backgroundColor: '#0d9488' }}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: 'Please input the position!' }]}
          >
            <Input />
          </Form.Item>


           <Form.Item
            name="posteddate"
            label="posted date"
            rules={[{ required: true, message: 'Please input the date!' }]}
          >
             <Input type="date" />
          </Form.Item>


                <Form.Item
            name="skills"
            label="skills"
            rules={[{ required: true, message: 'Please input the skills!' }]}
          >
            <Input />
          </Form.Item>

           <Form.Item
            name="applications"
            label="Number of Applications"
            rules={[{ required: true, message: 'Please input the number of applications!' }]}
          >
        <Input type="number" />
          </Form.Item>

           <Form.Item
            name="Duration"
            label="Duration"
            rules={[{ required: true, message: 'Please input the duration!' }]}
          >
            <Input />
          </Form.Item>

               <Form.Item
            name="Salary (if paid)"
            label="Salary (if paid)"
             rules={[{ required: true, message: 'Please input the salary!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Paidorunpaid"
            label="Paid or unpaid"
            rules={[{ required: true, message: 'Please select the department!' }]}
          >
            <Select>
              <Select.Option value="paid">Paid</Select.Option>
              <Select.Option value="unpaid">Unpaid</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>


        <Modal
        title={selectedInternship?.position || 'Internship Details'}
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailVisible(false)}>
            Close
          </Button>
        ]}
        width={600}
      >
     {selectedInternship && (
  <div style={{ padding: '16px 0' }}>
    {/* Salary (only if paid) */}
    {selectedInternship.paid === 'paid' && selectedInternship.salary && (
      <div style={{ marginBottom: 24 }}>
        <h4 style={{ marginBottom: 8 }}>Salary</h4>
        <div style={{ 
          backgroundColor: '#f8f9fa',
          padding: 12,
          borderRadius: 4,
          borderLeft: '4px solid #0d9488'
        }}>
          {selectedInternship.salary}
        </div>
      </div>
    )}

    {/* Skills Section - Now properly connected to form input */}
    <div style={{ marginBottom: 24 }}>
      <h4 style={{ marginBottom: 8 }}>Required Skills</h4>
      <div style={{ 
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 4,
        minHeight: 60,
        borderLeft: '4px solid #0d9488',
        whiteSpace: 'pre-wrap'
      }}>
        {selectedInternship.skills}
      </div>
    </div>

    {/* Job Description */}
    <div>
      <h4 style={{ marginBottom: 8 }}>Job Description</h4>
      <div style={{ 
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 4,
        minHeight: 100,
        borderLeft: '4px solid #0d9488',
        whiteSpace: 'pre-wrap'
      }}>
        {selectedInternship.description}
      </div>
    </div>
  </div>
)}
      </Modal>
  {/* Post New Internship Button */}
<div style={{
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
  gap: '4px'
}}>
  <Button 
    type="primary" 
    style={{ backgroundColor: '#0d9488' }} 
    onClick={handlePostNewClick}
  >
    + Post New Internship
  </Button>

  <Input.Search
    placeholder="Search by position..."
    allowClear
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    style={{ width: 200 }}
  />

  <Select 
    defaultValue="all"
    style={{ width: 120 }}
    onChange={(value) => setSelectedPaidFilter(value)}
  >
    <Option value="all">All Paid Status</Option>
    <Option value="paid">Paid</Option>
    <Option value="unpaid">Unpaid</Option>
  </Select>
</div>

<Table
  dataSource={internshipData.filter(item =>
    item.position.toLowerCase().includes(searchText.toLowerCase()) &&
    (selectedPaidFilter === 'all' || item.paid === selectedPaidFilter)
  )}
        columns={[
          { title: "Position", dataIndex: "position", key: "position" },
          { title: "Duration", dataIndex: "duration", key: "duration" },
          { title: "Paid", dataIndex: "paid", key: "paid" },
          { title: "Posted Date", dataIndex: "postedDate", key: "postedDate" },
          { title: "Applications Submitted", dataIndex: "applications", key: "applications" },
          { 
            title: "Actions", 
            key: "actions", 
            render: (_, record) => (
              <Space size="middle">
                <Button 
                  type="primary"
                style={{ backgroundColor: '#0d9488' }} 
                  onClick={() => handleView(record.key)}
                >
                 View Details   
                 </Button>

                  <Button 
                  type="primary"
                style={{ backgroundColor: '#0d9488' }} 
                  onClick={() => handleEdit(record.key)}
                >
                Edit  
                 </Button>


     <Button 
                  type="primary"
                style={{ backgroundColor: '#0d9488' }} 
                  onClick={() => handleDelete(record.key)}
                >
                Delete 
                 </Button>
  
        </Space>
      ),
    },
  ]}
/>
    </div>
  );
      case 'dashboard':
        return (
          <div style={{ padding: '20px' }}>
            <Row gutter={[16, 16]}>
              <Col span={16}>
                <Card title="Company Profile">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Text strong>Industry:</Text> Information Technology<br />
                      <Text strong>Company Size:</Text> 50–200 employees<br />
                      <Text strong>Contact Email:</Text> careers@techinnovate.com
                    </Col>
                    <Col span={12}>
                      <Text strong>Location:</Text> San Francisco, CA<br />
                      <Text strong>Website:</Text> <a href="https://www.techinnovate.com">www.techinnovate.com</a><br />
                      <Text strong>Member Since:</Text> January 2024
                    </Col>
                  </Row>
                </Card>

                <Card title="Recent Activities" style={{ marginTop: 16 }}>
                  <List
                    itemLayout="vertical"
                    dataSource={recentActivities}
                    renderItem={item => (
                      <List.Item>
                        <Text strong>{item.title}</Text>
                        <br />
                        <Text>{item.description}</Text>
                        <div style={{ fontSize: 12, color: 'gray' }}>{item.time}</div>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>

              <Col span={8}>
                <Card title="Active Internship Posts">
                  <Title level={2}>3</Title>
                </Card>

                <Card title="Pending Applications" style={{ marginTop: 16 }}>
                  <Title level={2}>8</Title>
                </Card>

                <Card title="Current Interns" style={{ marginTop: 16 }}>
                  <Title level={2}>2</Title>
                </Card>

                <Card title="Documents & Verification" style={{ marginTop: 16 }}>
                  <p>Business Registration: <Tag color="green">Verified</Tag></p>
                  <p>Company Profile: <Tag color="green">Verified</Tag></p>
                  <p>Representative ID: <Tag color="green">Verified</Tag></p>
                  <Button type="default" block>Upload Additional Documents</Button>
                </Card>
              </Col>
            </Row>
          </div>
        );
        
case 'interns':
    return <Interns />;
case 'applications':
    return <Applications />;
  
case 'evaluations':
 return <CompanyEvaluations />;

  case 'other companies':
     return <InternshipListing />;
  
      default:
        return <div style={{ padding: '20px' }}>Content for {activeTab} will be here</div>;
    }
  };


  return (
    <Layout className={`layout ${darkMode ? 'dark-mode' : ''}`}>
      <Header className="header">
        <div className="header-center">
          <div className="header-left">
            <div className="logo-container">
              <div className="logo-circle">
                <i className="fas fa-arrow-up logo-icon" />
              </div>
              <span className="logo-text">Elevate</span>
            </div>
            <span className="company-title">Company Portal</span>
          </div>
          <div className="header-right">
  <div style={{ position: 'relative' }}>
    <Button
      type="text"
      icon={<MailOutlined />}
      onClick={() => setShowList(!showList)}
      className="mailbox-button"
    />
    {showList && (
      <Card
        style={{
          position: 'absolute',
          right: 0,
          top: '100%',
          width: 500,
          zIndex: 1000,
        }}
      >
        <List
          dataSource={messages}
          renderItem={item => (
            <List.Item key={item.id}>
              <Text>{item.subject}</Text>
            </List.Item>
          )}
        />
      </Card>
    )}
  </div>
  <Avatar size="large" className="avatar">TC</Avatar>
</div>
        </div>
      </Header>

      <Layout>
        <Sider width={250} theme="light" className="sidebar">
          <div className="company-info">
            <Avatar size={64} />
            <h3 className="company-name">TechInnovate Solutions</h3>
            <Tag color="green" className="verified-tag">Verified Company</Tag>
          </div>

          <Menu mode="inline" selectedKeys={[activeTab]} onClick={({ key }) => setActiveTab(key)}>
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
            <Menu.Item key="internship-posts" icon={<FileTextOutlined />}>Internship Posts</Menu.Item>
            <Menu.Item key="applications" icon={<i className="fas fa-clipboard-list" />}>Applications</Menu.Item>
            <Menu.Item key="interns" icon={<TeamOutlined />}>Interns</Menu.Item>
            <Menu.Item key="evaluations" icon={<i className="fas fa-star" />}>Evaluations</Menu.Item>
            <Menu.Item key="other companies" icon={<i className="fas fa-book" />}>Other Companies</Menu.Item>
          </Menu>
        </Sider>
        <Content className="page-container">
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Company;

