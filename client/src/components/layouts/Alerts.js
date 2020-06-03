import React, { Fragment, useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  // console.log(alertContext);
  const { alerts } = alertContext;

  return (
    <Fragment>
      <TransitionGroup>
        {alerts.length > 0 &&
          alerts.map((alert) => (
            <CSSTransition key={alert.id} timeout={1000} classNames="item">
              <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle" /> {alert.msg}
              </div>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Alerts;
