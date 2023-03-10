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
        <div className="NavBar">
            <Link to="/" className="NavBarItem Link">
                <div className="Link">{ Name.charAt().toUpperCase()+Name.substring(1) }</div>
            </Link>
            <Link  className="NavBarItem Link">
                <div className="Link">Find Game</div>
            </Link>
            <Link to="/Local" className="NavBarItem Link">
                <div className="Link">Local Game</div>
            </Link>
            <Link to="/Bot" className="NavBarItem Link">
                <div className="Link">Bot Game</div>
            </Link>
            <div onClick={ () => LogOutFunction() } className="NavBarItem Link">
                <div type="button" className="Link">LogOut</div>
            </div>
        </div>
     );
}
 
export default Navbar;