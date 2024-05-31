import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import HomePage from './pages/Home'
import UsersPage from './pages/Users'
import ConcernsPage from './pages/Concerns'
import ReportPage from './pages/Reports'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/concerns" element={<ConcernsPage />} />
        <Route path="/reports" element={<ReportPage />} />
        {/* Using path="*"" means "match anything", so this route
          acts like a catch-all for URLs that we don't have explicit
          routes for. 
        */}
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
