import React, { useContext, lazy, Suspense } from "react";
import TaskContext from "../context/TaskProvider";
import empty from "../assets/empty.svg";
const Task = lazy(() => import("../components/Task/Task"));

const renderLoader = () => <p>Loading....</p>;
const TaskList = ({ active }) => {
  const { task, toggleModal } = useContext(TaskContext);

  return (
    <Suspense fallback={renderLoader()}>
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
