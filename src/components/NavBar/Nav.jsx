import React, { useContext } from "react";
import { NavLink } from "react-router-dom/dist";
import TaskContext from "../../context/TaskProvider";
import "./Nav.css";
const Nav = ({ role }) => {
  const { task, modalOpen, toggleModal } = useContext(TaskContext);
  return (
    <section className="navWrapper">
      <div className="navTop">
        <span>Timeboxing</span>
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
