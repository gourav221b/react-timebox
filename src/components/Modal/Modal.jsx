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
  const [time, setTime] = useState([
    5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  ]);
  const taskName = useRef();
  const startTime = useRef();
  const endTime = useRef();

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
              defaultValue={new Date()}
              ref={startTime}
              min="22:00"
            />

            <label htmlFor="task">End Time</label>
            <input
              type="time"
              name="endTime"
              id="endTime"
              className="form-control"
              ref={endTime}
              min={startTime?.current?.value}
            />

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
