import { useState } from "react";
import Cookies from "universal-cookie";
var md5 = require('md5');

const Login = () => {
    const {RegisterURL,LoginURL,ActiveURL} = require('../BackendLinks');
    const {FetchReq, FetchData} = require('../Functions/Fetch');

    const cookies = new Cookies();
    const CookiesTimeExpire = {path: '/', maxAge: 1209600 };

    const [Action,SetAction] = useState(true);
    const [Nick,SetNick] = useState('');
    const [Email,SetEmail] = useState('');
    const [Password,SetPassword] = useState('');
    const [RePassword,SetRePassword] = useState('');
    const [InfoText,SetInfoText] = useState('');
    const [ShowPassword,SetShowPassword] = useState(false);



    function setShowFunction()
    {
        SetShowPassword(!ShowPassword);
    }

    function CheckIFLogin()
    {
        if(cookies.get("UserID") !== undefined && cookies.get("UserNick") !== undefined && cookies.get("UserPass") !== undefined) 
        {
            FetchReq(ActiveURL,{UserNick: cookies.get('UserNick'), UserPass: cookies.get('UserPass')}); 
            document.location.reload(true);
        }
    }

    function RunActionLogin(e)
    {  
        e.preventDefault();
        FetchData(LoginURL,{UserNick: Nick, UserPass: md5(Password)},(Resoult)=>
        {
            cookies.set('UserID', md5(Resoult[0].ID),CookiesTimeExpire);
            cookies.set('UserNick', md5(Nick),CookiesTimeExpire);
            cookies.set('UserPass', md5(Password),CookiesTimeExpire);
        })
        setTimeout(CheckIFLogin,1000);
    }

    function RunActionRegister(e)
    {
        e.preventDefault();
        if(Nick!=='' && Password!=='' && RePassword!=='' && Email!=='')
        {
            if(Password===RePassword) FetchData(RegisterURL,{UserNick: Nick, UserPass: md5(Password), Email: Email},(Resault)=>SetInfoText(Resault[0].err))
            else SetInfoText('Passwords are not same');
        }
        else SetInfoText('Fill All Forms');
    }

    return ( 
            <div className="Login">
                    <div className="LoginFormContainer">
                        {Action && 
                            <div>
                                <div className="LoginChoseAction">
                                    <div className="LoginActionSelect LoginActionSelectLogin"></div>
                                    <div type="button" onClick={ () => {SetAction(!Action);SetInfoText('')} } className="LoginActionBtn"><h1>Login</h1></div>
                                    <div type="button" onClick={ () => {SetAction(!Action);SetInfoText('')} } className="RegisterActionBtn"><h1>Register</h1></div>
                                </div>
                                
                                <form className="" onSubmit={(e) => RunActionLogin(e)}>
                                    <div className="">
                                        <input type="text" className="LoginInputForm" required value={Nick.charAt().toUpperCase()+Nick.substring(1)} onChange={(e)=> SetNick(e.target.value.toLowerCase())} placeholder="Nick" />
                                        {!ShowPassword &&<input type="password"  className="LoginInputForm"  required value={Password} onChange={(e)=> SetPassword(e.target.value)} placeholder="Password" />}
                                        {ShowPassword &&<input type="text" className="LoginInputForm" required value={Password} onChange={(e)=> SetPassword(e.target.value)} placeholder="Password" />}
                                        {!ShowPassword &&<button type="button" onClick={() => setShowFunction()} className="LoginEventBtn" >Show Password</button>}
                                        {ShowPassword &&<button type="button" onClick={() => setShowFunction()} className="LoginEventBtn">Hide Password</button>}
                                        <input type="submit" className="LoginEventBtn" value="Login" />
                                    </div>
                                </form>
                                
                            </div>
                        }
                        {!Action && 
                            <div>
                                <div className="LoginChoseAction">
                                    <div className="LoginActionSelect LoginActionSelectRegister"></div>
                                    <div onClick={ () => {SetAction(!Action);SetInfoText('')} } className="LoginActionBtn"><h1>Login</h1></div>
                                    <div onClick={ () => {SetAction(!Action);SetInfoText('')} } className="RegisterActionBtn"><h1>Register</h1></div>
                                </div>
                                <form className="" onSubmit={(e) => RunActionRegister(e)}>
                                    <div className="">
                                        <input type="text" className="LoginInputForm" required value={Nick.charAt().toUpperCase()+Nick.substring(1)} onChange={(e)=> SetNick(e.target.value.toLowerCase())} placeholder="Nick" />
                                        <input type="password" className="LoginInputForm" required value={Password} onChange={(e)=> SetPassword(e.target.value)} placeholder="Password" />
                                        <input type="password" className="LoginInputForm" required value={RePassword} onChange={(e)=> SetRePassword(e.target.value)} placeholder="RePassword" />
                                        <input type="email" className="LoginInputForm" required value={Email} onChange={(e)=> SetEmail(e.target.value.toLowerCase())} placeholder="Email" />
                                        <input type="submit" className="LoginEventBtn" value="Register" />
                                    </div> 
                                </form>
                            </div>
                        }
                    </div>
                <div className="">{InfoText}</div>
            </div>
     );
}
 
export default Login;