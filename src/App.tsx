import './App.css'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import HomePage from './pages/Home'
import UsersPage from './pages/Users'
import ConcernsPage from './pages/Concerns'
import ReportPage from './pages/Reports'
import LoginPage from './pages/Login'
import PocketBase from 'pocketbase'

const pb = new PocketBase(import.meta.env.VITE_BACKEND_URL)

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage pb={pb} />} />

      <Route element={<PrivateRoutes pb={pb} />}>
        <Route path="/" element={<HomePage pb={pb} />} />
        <Route path="/users" element={<UsersPage pb={pb} />} />
        <Route path="/concerns" element={<ConcernsPage pb={pb} />} />
        <Route path="/reports" element={<ReportPage pb={pb} />} />
      </Route>
    </Routes>)
}

export default App


const Layout = () => {
  return (
    <>
      <Nav pb={pb} />

      <div className='ml-1 mr-1'>
        <Outlet />
      </div>
    </>
  )
}

const PrivateRoutes = () => {
  console.log("authStore.isValid: ", pb.authStore.isValid);
  console.log("authStore.token: ", pb.authStore.token);

  const auth = pb.authStore.isValid
  return auth ? <Layout /> : <Navigate to="/login" />
}
