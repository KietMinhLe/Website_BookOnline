import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotificationBell = () => {
  const [unreadCount] = useState(3); // Mock unread count

  return (
    <Link to="/notifications" className="text-white text-decoration-none">
      <div className="position-relative me-2">
        <FaBell />
        {unreadCount > 0 && (
          <Badge bg="danger" className="position-absolute top-0 end-0">
            {unreadCount}
          </Badge>
        )}
      </div>
    </Link>
  );
};

export default NotificationBell;

