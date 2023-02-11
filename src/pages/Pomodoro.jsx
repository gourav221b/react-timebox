import React, { Suspense, useContext } from "react";
import empty from "../assets/empty.svg";
import TaskContext from "../context/TaskProvider";
const renderLoader = () => <p>Loading....</p>;
const Pomodoro = () => {
  const {
    task,
    modalOpen,
    toggleModal,
    toastMessage,
    notification,
    toggleNotifications,
  } = useContext(TaskContext);

  return (
    <Suspense fallback={renderLoader()}>
      <div className="sectionTop">
        <span>{window.location.pathname.split("/")[1]}</span>
        <div className="navRight">
          {/* <div
            id="Notification-Toggler"
            onClick={() => toggleNotificationHandler()}
          >
            {notification ? <FaBell /> : <FaBellSlash />}
          </div> */}
          {/* <ReactTooltip
            anchorId="Notification-Toggler"
            place="bottom"
            content={
              notification ? "Disable Notifications" : "Enable Notifications"
            }
          /> */}
          <div
            className="createNew"
            onClick={() => {
              console.log(modalOpen);
              toggleModal();
            }}
          >
            + New Pomodoro
          </div>
        </div>
      </div>

      {task?.length == 0 ? (
        <>
          <div className="noTaskImage">
            <img src={empty} alt="" />
            Nothing added yet!
          </div>
          <div className="createNewBtnWrapper">
            <div className="createNew" onClick={() => toggleModal()}>
              + New Pomodoro
            </div>
          </div>
        </>
      ) : (
        <section className="taskMainWrapper">
          {/* {active !== "all" && (
            <Task task={task?.filter((task) => task.status === active)} />
          )}
          {active === "all" && <Task task={task} />} */}
        </section>
      )}
    </Suspense>
  );
};

export default Pomodoro;
