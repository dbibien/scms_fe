import './App.css'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import HomePage from './pages/Home'
import UsersPage from './pages/Users'
import ConcernsPage from './pages/Concerns'
import ReportPage from './pages/Reports'
import LoginPage from './pages/Login'
import { useApplicationStore } from './common/store'
import { Toaster } from './components/ui/toaster'

// const pb = new PocketBase(import.meta.env.VITE_BACKEND_URL)

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/concerns" element={<ConcernsPage />} />
        <Route path="/reports" element={<ReportPage />} />
      </Route>
    </Routes>)
}

export default App

const Layout = () => {
  // <div className='ml-1 mr-1'>
  return (
    <>
      <Nav />
      <div className="ml-1 mr-1 mt-4 p-2 md:max-w-[70%] md:m-auto">
        <Outlet />
      </div>
      <Toaster />
    </>
  )
}

const PrivateRoutes = () => {
  const pb = useApplicationStore(state => state.pb)

  const auth = pb.authStore.isValid
  return auth ? <Layout /> : <Navigate to="/login" />
}
