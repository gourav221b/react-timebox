import React, { useContext, lazy, Suspense } from "react";
import TaskContext from "../context/TaskProvider";
import { FaBell, FaBellSlash } from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";
import empty from "../assets/empty.svg";
import { toastConstants } from "../constants/toastConstant";
import { NavLink } from "react-router-dom";
const Task = lazy(() => import("../components/Task/Task"));

const renderLoader = () => <p>Loading....</p>;
const TaskList = ({ active }) => {
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
    <Suspense fallback={renderLoader()}>
      <div className="sectionTop">
        <span>{window.location.pathname.split("/")[1]}</span>
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
          <NavLink to="/todo/all">All</NavLink>
          <NavLink to="/todo/completed">Completed</NavLink>
          <NavLink to="/todo/remaining">Remaining</NavLink>
        </div>
      )}
      {task?.length == 0 ? (
        <>
          <div className="noTaskImage">
            <img src={empty} alt="" />
            Nothing added yet!
          </div>
          <div className="createNewBtnWrapper">
            <div className="createNew" onClick={() => toggleModal()}>
              + Add Task
            </div>
          </div>
        </>
      ) : (
        <section className="taskMainWrapper">
          {active !== "all" && (
            <Task task={task?.filter((task) => task.status === active)} />
          )}
          {active === "all" && <Task task={task} />}
        </section>
      )}
    </Suspense>
  );
};

export default TaskList;
