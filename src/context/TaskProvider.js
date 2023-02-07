import { createContext, useState, useEffect } from "react";
import { toast, cssTransition } from "react-toastify";
import { status } from "../constants/statusConstant";
import { toastConstants } from "../constants/toastConstant";
const TaskContext = createContext({});

export const TaskProvider = ({ children }) => {
    const [task, setTask] = useState(() => {

        const savedTasks = localStorage.getItem("taskList");
        if (savedTasks)
            return JSON.parse(savedTasks);
        return [];

    });
    const [modalOpen, setModalOpen] = useState(false);
    const [notification, setNotification] = useState(() => {
        const savedNotification = localStorage.getItem("notification");
        if (savedNotification)
            return JSON.parse(savedNotification);
        return false;

    });

    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(task));
    }, [task]);

    useEffect(() => {
        localStorage.setItem('notification', JSON.stringify(notification));
    }, [notification]);

    const dispatchUserEvent = (actionType, payload) => {
        switch (actionType) {
            case 'ADD_TASK':
                task == undefined ? setTask(payload) :
                    setTask([...task, payload])

                return;
            case 'REMOVE_TASK':
                setTask(task.filter(task => task.id !== payload));

                return;
            case 'UPDATE_TASK':
                console.log(payload)
                const item = task.find(
                    task => task.id === payload.id,
                );
                if (item) {

                    let newList = task.map(item => item.id === payload.id ? { ...item, status: payload.status } : item)
                    setTask(newList)

                    return;
                }
                return;

            case 'RENAME_TASK':
                const item1 = task.find(
                    task => task.id === payload.id,
                );
                if (item1) {

                    let newList = task.map(item => item.id === payload.id ? { ...item, taskName: payload.taskName } : item)
                    setTask(newList)

                    return;
                }
                return;
            default:
                return;
        }
    };
    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }
    const toggleNotifications = () => {
        setNotification(!notification)
    }

    const toastMessage = (type, message) => {
        switch (type) {
            case toastConstants.SUCCESS: toast.success(message); return;
            case toastConstants.FAIL: toast.error(message); return;
            default: toast(message); return;
        }
    }
    return (
        <TaskContext.Provider value={{
            task,
            modalOpen,
            toggleModal,
            dispatchUserEvent,
            toastMessage,
            notification,
            toggleNotifications
        }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContext;