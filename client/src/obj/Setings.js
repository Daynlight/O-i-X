import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FetchData,FetchReq } from "../Functions/Fetch";


import Cookies from 'universal-cookie';

const Setings = () => {
    var md5 = require('md5');

    const history = useHistory();
    const cookies = new Cookies();
    const { UpdateNick,LogoutURL,UpdatePass,UpdateEmail } = require('../BackendLinks');
    
    const [Nick,SetNick] = useState('');
    const [Email,SetEmail] = useState('');
    const [Password,SetPassword] = useState('');
    const [RePassword,SetRePassword] = useState('');
    const [InfoText,SetInfoText] = useState('');


    function LogOutFunction()
    {
        cookies.remove('UserID');
        cookies.remove('UserPass');
        cookies.remove('UserNick');
        history.push('/');
        window.location.reload(true);
    }

    function UpdatePasswordFunction()
    {
        FetchReq(LogoutURL,{UserNick: cookies.get('UserNick'), UserPass: cookies.get('UserPass')});
        if(Password===RePassword && Password!=='' && Password!==undefined)
        {
            FetchData(UpdatePass,{UserNick: cookies.get('UserNick'), UserPass: cookies.get('UserPass'),NewPass: md5(Password)},(Resault)=>
            {
                if(Resault[0].status==="Changed")
                {
                    LogOutFunction();
                }
            });
        }
        else SetInfoText("Passwords are not same");
    }

    
    function UpdateNickFunction()
    {
        if(Nick!=='' && Nick!==undefined)
        {
            FetchReq(LogoutURL,{UserNick: cookies.get('UserNick'), UserPass: cookies.get('UserPass')});
            FetchData(UpdateNick,{UserNick: cookies.get('UserNick'), UserPass: cookies.get('UserPass'),NewNick: Nick.toLowerCase()},(Resault)=>
            {
                SetInfoText(Resault[0].status);
                if(Resault[0].status==="Changed")
                {
                    
                    LogOutFunction();
                }
            });
        } else SetInfoText("Set New Nick");
    }

    function UpdateEmailFunction(e)
    {  
        e.preventDefault();
        FetchData(UpdateEmail,{UserNick: cookies.get('UserNick'), UserPass: cookies.get('UserPass'),NewEmail: Email},(Resault)=>
        {
            SetInfoText(Resault[0].status);
        });
    }


    return ( 
        <div className="SetingsScreen">
            <div className="SetingsContainer">
                <svg color="#4cd53a" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
                <br></br>
                <input type="text" className="LoginInputForm" required value={Nick.charAt().toUpperCase()+Nick.substring(1)} onChange={(e)=> SetNick(e.target.value.toLowerCase())} placeholder="Nick" />
                <input type="submit" onClick={() => UpdateNickFunction() } className="LoginEventBtn TextGradiant" value="Update" />
                <br></br>
                <svg color="#4cd53a" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
                    <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/>
                    <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
                <br></br>
                <input type="password" className="LoginInputForm" required value={Password} onChange={(e)=> SetPassword(e.target.value)} placeholder="Password" />
                <br></br>
                <svg color="#4cd53a" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
                    <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/>
                    <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
                <br></br>
                <input type="password" className="LoginInputForm" required value={RePassword} onChange={(e)=> SetRePassword(e.target.value)} placeholder="RePassword" />
                <input type="submit" onClick={() => UpdatePasswordFunction() } className="LoginEventBtn TextGradiant" value="Update" />
                <br></br>
                <svg color="#4cd53a" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                </svg>
                <br></br>
                <form onSubmit={(e) => UpdateEmailFunction(e) }>
                    <input type="email" className="LoginInputForm" required value={Email} onChange={(e)=> SetEmail(e.target.value.toLowerCase())} placeholder="Email" />
                    <input type="submit" className="LoginEventBtn TextGradiant" value="Update" />
                </form>
                <div className="TextGradiant infotext">{InfoText}</div>
            </div> 
        </div>
     );
}
 
export default Setings;