import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route path="/home" element={<Home />}/>
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
      <Outlet />
    </>
  )
}
