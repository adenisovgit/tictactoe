/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

import connect from '../../connect';


// recommended types prop:
//   'secondary'
//   'success'
//   'warning'
// https://getbootstrap.com/docs/4.1/components/alerts/


const autoCloseTime = 3000;

function Notification(props) {
  const {
    show, type, message, closeNotification,
  } = props;

  const [timerId, timerIdUpdate] = useState(0);

  const handleClose = () => closeNotification(type);
  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId);
    }
    if (show) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseTime);
      timerIdUpdate(timer);
    }
  }, [show, type]);

  return show && (
    <Alert
      className="zindex-tooltip fixed-top"
      show={show}
      variant={type}
      onClose={handleClose}
      dismissible
    >
      {message}
    </Alert>
  );
}

export default connect(null)(Notification);
