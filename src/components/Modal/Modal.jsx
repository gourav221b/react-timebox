import React, { useContext, useRef, useState } from "react";

import "./Modal.css";
import TaskContext from "../../context/TaskProvider";
import uuid from "react-uuid";
import { status } from "../../constants/statusConstant";
const Modal = () => {
  const { modalOpen, toggleModal, dispatchUserEvent } = useContext(TaskContext);
  const [time, setTime] = useState([
    5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  ]);
  const taskName = useRef();
  const startTime = useRef();
  const endTime = useRef();

  const handleSubmit = () => {
    let newItem = {
      id: uuid(),
      taskName: taskName.current.value,
      date: new Date(),
      startTime: startTime.current.value,
      endTime: endTime.current.value,
      status: status.Remaining,
    };

    dispatchUserEvent("ADD_TASK", newItem);
    toggleModal();
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
