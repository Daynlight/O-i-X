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
            <ul className="">
                <li className="">
                    <Link to="/" className="">Hello { Name.charAt().toUpperCase()+Name.substring(1) }</Link>
                </li>
                <li className="">
                    <div className="">Find Game</div>
                </li>
                <li className="">
                    <Link to="/Local" className="">Local Game</Link>
                </li>
                <li className="">
                    <Link to="/Bot" className="">Bot Game</Link>
                </li>
                <li className="">
                    <div type="button" onClick={ () => LogOutFunction() } className="">LogOut</div>
                </li>
            </ul>
            <div className=""></div>
        </div>
     );
}
 
export default Navbar;