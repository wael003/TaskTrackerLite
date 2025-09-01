
import { Link } from "react-router-dom";


const Navbar = () => {

   
    return (
        <nav className="navbar bg-navbar">
            <h1>
                <Link className="logo-navbar" to="/">TaskTracker</Link>
            </h1>
          
        </nav>
    )
}


export default Navbar