import React from 'react'
import { Routes, Route, Router, Link } from 'react-router-dom'
import Main from '../pages/Main'
import TaskList from '../pages/TaskList'


function RoutesPath() {
    return (

        <Routes>
            <Route path="/" element={<Main />}>
                <Route path="" element={<TaskList active="all" />} />
                <Route path="completed" element={<TaskList active="completed" />} />
                < Route path="remaining" element={<TaskList active="remaining" />} />
            </Route >
            <Route path="*" element={<>404 not found</>} />
        </Routes >

    )
}

export default RoutesPath