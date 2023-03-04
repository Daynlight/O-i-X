import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const SmallNavbar = ({Name}) => {
    const cookies = new Cookies();
    const history = useHistory();
    const {LogoutURL} = require('../BackendLinks');
    const {FetchReq} = require('../Functions/Fetch');
    const [MenuDown,SetMenuDown] = useState(false);

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
            {!MenuDown &&
                <ul className="nav bg-dark fixed-top justify-content-center fs-3">
                    <li className="nav-item ">
                        <div onClick={() => SetMenuDown(true)} className="nav-link active">Hello { Name.charAt().toUpperCase()+Name.substring(1) }</div>
                    </li>
                </ul>
             }   
                
            {MenuDown && 
            <div>
                <ul className="nav bg-dark fixed-top justify-content-center fs-3">  
                    <li className="nav-item">
                        <div type="button" onClick={() => SetMenuDown(false)} className="nav-link active">Hide</div>
                    </li>
                    <li className="nav-item ">
                        <Link to="/" type="button" className="nav-link active">Hello { Name.charAt().toUpperCase()+Name.substring(1) }</Link>
                    </li>
                    <li className="nav-item">
                        <div type="button" className="nav-link">Find Game</div>
                    </li>
                    <li className="nav-item">
                        <Link type="button" to="/Local" className="nav-link">Local Game</Link>
                    </li>
                    <li className="nav-item">
                        <Link type="button" to="/Bot" className="nav-link">Bot Game</Link>
                    </li>
                    <li className="nav-item">
                        <div  type="button" onClick={ () => LogOutFunction() } className="nav-link">LogOut</div>
                    </li>
                </ul> 
                <div className="py-5"></div>
            </div>
            }
           

            <div className="py-5"></div>
        </div>
     );
}
 
export default SmallNavbar;