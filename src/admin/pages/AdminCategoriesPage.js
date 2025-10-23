import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Table, 
  Button, 
  Form, 
  Badge,
  InputGroup,
  Modal,
  ButtonGroup,
  Alert
} from 'react-bootstrap';
import { 
  FaSearch, 
  FaEdit, 
  FaTrash,
  FaPlus,
  FaTag,
  FaBook,
  FaEye
} from 'react-icons/fa';

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    status: 'active',
    parentId: null,
    sortOrder: 0
  });

  useEffect(() => {
    // Mock data
    setCategories([
      {
        id: 1,
        name: 'Lập trình',
        slug: 'lap-trinh',
        description: 'Sách về lập trình và công nghệ thông tin',
        status: 'active',
        parentId: null,
        sortOrder: 1,
        bookCount: 45,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'JavaScript',
        slug: 'javascript',
        description: 'Sách về ngôn ngữ lập trình JavaScript',
        status: 'active',
        parentId: 1,
        sortOrder: 1,
        bookCount: 12,
        createdAt: '2024-01-02T00:00:00Z'
      },
      {
        id: 3,
        name: 'React',
        slug: 'react',
        description: 'Sách về thư viện React.js',
        status: 'active',
        parentId: 1,
        sortOrder: 2,
        bookCount: 8,
        createdAt: '2024-01-03T00:00:00Z'
      },
      {
        id: 4,
        name: 'Khoa học',
        slug: 'khoa-hoc',
        description: 'Sách về khoa học và nghiên cứu',
        status: 'active',
        parentId: null,
        sortOrder: 2,
        bookCount: 23,
        createdAt: '2024-01-04T00:00:00Z'
      }
    ]);
  }, []);

  const statusOptions = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'active', label: 'Hoạt động' },
    { value: 'inactive', label: 'Không hoạt động' }
  ];

  const parentCategories = categories.filter(cat => cat.parentId === null);

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || category.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? <Badge bg="success">Hoạt động</Badge>
      : <Badge bg="secondary">Không hoạt động</Badge>;
  };

  const getParentCategoryName = (parentId) => {
    if (!parentId) return '-';
    const parent = categories.find(cat => cat.id === parentId);
    return parent ? parent.name : 'Không xác định';
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      status: 'active',
      parentId: null,
      sortOrder: 0
    });
    setShowModal(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      status: category.status,
      parentId: category.parentId,
      sortOrder: category.sortOrder
    });
    setShowModal(true);
  };

  const handleSaveCategory = () => {
    if (!formData.name.trim()) {
      alert('Vui lòng nhập tên danh mục');
      return;
    }

    const categoryData = {
      ...formData,
      slug: formData.slug || generateSlug(formData.name),
      sortOrder: parseInt(formData.sortOrder) || 0
    };

    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...categoryData }
          : cat
      ));
    } else {
      const newCategory = {
        id: Math.max(...categories.map(c => c.id)) + 1,
        ...categoryData,
        bookCount: 0,
        createdAt: new Date().toISOString()
      };
      setCategories([...categories, newCategory]);
    }

    setShowModal(false);
  };

  const handleDeleteCategory = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    const hasChildren = categories.some(cat => cat.parentId === categoryId);
    
    if (hasChildren) {
      alert('Không thể xóa danh mục có danh mục con');
      return;
    }
    
    if (category.bookCount > 0) {
      alert('Không thể xóa danh mục có sách');
      return;
    }

    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      setCategories(categories.filter(cat => cat.id !== categoryId));
    }
  };

  const handleToggleStatus = (categoryId) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, status: cat.status === 'active' ? 'inactive' : 'active' }
        : cat
    ));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý danh mục</h2>
        <Button variant="primary" onClick={handleAddCategory}>
          <FaPlus className="me-2" />
          Thêm danh mục
        </Button>
      </div>

      {/* Statistics */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h4 className="text-primary">{categories.length}</h4>
              <p className="text-muted">Tổng danh mục</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h4 className="text-success">{categories.filter(c => c.status === 'active').length}</h4>
              <p className="text-muted">Đang hoạt động</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h4 className="text-info">{categories.filter(c => c.parentId === null).length}</h4>
              <p className="text-muted">Danh mục cha</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h4 className="text-warning">{categories.reduce((sum, cat) => sum + cat.bookCount, 0)}</h4>
              <p className="text-muted">Tổng sách</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm theo tên, slug, mô tả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={3}>
              <Button variant="outline-secondary" className="w-100">
                Lọc
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Categories Table */}
      <Card>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Tên danh mục</th>
                <th>Slug</th>
                <th>Danh mục cha</th>
                <th>Mô tả</th>
                <th>Số sách</th>
                <th>Thứ tự</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <FaTag className="text-muted me-2" />
                      <div>
                        <div className="fw-bold">{category.name}</div>
                        <small className="text-muted">ID: {category.id}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <code>{category.slug}</code>
                  </td>
                  <td>
                    {getParentCategoryName(category.parentId)}
                  </td>
                  <td>
                    <div className="text-truncate" style={{maxWidth: '200px'}}>
                      {category.description}
                    </div>
                  </td>
                  <td>
                    <Badge bg="info">
                      <FaBook className="me-1" />
                      {category.bookCount}
                    </Badge>
                  </td>
                  <td>
                    <span className="fw-bold">{category.sortOrder}</span>
                  </td>
                  <td>{getStatusBadge(category.status)}</td>
                  <td>
                    <ButtonGroup size="sm">
                      <Button 
                        variant="outline-primary" 
                        title="Xem chi tiết"
                      >
                        <FaEye />
                      </Button>
                      <Button 
                        variant="outline-warning" 
                        title="Chỉnh sửa"
                        onClick={() => handleEditCategory(category)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant={category.status === 'active' ? 'outline-danger' : 'outline-success'}
                        title={category.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                        onClick={() => handleToggleStatus(category.id)}
                      >
                        {category.status === 'active' ? 'Ẩn' : 'Hiện'}
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        title="Xóa"
                        onClick={() => handleDeleteCategory(category.id)}
                        disabled={category.bookCount > 0 || categories.some(cat => cat.parentId === category.id)}
                      >
                        <FaTrash />
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add/Edit Category Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Tên danh mục *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Nhập tên danh mục"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  placeholder="Tự động tạo từ tên"
                />
                <Form.Text className="text-muted">
                  Để trống để tự động tạo từ tên danh mục
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Danh mục cha</Form.Label>
                <Form.Select
                  value={formData.parentId || ''}
                  onChange={(e) => setFormData({...formData, parentId: e.target.value ? parseInt(e.target.value) : null})}
                >
                  <option value="">Không có (danh mục cha)</option>
                  {parentCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Thứ tự sắp xếp</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({...formData, sortOrder: e.target.value})}
                  placeholder="0"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Trạng thái</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Mô tả về danh mục..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveCategory}>
            {editingCategory ? 'Cập nhật' : 'Thêm danh mục'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminCategoriesPage;
