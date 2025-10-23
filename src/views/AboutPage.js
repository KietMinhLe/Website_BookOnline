import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaBook, FaUsers, FaAward, FaHeart, FaGlobe, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaStar, FaQuoteLeft } from 'react-icons/fa';

const AboutPage = () => {
  // Mock team data
  const teamMembers = [
    {
      id: 1,
      name: 'Nguyễn Văn Minh',
      position: 'CEO & Founder',
      avatar: 'https://via.placeholder.com/200x200/6366f1/ffffff?text=NM',
      bio: 'Với hơn 15 năm kinh nghiệm trong ngành xuất bản và công nghệ',
      social: {
        linkedin: '#',
        twitter: '#',
        facebook: '#'
      }
    },
    {
      id: 2,
      name: 'Trần Thị Lan',
      position: 'CTO',
      avatar: 'https://via.placeholder.com/200x200/10b981/ffffff?text=TL',
      bio: 'Chuyên gia công nghệ với niềm đam mê về trải nghiệm người dùng',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      id: 3,
      name: 'Lê Hoàng Nam',
      position: 'Head of Marketing',
      avatar: 'https://via.placeholder.com/200x200/f59e0b/ffffff?text=LN',
      bio: 'Chiến lược gia marketing với tầm nhìn sáng tạo',
      social: {
        linkedin: '#',
        instagram: '#',
        facebook: '#'
      }
    },
    {
      id: 4,
      name: 'Phạm Thị Mai',
      position: 'Head of Content',
      avatar: 'https://via.placeholder.com/200x200/ec4899/ffffff?text=PM',
      bio: 'Biên tập viên giàu kinh nghiệm với tình yêu văn học',
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: '#'
      }
    }
  ];

  // Mock achievements data
  const achievements = [
    { icon: FaBook, number: '50,000+', label: 'Sách trong kho', color: 'primary' },
    { icon: FaUsers, number: '100,000+', label: 'Khách hàng tin tưởng', color: 'success' },
    { icon: FaAward, number: '15+', label: 'Giải thưởng', color: 'warning' },
    { icon: FaGlobe, number: '63', label: 'Tỉnh thành phục vụ', color: 'info' }
  ];

  // Mock testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Nguyễn Thị Hoa',
      role: 'Sinh viên Đại học',
      avatar: 'https://via.placeholder.com/80x80/6366f1/ffffff?text=H',
      content: 'BookStore đã giúp tôi tìm được những cuốn sách hay nhất với giá cả hợp lý. Dịch vụ giao hàng nhanh chóng và nhân viên tư vấn rất nhiệt tình.',
      rating: 5
    },
    {
      id: 2,
      name: 'Trần Văn Đức',
      role: 'Giáo viên',
      avatar: 'https://via.placeholder.com/80x80/10b981/ffffff?text=D',
      content: 'Tôi đã mua sách từ BookStore trong nhiều năm. Chất lượng sách luôn đảm bảo và có nhiều chương trình khuyến mãi hấp dẫn.',
      rating: 5
    },
    {
      id: 3,
      name: 'Lê Thị Mai',
      role: 'Nhân viên văn phòng',
      avatar: 'https://via.placeholder.com/80x80/f59e0b/ffffff?text=M',
      content: 'Website dễ sử dụng, tìm kiếm sách rất tiện lợi. Tôi thường mua sách kinh doanh và phát triển bản thân ở đây.',
      rating: 5
    }
  ];

  return (
    <Container className="py-4">
      {/* Hero Section */}
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="display-4 fw-bold text-primary mb-4">
              <FaBook className="me-3" />
              Về BookStore
            </h1>
            <p className="lead text-muted mb-4">
              Hành trình mang tri thức đến với mọi người từ năm 2010
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Badge bg="primary" className="fs-6 px-3 py-2">
                <FaHeart className="me-1" />
                Đam mê sách
              </Badge>
              <Badge bg="success" className="fs-6 px-3 py-2">
                <FaUsers className="me-1" />
                Phục vụ khách hàng
              </Badge>
              <Badge bg="warning" className="fs-6 px-3 py-2">
                <FaAward className="me-1" />
                Chất lượng cao
              </Badge>
            </div>
          </div>
        </Col>
      </Row>

      {/* About Section */}
      <Row className="mb-5">
        <Col>
          <div className="story-section">
            <h2 className="h3 fw-bold text-primary story-title">Câu chuyện của chúng tôi</h2>
            <div className="story-content">
              <p className="lead">
                Hành trình của BookStore bắt đầu từ một giấc mơ đơn giản: <strong>mang tri thức đến với mọi người</strong>, 
                bất kể họ ở đâu hay hoàn cảnh kinh tế như thế nào.
              </p>
              <p>
                Năm 2010, từ một cửa hàng sách nhỏ bé trên con phố cổ của Hà Nội, chúng tôi đã bắt đầu 
                hành trình phi thường. Với niềm đam mê mãnh liệt về sách và khát khao chia sẻ tri thức, 
                chúng tôi đã từng bước xây dựng một thư viện số khổng lồ với hơn <strong>50,000 đầu sách</strong> 
                đa dạng từ mọi thể loại.
              </p>
              <div className="story-highlight">
                "Ngày nay, BookStore không chỉ là một nhà sách trực tuyến mà còn là người bạn đồng hành 
                của hàng trăm nghìn độc giả trên khắp Việt Nam."
              </div>
              <p>
                Chúng tôi tin rằng mỗi cuốn sách đều chứa đựng một thế giới kỳ diệu, và nhiệm vụ của chúng tôi 
                là giúp bạn khám phá những thế giới đó với giá cả phải chăng nhất.
              </p>
              <p>
                Từ những cuốn sách giáo khoa cho học sinh đến những tác phẩm văn học kinh điển, từ sách 
                kinh doanh đến sách phát triển bản thân - chúng tôi cam kết mang đến cho bạn những lựa chọn 
                tốt nhất với chất lượng đảm bảo và dịch vụ tận tâm.
              </p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Mission & Vision */}
      <Row className="mb-5">
        <Col lg={6} md={12} className="mb-4 mb-lg-0">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <FaHeart size={32} />
                </div>
              </div>
              <h3 className="h4 fw-bold text-center mb-3">Sứ mệnh</h3>
              <p className="text-center text-muted">
                Mang tri thức đến với mọi người thông qua việc cung cấp những cuốn sách 
                chất lượng cao với giá cả hợp lý, góp phần xây dựng một xã hội học tập 
                và phát triển.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} md={12}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <FaGlobe size={32} />
                </div>
              </div>
              <h3 className="h4 fw-bold text-center mb-3">Tầm nhìn</h3>
              <p className="text-center text-muted">
                Trở thành nhà sách trực tuyến hàng đầu Việt Nam, được khách hàng 
                tin tưởng và yêu mến, góp phần lan tỏa văn hóa đọc và phát triển 
                tri thức trong cộng đồng.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Achievements */}
      <Row className="mb-5">
        <Col>
          <h2 className="h3 fw-bold text-center text-primary mb-5">Thành tựu của chúng tôi</h2>
          <Row className="g-4">
            {achievements.map((achievement, index) => (
              <Col key={index} lg={3} md={6} sm={12}>
                <Card className="text-center border-0 shadow-sm h-100">
                  <Card.Body className="p-4">
                    <div className={`bg-${achievement.color} text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3`} style={{ width: '70px', height: '70px' }}>
                      <achievement.icon size={28} />
                    </div>
                    <h3 className="h4 fw-bold text-primary mb-2">{achievement.number}</h3>
                    <p className="text-muted mb-0">{achievement.label}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Team Section */}
      <Row className="mb-5">
        <Col>
          <h2 className="h3 fw-bold text-center text-primary mb-5">Đội ngũ của chúng tôi</h2>
          <Row className="g-4">
            {teamMembers.map((member) => (
              <Col key={member.id} lg={3} md={6} sm={12}>
                <Card className="text-center border-0 shadow-sm h-100 team-card">
                  <Card.Body className="p-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="rounded-circle mb-3"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                    <h5 className="fw-bold text-primary mb-2">{member.name}</h5>
                    <p className="text-muted mb-3">{member.position}</p>
                    <p className="small text-muted mb-3">{member.bio}</p>
                    <div className="d-flex justify-content-center gap-2">
                      {member.social.linkedin && (
                        <Button variant="outline-primary" size="sm" className="rounded-circle">
                          <FaLinkedin />
                        </Button>
                      )}
                      {member.social.twitter && (
                        <Button variant="outline-info" size="sm" className="rounded-circle">
                          <FaTwitter />
                        </Button>
                      )}
                      {member.social.facebook && (
                        <Button variant="outline-primary" size="sm" className="rounded-circle">
                          <FaFacebook />
                        </Button>
                      )}
                      {member.social.instagram && (
                        <Button variant="outline-danger" size="sm" className="rounded-circle">
                          <FaInstagram />
                        </Button>
                      )}
                      {member.social.github && (
                        <Button variant="outline-dark" size="sm" className="rounded-circle">
                          <FaStar />
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Testimonials */}
      <Row className="mb-5">
        <Col>
          <h2 className="h3 fw-bold text-center text-primary mb-5">Khách hàng nói gì về chúng tôi</h2>
          <Row className="g-4">
            {testimonials.map((testimonial) => (
              <Col key={testimonial.id} lg={4} md={6} sm={12}>
                <Card className="border-0 shadow-sm h-100 testimonial-card">
                  <Card.Body className="p-4">
                    <div className="text-center mb-3">
                      <FaQuoteLeft className="text-primary mb-3" size={24} />
                      <div className="d-flex justify-content-center mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} className="text-warning me-1" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted mb-4 text-center">"{testimonial.content}"</p>
                    <div className="d-flex align-items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="rounded-circle me-3"
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                      <div>
                        <h6 className="fw-bold mb-1">{testimonial.name}</h6>
                        <small className="text-muted">{testimonial.role}</small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Contact Section */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-5">
              <h2 className="h3 fw-bold text-center text-primary mb-5">Liên hệ với chúng tôi</h2>
              <Row className="g-4">
                <Col lg={4} md={6} sm={12}>
                  <div className="text-center">
                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                      <FaPhone size={20} />
                    </div>
                    <h6 className="fw-bold mb-2">Điện thoại</h6>
                    <p className="text-muted mb-0">1900 1234</p>
                    <p className="text-muted">(8:00 - 22:00 hàng ngày)</p>
                  </div>
                </Col>
                <Col lg={4} md={6} sm={12}>
                  <div className="text-center">
                    <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                      <FaEnvelope size={20} />
                    </div>
                    <h6 className="fw-bold mb-2">Email</h6>
                    <p className="text-muted mb-0">support@bookstore.vn</p>
                    <p className="text-muted">info@bookstore.vn</p>
                  </div>
                </Col>
                <Col lg={4} md={6} sm={12}>
                  <div className="text-center">
                    <div className="bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                      <FaMapMarkerAlt size={20} />
                    </div>
                    <h6 className="fw-bold mb-2">Địa chỉ</h6>
                    <p className="text-muted mb-0">123 Đường ABC, Quận 1</p>
                    <p className="text-muted">TP. Hồ Chí Minh, Việt Nam</p>
                  </div>
                </Col>
              </Row>
              <div className="text-center mt-4">
                <Button variant="primary" size="lg" className="me-3">
                  <FaEnvelope className="me-2" />
                  Gửi tin nhắn
                </Button>
                <Button variant="outline-primary" size="lg">
                  <FaPhone className="me-2" />
                  Gọi ngay
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Values Section */}
      <Row className="mb-5">
        <Col>
          <h2 className="h3 fw-bold text-center text-primary mb-5">Giá trị cốt lõi</h2>
          <Row className="g-4">
            <Col lg={3} md={6} sm={12}>
              <div className="text-center">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                  <FaHeart size={32} />
                </div>
                <h5 className="fw-bold mb-3">Đam mê</h5>
                <p className="text-muted">Chúng tôi đam mê sách và tri thức, luôn tìm kiếm những cuốn sách hay nhất để chia sẻ với bạn.</p>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12}>
              <div className="text-center">
                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                  <FaUsers size={32} />
                </div>
                <h5 className="fw-bold mb-3">Phục vụ</h5>
                <p className="text-muted">Khách hàng là trung tâm của mọi hoạt động, chúng tôi luôn nỗ lực mang đến trải nghiệm tốt nhất.</p>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12}>
              <div className="text-center">
                <div className="bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                  <FaAward size={32} />
                </div>
                <h5 className="fw-bold mb-3">Chất lượng</h5>
                <p className="text-muted">Chúng tôi cam kết mang đến những sản phẩm và dịch vụ chất lượng cao nhất.</p>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12}>
              <div className="text-center">
                <div className="bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                  <FaGlobe size={32} />
                </div>
                <h5 className="fw-bold mb-3">Đổi mới</h5>
                <p className="text-muted">Luôn cập nhật và đổi mới để mang đến những trải nghiệm mua sắm tốt nhất.</p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
