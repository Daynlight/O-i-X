import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const NavBar = ({Name}) => {
    const cookies = new Cookies()


    function LogOut()
    {
        cookies.remove('UserID');
        cookies.remove('UserPass');
        cookies.remove('UserNick');
        window.location.reload(true);
    }


    return ( 
        <div>
            
            <ul class="nav bg-dark fixed-top justify-content-center fs-3">
                <li class="nav-item ">
                    <Link to="/User" class="nav-link active " aria-current="page">Hello { Name }</Link>
                </li>
                <li class="nav-item">
                    <a class="nav-link">Find Game</a>
                </li>
                <li class="nav-item">
                    <Link to="/Local" class="nav-link">Local Game</Link>
                </li>
                <li class="nav-item">
                    <Link to="/Bot" class="nav-link">Bot Game</Link>
                </li>
                <li class="nav-item">
                    <a onClick={ () => LogOut() } class="nav-link">LogOut</a>
                </li>
            </ul>
            <div class="py-5"></div>


            
        </div>
     );
}
 
export default NavBar;