import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <nav className="bg-black flex items-center p-4 justify-between">
      <div>
        <h1 className="text-white">SCMS</h1>
      </div>

      <ul className="flex flex-row gap-4">
        <li className="text-white">
          <Link to="/home">Home</Link>
        </li>
        <li className="text-white">
          <Link to="/users">Users</Link>
        </li>
        <li className="text-white">
          <Link to="/concerns">Concerns</Link>
        </li>
        <li className="text-white">
          <Link to="/reports">Reports</Link>
        </li>
      </ul>

    </nav>
  )
}

export default Nav
