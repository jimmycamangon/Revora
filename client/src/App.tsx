import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout    from './layouts/AppLayout'
import LandingPage  from './pages/LandingPage'
import LoginPage    from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import Dashboard    from './pages/Dashboard'
// import Garage       from './pages/Garage'
// import Maintenance  from './pages/Maintenance'
// import FuelLogs     from './pages/FuelLogs'
// import Reminders    from './pages/Reminders'
// import Analytics    from './pages/Analytics'
// import Settings     from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"         element={<LandingPage />} />
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Authenticated */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard"   element={<Dashboard />} />
          {/* <Route path="/garage"      element={<Garage />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/fuel"        element={<FuelLogs />} />
          <Route path="/reminders"   element={<Reminders />} />
          <Route path="/analytics"   element={<Analytics />} />
          <Route path="/settings"    element={<Settings />} /> */}
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}