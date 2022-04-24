import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import VerifyInvite from './views/verify-invite'
import CreateAccount from './views/create-account'
import Login from './views/login'
import Home from './views/home'
import ViewClass from './views/view-class'
import ViewAttendance from './views/view-attendance'
import PrivateRoute from './components/private-route'
import PageNotFound from './views/page-not-found'
import ListClasses from './views/list-classes'

function App() {
    const path = {
        verifyInvite: '/invite/:token',
        createAccount: '/create-account',
        login: '/login',
        dashboard: '/dashboard',
        viewClass: '/dashboard/classes/view/:slug',
        attendance: '/dashboard/attendance',
        scheduledClasses: '/dashboard/scheduled-classes',
        progressClasses: '/dashboard/in-progress-classes',
        completedClasses: '/dashboard/completed-classes',
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
                <Route element={<PrivateRoute />}>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/dashboard" element={<Home />} />
                    <Route
                        exact
                        path={path.viewClass}
                        element={<ViewClass />}
                    />
                    <Route
                        exact
                        path={path.attendance}
                        element={<ViewAttendance />}
                    />
                    <Route
                        exact
                        path={path.scheduledClasses}
                        element={<ListClasses status={'scheduled'} />}
                    />
                    <Route
                        exact
                        path={path.progressClasses}
                        element={<ListClasses status={'in-progress'} />}
                    />
                    <Route
                        exact
                        path={path.completedClasses}
                        element={<ListClasses status={'completed'} />}
                    />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
