import './App.css'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import HomePage from './pages/Home'
import UsersPage from './pages/Users'
import ConcernsPage from './pages/Concerns'
import ReportPage from './pages/Reports'
import LoginPage from './pages/Login'
import { useApplicatonStore } from './common/store'

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
  return (
    <>
      <Nav />

      <div className='ml-1 mr-1'>
        <Outlet />
      </div>
    </>
  )
}

const PrivateRoutes = () => {
  const pb = useApplicatonStore(state => state.pb)

  console.log("authStore.isValid: ", pb.authStore.isValid);
  console.log("authStore.token: ", pb.authStore.token);

  const auth = pb.authStore.isValid
  return auth ? <Layout /> : <Navigate to="/login" />
}
