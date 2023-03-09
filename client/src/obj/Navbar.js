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
            <div className="NavBarItem">
                <Link to="/" className="Link">{ Name.charAt().toUpperCase()+Name.substring(1) }</Link>
            </div>
            <div className="NavBarItem">
                <div className="Link">Find Game</div>
            </div>
            <div className="NavBarItem">
                <Link to="/Local" className="Link">Local Game</Link>
            </div>
            <div className="NavBarItem">
                <Link to="/Bot" className="Link">Bot Game</Link>
            </div>
            <div className="NavBarItem">
                <div type="button" onClick={ () => LogOutFunction() } className="Link">LogOut</div>
            </div>
        </div>
     );
}
 
export default Navbar;