import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import VerifyInvite from './views/verify-invite'
import CreateAccount from './views/create-account'
import Login from './views/login'
import Dashboard from './layout/dashboard'
import Home from './views/home'
import ViewClass from './views/view-class'
import Attendance from './views/attendance'

function App() {
    const path = {
        verifyInvite: '/invite/:token',
        createAccount: '/create-account',
        login: '/login',
        dashboard: '/dashboard/:id',
        viewClass: '/dashboard/classes/view/:slug',
        attendance: '/dashboard/attendance/:id',
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path={path.verifyInvite}
                    element={<VerifyInvite />}
                />
                <Route
                    exact
                    path={path.createAccount}
                    element={<CreateAccount />}
                />
                <Route exact path={path.login} element={<Login />} />
                <Route element={<Dashboard />}>
                    <Route exact path={path.dashboard} element={<Home />} />
                    <Route
                        exact
                        path={path.viewClass}
                        element={<ViewClass />}
                    />
                    <Route
                        exact
                        path={path.attendance}
                        element={<Attendance />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
