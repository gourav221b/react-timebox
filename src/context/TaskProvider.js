import { createContext, useState, useEffect } from "react";
import { status } from "../constants/statusConstant";
const TaskContext = createContext({});

export const TaskProvider = ({ children }) => {
    const [task, setTask] = useState(() => {
        // get the todos from localstorage
        const savedTasks = localStorage.getItem("taskList");
        // if there are Tasks stored
        if (savedTasks) {
            // return the parsed JSON object back to a javascript object
            return JSON.parse(savedTasks);
            // otherwise
        } else {
            // return an empty array
            return [];
        }
    });
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(task));
        console.log(task)
    }, [task]);

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
    return (
        <TaskContext.Provider value={{ task, modalOpen, toggleModal, dispatchUserEvent }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContext;