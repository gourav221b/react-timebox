import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom/dist";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FaBell, FaBellSlash } from "react-icons/fa";
import TaskContext from "../../context/TaskProvider";
import "./Nav.css";
import { toastConstants } from "../../constants/toastConstant";
const Nav = ({ role }) => {
  const {
    task,
    modalOpen,
    toggleModal,
    toastMessage,
    notification,
    toggleNotifications,
  } = useContext(TaskContext);

  const toggleNotificationHandler = () => {
    toastMessage(
      toastConstants.SUCCESS,
      notification ? "Notifications disabled" : "Notifications enabled"
    );
    toggleNotifications();
  };
  return (
    <section className="navWrapper">
      <div className="navTop">
        <span>Timeboxing</span>
        <div className="navRight">
          <div
            id="Notification-Toggler"
            onClick={() => toggleNotificationHandler()}
          >
            {notification ? <FaBell /> : <FaBellSlash />}
          </div>
          <ReactTooltip
            anchorId="Notification-Toggler"
            place="bottom"
            content={
              notification ? "Disable Notifications" : "Enable Notifications"
            }
          />
          <div
            className="createNew"
            onClick={() => {
              console.log(modalOpen);
              toggleModal();
            }}
          >
            + Add Task
          </div>
        </div>
      </div>
      {task?.length > 0 && (
        <div className="TabsWrapper">
          <NavLink to="">All</NavLink>
          <NavLink to="completed">Completed</NavLink>
          <NavLink to="remaining">Remaining</NavLink>
        </div>
      )}
    </section>
  );
};

export default Nav;
