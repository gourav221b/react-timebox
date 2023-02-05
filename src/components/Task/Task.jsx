import { Table } from "antd";
import React, { useContext, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { FaRedoAlt } from "react-icons/fa";
import moment from "moment/moment";
import "./Task.css";
import TaskContext from "../../context/TaskProvider";
import { status } from "../../constants/statusConstant";
const Task = ({ task }) => {
  const { dispatchUserEvent } = useContext(TaskContext);

  const [PageSize, setPageSize] = useState(8);
  const [paginateStatus, setPaginateStatus] = useState({
    current: 1,
    pageSize: PageSize,
  });
  const [TaskName, setTaskName] = useState("");

  const handleTaskNameChange = (e, record) => {
    setTaskName(e.target.value);
    dispatchUserEvent("RENAME_TASK", { id: record.id, taskName: TaskName });
  };

  const updateTaskHandler = (record, status) => {
    dispatchUserEvent("UPDATE_TASK", { id: record.id, status: status });
  };

  const deleteTaskHandler = (record) => {
    dispatchUserEvent("REMOVE_TASK", record.id);
  };

  const columns = [
    {
      title: "Task Name",
      dataIndex: "taskName",
      key: "taskName",
      width: "25%",
      render: (text, record) => (
        <input
          type="text"
          className="taskNameInput"
          placeholder={text}
          defaultValue={record.taskName}
          onKeyUp={(e) => {
            handleTaskNameChange(e, record);
          }}
        />
      ),
    },
    {
      title: "Starts At",
      dataIndex: "startTime",
      key: "startTime",
      width: "20%",
      render: (text, record) => (
        <span>
          {moment(record.date).format("L") == moment().format("L")
            ? text
            : moment(record.date).format("l")}
        </span>
      ),
    },
    {
      title: "Ends At",
      dataIndex: "endTime",
      key: "endTime",
      width: "20%",
      render: (text, record) => (
        <span>
          {moment(record.date).format("L") == moment().format("L")
            ? text
            : moment(record.date).format("l")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (text, record) => (
        <span className={`tablePill statusPill ${text} `}>{text}</span>
      ),
    },
    {
      title: "Action",

      render: (text, record) => (
        <div className="actionButtonWrapper">
          <div
            className="actionBtn checkButton"
            onClick={() =>
              record.status === "completed"
                ? updateTaskHandler(record, status.Remaining)
                : updateTaskHandler(record, status.Completed)
            }
          >
            {record.status === "completed" ? <FaRedoAlt /> : <BsCheckLg />}
          </div>
          <div
            className="actionBtn deleteButton"
            onClick={() => deleteTaskHandler(record)}
          >
            <FiTrash2 />
          </div>
        </div>
      ),
    },
  ];
  return (
    <section className="taskWrapper">
      <Table
        columns={columns}
        dataSource={task}
        scroll={{
          x: "auto",
        }}
        pagination={{
          defaultCurrent: paginateStatus.current,
          pageSize: PageSize,
        }}
        onChange={(pagination, e) => {
          setPaginateStatus(pagination);
          setPageSize(pagination?.pageSize);
        }}
        sticky
        rowClassName={(record) =>
          record.status == "completed" &&
          window.location.pathname != "/completed"
            ? "completed-row tableRow"
            : "tableRow"
        }
        // onRow={(record, rowIndex) => {
        //   return {
        //     onMouseEnter: () => {
        //       setRowIndex(rowIndex);
        //     },
        //   };
        // }}
      />
    </section>
  );
};

export default Task;
