import { useEffect,useRef, useState } from "react";
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

    const [FirstLogin,SetFirstLogin] = useState(true);
    const PasswordRef = useRef();
    const [PasswordAnimation,SetPasswordAnimation] = useState('');
    const ShowPasswordRef = useRef();
    const [ShowPasswordAnimation,SetShowPasswordAnimation] = useState('');
    const NickRef = useRef();
    const [NickAnimation,SetNickAnimation] = useState('');
    const SubmitRef = useRef();
    const [SubmitAnimaton,SetSubmitAnimaton] = useState('');
    const TerminalRef = useRef();
    const [TerminalAnimation,SetTerminalAnimation] = useState('');

    const vis = (ref,visa,option) =>
    {
        const observer = new IntersectionObserver((ent)  => 
        {
            const entry = ent[0];
            if(entry.isIntersecting===true)
            {
                visa(option);
            }
            else
            {
                visa('');
            }
        })
        observer.observe(ref.current);
    }

    useEffect(()=>
    {
        if(FirstLogin) vis(NickRef,SetNickAnimation,'NickAnimationMove'); else SetNickAnimation('NickAnimationMove');
        if(FirstLogin) vis(PasswordRef,SetPasswordAnimation,'PasswordAnimationMove'); else SetPasswordAnimation('PasswordAnimationMove');
        if(FirstLogin) vis(SubmitRef,SetSubmitAnimaton,'LoginSubmitAnimation'); else SetSubmitAnimaton('LoginSubmitAnimation');
        if(FirstLogin) vis(ShowPasswordRef,SetShowPasswordAnimation,'ChangeAnimationMove'); else SetShowPasswordAnimation('ChangeAnimationMove');
        if(FirstLogin) vis(TerminalRef,SetTerminalAnimation,'TerminalAnimation'); else SetTerminalAnimation('TerminalAnimation');
        SetFirstLogin(false);
    },[FirstLogin,NickAnimation,PasswordAnimation,SubmitAnimaton,ShowPasswordAnimation,TerminalAnimation])

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
            <div>
                <div className="d-flex row col-12 pt-5 justify-content-center">
                    <div class="col-4"></div>
                    <div class="col-4  d-flex justify-content-center border-3">
                        {Action && 
                            <div ref={TerminalRef} class={`colors Terminal Login col-12 ${TerminalAnimation}`} >
                                <div className="d-flex justify-content-center mt-3">
                                    <div onClick={ () => {SetAction(!Action);SetInfoText('')} } class="btn btn-primary me-2"><h1>Login</h1></div>
                                    <div onClick={ () => {SetAction(!Action);SetInfoText('')} } class="btn ms-2 NotSetLoginSelection"><h1>Register</h1></div>
                                </div>
                                <div class="d-flex justify-content-start">
                                    <form class="" onSubmit={(e) => RunActionLogin(e)}>
                                        <div class="mb-3">
                                            <input type="text" ref={NickRef} class={`form-control LoginForm LoginAnimation ${NickAnimation}`}  required value={Nick} onChange={(e)=> SetNick(e.target.value.toLowerCase())} placeholder="Nick" />
                                            {!ShowPassword &&<input type="password" ref={PasswordRef} class={`form-control LoginForm LoginAnimation ${PasswordAnimation}`} required value={Password} onChange={(e)=> SetPassword(e.target.value)} placeholder="Password" />}
                                            {ShowPassword &&<input type="text" ref={PasswordRef} class={`form-control LoginForm LoginAnimation ${PasswordAnimation}`} required value={Password} onChange={(e)=> SetPassword(e.target.value)} placeholder="Password" />}
                                            {!ShowPassword &&<button type="button" ref={ShowPasswordRef} onClick={() => setShowFunction()} class={`btn btn-dark col-12 LoginAnimation ${ShowPasswordAnimation}`} >Show Password</button>}
                                            {ShowPassword &&<button type="button" ref={ShowPasswordRef} onClick={() => setShowFunction()} class={`btn btn-secondary col-12 LoginAnimation ${ShowPasswordAnimation}`}>Hide Password</button>}
                                          <input type="submit" ref={SubmitRef} class={`form-control LoginForm LoginAnimation LoginSubmit ${SubmitAnimaton} `}value="Login" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        }
                        {!Action && 
                            <div class="colors Terminal Register col-12">
                            <div className="d-flex justify-content-center mt-3">
                                <div onClick={ () => {SetAction(!Action);SetInfoText('')} } class="btn me-2 NotSetLoginSelection"><h1>Login</h1></div>
                                <div onClick={ () => {SetAction(!Action);SetInfoText('')} } class="btn ms-2 btn-primary "><h1>Register</h1></div>
                            </div>
                            <form class="" onSubmit={(e) => RunActionRegister(e)}>
                                <div class="mb-3">
                                    <input type="text" class="form-control mt-1 LoginForm" required value={Nick} onChange={(e)=> SetNick(e.target.value.toLowerCase())} placeholder="Nick" />
                                    <input type="password" class="form-control mt-1 LoginForm" required value={Password} onChange={(e)=> SetPassword(e.target.value)} placeholder="Password" />
                                    <input type="password" class="form-control mt-1 LoginForm" required value={RePassword} onChange={(e)=> SetRePassword(e.target.value)} placeholder="RePassword" />
                                    <input type="email" class="form-control mt-1 LoginForm" required value={Email} onChange={(e)=> SetEmail(e.target.value.toLowerCase())} placeholder="Email" />
                                    <input type="submit" class="form-control mt-1 LoginForm LoginSubmit" value="Register" />
                                </div> 
                            </form>
                        </div>
                        }
                    </div>
                    <div class="col-4"></div>
                </div>
                <div class="d-flex justify-content-center fs-2 text-danger">{InfoText}</div>
            </div>
     );
}
 
export default Login;