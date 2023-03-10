import AddFriend from "./AddFriend";
import { Link } from "react-router-dom";
import FriendList from "./FriendList";
const User = ({Name,Stars,Friends,ActualTime}) => {
    return ( 
    <div className="MainContainer">
        <div className="MainScreen">
            <div className="MainUserInfo MainGradiantBorder TextGradiant">
                <div className="">
                    <div>
                        <h1>{ Name.charAt().toUpperCase()+Name.substring(1) }</h1>
                    </div>
                </div>
                <div className="">
                    <h2>
                        {Stars}
                        <svg fill="#ffe600" height="30" className="" width="30" version="1.1" xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 489.4 489.4" >
                        <g>
                            <path d="M369.75,0h-250.2v44.3h-85.6V110c0,47.2,38.4,85.6,85.6,85.6h1.5c7.9,51.3,47,92.2,97.2,103v70.9h-30.7
                                c-9.5,0-17.1,7.7-17.1,17.1v22.5h-26.2v80.3h200.9v-80.3h-26.2v-22.5c0-9.5-7.7-17.1-17.1-17.1h-30.7v-70.9
                                c50.3-10.8,89.3-51.8,97.2-103h1.5c47.2,0,85.6-38.4,85.6-85.6V44.3h-85.6V0H369.75z M119.55,152.3c-23.3,0-42.3-19-42.3-42.3V87.6
                                h42.3V152.3z M301.45,121.7l-25.7,21.7l8,32.7c1.5,6.1-5.2,11-10.6,7.7l-28.5-17.8l-28.6,17.7c-5.4,3.3-12.1-1.5-10.6-7.7l8-32.7
                                l-25.6-21.6c-4.8-4.1-2.3-12,4-12.4l33.5-2.4l12.8-31.2c2.4-5.9,10.7-5.9,13.1,0l12.7,31.1l33.5,2.4
                                C303.75,109.7,306.25,117.6,301.45,121.7z M411.95,87.6V110c0,23.3-18.9,42.3-42.2,42.3V87.6H411.95z"/>
                        </g>
                        </svg>
                    </h2>
                </div>
                <div>
                    <Link className="TextGradiant LoginEventBtn" to="/Setings">Setings</Link>
                </div>

            </div>
            <div className="MainUserFriend MainGradiantBorder">
                <div className="TextGradiant">
                    <h2>Friends</h2>
                </div>
                
                <div className="">
                    <div className="FriendList">
                        <ul className="FriendListContainer">
                            {Friends.map(e =>
                                (
                                    (ActualTime-e.active<=(5*60)) && <li className="Active" key={e.ID}><FriendList Event={e}></FriendList></li>
                                ))}
                                {Friends.map(e =>
                                (
                                    (ActualTime-e.active>(5*60)) && (ActualTime-e.active<=(10*60)) && <li className="Sleep" key={e.ID}><FriendList Event={e}></FriendList></li>
                                ))}
                                {Friends.map(e =>
                                (  
                                    (ActualTime-e.active>(10*60)) && <li className="UnActive" key={e.ID}><FriendList Event={e}></FriendList></li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <AddFriend></AddFriend>
            </div>
        </div>
    </div>
    );
}
 
export default User;