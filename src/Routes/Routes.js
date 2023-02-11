import React from 'react'
import { Routes, Route, Router, Link } from 'react-router-dom'
import AuthForm from '../components/AuthForm/AuthForm'
import Main from '../pages/Main'
import Pomodoro from '../pages/Pomodoro'
import TaskList from '../pages/TaskList'


function RoutesPath() {
    return (

        <Routes>
            <Route path="/" element={<AuthForm type="login" />} />
            <Route path="/login" element={<AuthForm type="login" />} />
            <Route path="/register" element={<AuthForm type="register" />} />
            <Route element={<Main />}>
                <Route path="/todo">
                    <Route path="" element={<TaskList active="all" />} />
                    <Route path="completed" element={<TaskList active="completed" />} />
                    < Route path="remaining" element={<TaskList active="remaining" />} />
                </Route >
                <Route path="/timeboxing" element={<Pomodoro />} />
                <Route path="/pomodoro" element={<Pomodoro />} />
            </Route>
            <Route path="*" element={<>404 not found</>} />
        </Routes >

    )
}

export default RoutesPath