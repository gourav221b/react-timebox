import React, { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import "./Modal.css";
import TaskContext from "../../context/TaskProvider";
import uuid from "react-uuid";
import { status } from "../../constants/statusConstant";
import { toastConstants } from "../../constants/toastConstant";
const Modal = () => {
  const { modalOpen, toggleModal, dispatchUserEvent, toastMessage } =
    useContext(TaskContext);

  const taskName = useRef();
  const startTime = useRef();
  const endTime = useRef();

  const addTime = (time) => {
    if (time == 60) {
      if (startTime.current.value.split(":")[0] == 23)
        endTime.current.value =
          parseInt(startTime.current.value.split(":")[0]) +
          1 +
          ":" +
          startTime.current.value.split(":")[1];
      endTime.current.value =
        parseInt(startTime.current.value.split(":")[0]) +
        1 +
        ":" +
        startTime.current.value.split(":")[1];
    } else
      endTime.current.value =
        startTime.current.value.split(":")[0] +
        ":" +
        parseInt(startTime.current.value.split(":")[1]) +
        1;
  };
  const handleSubmit = () => {
    let validate = false;
    let newItem = {
      id: uuid(),
      taskName: taskName.current.value,
      date: new Date(),
      startTime: startTime.current.value,
      endTime: endTime.current.value,
      status: status.Remaining,
    };
    while ((newItem.taskName && newItem.endTime && newItem.startTime) !== "") {
      if (newItem?.startTime > newItem?.endTime) {
        toastMessage(
          toastConstants.FAIL,
          "Start time cannot be greater than end time"
        );
        return;
      }
      dispatchUserEvent("ADD_TASK", newItem);
      toastMessage(toastConstants.SUCCESS, "Task added successfully");
      toggleModal();
      return;
    }
    if (newItem?.taskName == "")
      toastMessage(toastConstants.FAIL, "Add a task name");
    else if (newItem?.startTime == "")
      toastMessage(toastConstants.FAIL, "Add a start name");
    else if (newItem?.endTime == "")
      toastMessage(toastConstants.FAIL, "Add a end name");
  };
  return (
    <>
      {modalOpen && (
        <div className="modalWrapper">
          <div className="closeModal" onClick={toggleModal}>
            &times;
          </div>
          <div className="modalTitle">Add New Task</div>
          <div className="modalForm">
            <label htmlFor="task">Task Name</label>
            <input
              placeholder="Write Task Name"
              type="text"
              ref={taskName}
              className="form-control"
            />
            <label htmlFor="task">Start Time</label>
            <input
              type="time"
              name="startTime"
              id="startTime"
              className="form-control"
              defaultValue={new Date().getTime()}
              onChange={(e) => console.log(typeof e.target.value)}
              ref={startTime}
            />

            <label htmlFor="task">End Time</label>
            <input
              type="time"
              name="endTime"
              id="endTime"
              defaultValue={startTime.current.value}
              className="form-control"
              ref={endTime}
            />
            <label htmlFor="task">Quick Add</label>
            <div className="quickTimerButtonWrapper">
              <div className="quickAddButton" onClick={() => addTime(15)}>
                15 mins
              </div>
              <div className="quickAddButton" onClick={() => addTime(30)}>
                30 mins
              </div>
              <div className="quickAddButton" onClick={() => addTime(60)}>
                1 hour
              </div>
            </div>
            <button className="addTaskBtn" onClick={() => handleSubmit()}>
              Add Task
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
