import { Link } from 'react-router-dom';
import './Layout.css';
import logo from '../assets/applogo.png';

function Layout() {
  return (
    <div className="navspace">
      <nav className="navbar">
        <div className="logo-div">
          <Link to="/"><img src={logo} alt="Library Logo" className="logo" /></Link>
        </div>

        <Link to="/">Home</Link> {}  
        <Link to="/books">Books</Link> {}  
        <Link to="/patrons">Patrons</Link> {}   
        <Link to="/loans">Loans</Link> {}    
        <Link to="/overdue">Overdue Loans</Link>
      </nav>
    </div>
  );
}

export default Layout;
