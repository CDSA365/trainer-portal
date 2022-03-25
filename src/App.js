import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import VerifyInvite from './views/verify-invite'
import CreateAccount from './views/create-account'
import Login from './views/login'
import Dashboard from './layout/dashboard'

function App() {
    const path = {
        verifyInvite: '/invite/:token',
        createAccount: '/create-account',
        login: '/login',
        dashboard: '/dashboard/:id',
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
                <Route exact path={path.dashboard} element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
