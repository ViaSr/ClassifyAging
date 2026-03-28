import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">
          Classify<span>Aging</span>
        </Link>
        <ul className="nav-links">
          <li><a href="/#data">The Data</a></li>
          <li><a href="/#hallmarks">Hallmarks</a></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/glossary">Glossary</Link></li>
        </ul>
      </div>
    </nav>
  )
}