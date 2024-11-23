import React from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import '../styles/stats.css';

function Stats() {
  const stats = [
    { 
      title: 'Followers',
      value: 2481,
      icon: <i className="fa-solid fa-users"></i>,
      trend: 12.5,
      color: '#0d6efd'
    },
    { 
      title: 'Views',
      value: 14892,
      icon: <i className="fa-solid fa-eye"></i>,
      trend: 8.2,
      color: '#6610f2'
    },
    { 
      title: 'Likes',
      value: 1849,
      icon: <i className="fa-solid fa-heart"></i>,
      trend: 14.3,
      color: '#dc3545'
    },
    { 
      title: 'Bookmarks',
      value: 642,
      icon: <i className="fa-solid fa-bookmark"></i>,
      trend: 4.8,
      color: '#198754'
    },
    { 
      title: 'Comments',
      value: 438,
      icon: <i className="fa-solid fa-comments"></i>,
      trend: 6.7,
      color: '#0dcaf0'
    }
  ];

  const monthlyData = [
    { month: 'Jan', views: 1200 },
    { month: 'Feb', views: 1800 },
    { month: 'Mar', views: 2400 },
    { month: 'Apr', views: 2100 },
    { month: 'May', views: 2800 },
    { month: 'Jun', views: 3200 }
  ];

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="display-6 fw-bold">Stats</h2>
          <p className="text-muted">Monitor the performance of your content</p>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        {stats.map((stat, index) => (
          <Col key={index} xs={12} md={6} lg={4} xl>
            <Card className="h-100 border-0 shadow-sm stat-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="text-muted mb-2">{stat.title}</h6>
                    <h3 className="mb-0 fw-bold">{stat.value.toLocaleString()}</h3>
                  </div>
                  <div className="stat-icon rounded-circle p-3" style={{backgroundColor: `${stat.color}20`}}>
                    <span style={{color: stat.color, fontSize: '1.5rem'}}>{stat.icon}</span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fa-solid fa-trending-up text-success me-1"></i>
                  <span className="text-success me-1">{stat.trend}%</span>
                  <small className="text-muted">vs last month</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Stats;
