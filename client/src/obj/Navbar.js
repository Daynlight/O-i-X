import { Link, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const Navbar = ({Name}) => {
    const cookies = new Cookies();
    const history = useHistory();
    const {LogoutURL} = require('../BackendLinks');
    const {FetchReq} = require('../Functions/Fetch');

    function LogOutFunction()
    {
        FetchReq(LogoutURL,{UserNick: cookies.get('UserNick'), UserPass: cookies.get('UserPass')});
        cookies.remove('UserID');
        cookies.remove('UserPass');
        cookies.remove('UserNick');
        history.push('/');
        window.location.reload(true);
    }
    
    return ( 
        <div>
            <ul class="nav bg-dark fixed-top justify-content-center fs-3">
                <li class="nav-item ">
                    <Link to="/" class="nav-link active " aria-current="page">Hello { Name.charAt().toUpperCase()+Name.substring(1) }</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link">Find Game</Link>
                </li>
                <li class="nav-item">
                    <Link to="/Local" class="nav-link">Local Game</Link>
                </li>
                <li class="nav-item">
                    <Link to="/Bot" class="nav-link">Bot Game</Link>
                </li>
                <li class="nav-item">
                    <div type="button" onClick={ () => LogOutFunction() } class="nav-link">LogOut</div>
                </li>
            </ul>
            <div class="py-5"></div>
        </div>
     );
}
 
export default Navbar;