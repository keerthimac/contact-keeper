import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import AlertContext from '../../context/alert/AlertContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Alertitem = ({ alert }) => {
  //   const alertContext = useContext(AlertContext);
  console.log(alert);
  //   const [alerts] = alerts;
  return (
    <div className={`alert alert-${alert.type}`}>
      <i className="fas fa-info-circle" /> {alert.msg}
    </div>
  );
};

export default Alertitem;

// testing purpose only
