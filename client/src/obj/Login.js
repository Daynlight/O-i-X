import { useEffect,useRef, useState } from "react";
import Cookies from "universal-cookie";
var md5 = require('md5');

const Login = () => {

    const cookies = new Cookies();
    const timexpire = {path: '/', maxAge: 1209600 };

    

    const [Action,SetAction] = useState('login');
    const [Nick,SetNick] = useState('');
    const [Email,SetEmail] = useState('');
    const [Password,SetPassword] = useState('');
    const [Password1,SetPassword1] = useState('');
    const [Text,SetText] = useState('');
    const [ShowPassword,SetShowPassword] = useState(false);


    const [FirstLoginPassword,SetFirstLoginPassword] = useState(true);

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
        if(FirstLoginPassword) vis(NickRef,SetNickAnimation,'nickanimationmove'); else SetNickAnimation('nickanimationmove');
        if(FirstLoginPassword) vis(PasswordRef,SetPasswordAnimation,'passwordanimationmove'); else SetPasswordAnimation('passwordanimationmove');
        if(FirstLoginPassword) vis(SubmitRef,SetSubmitAnimaton,'loginanimationmove'); else SetSubmitAnimaton('loginanimationmove');
        if(FirstLoginPassword) vis(ShowPasswordRef,SetShowPasswordAnimation,'changeanimationmove'); else SetShowPasswordAnimation('changeanimationmove');
        if(FirstLoginPassword) vis(TerminalRef,SetTerminalAnimation,'terminalanimation'); else SetTerminalAnimation('terminalanimation');
        SetFirstLoginPassword(false);
    },[FirstLoginPassword,NickAnimation,PasswordAnimation,SubmitAnimaton,ShowPasswordAnimation,TerminalAnimation])

    function setShow(as)
    {
        SetShowPassword(as);
    }

    function RunActionLogin(e)
    {
        const url="http://localhost:8080/Login/"+md5(Nick)+"/"+md5(Password);
        fetch(url)
        .then((resp) => resp.json())
        .then((apidata) =>
        {
            console.log(apidata);
            cookies.set('UserID', md5(apidata[0].ID),timexpire);
            cookies.set('UserNick', md5(Nick),timexpire);
            cookies.set('UserPass', md5(Password),timexpire);
        })
    }
    
    function RunActionRegister(e)
    {
        e.preventDefault();
        if(Nick!=='' && Password!=='' && Password1!=='' && Email!=='')
        {
            if(Password===Password1)
            {
                const url="http://localhost:8080/Register/"+Nick+"/"+md5(Password)+"/"+Email;
                fetch(url)
                .then((resp) => resp.json())
                .then((apidata) =>
                {
                    SetText(apidata[0].err); 
                })
            }
            else
            {
                SetText('Passwords are not same');
            }
        }
        else
        {
            SetText('Fill All Forms');
        }

    }


    return ( 
        <body class="">
            
        
            <div>
                <div className="d-flex row col-12 pt-5 justify-content-center">
                    <div class="col-4"></div>
                    <div class="col-4  d-flex justify-content-center border-3">
                        
                        {Action==='login' && 
                        (  
                            
                            <div ref={TerminalRef} class={`colors teminal termianllogin col-12 ${TerminalAnimation}`} >
                                <div className="d-flex justify-content-center mt-3">
                                    <div class="btn btn-primary me-2"><h1>Login</h1></div>
                                    <div onClick={ () => SetAction('register') } class="btn ms-2 notsetloginaction"><h1>Register</h1></div>
                                </div>
                                    <div class="d-flex justify-content-center fs-2 text-warning ">{Text}</div>
                                <div class="d-flex justify-content-start">
                                    
                                    <form class="" onSubmit={(e) => RunActionLogin(e)}>
                                        <div class="mb-3">

                                            <input type="text" ref={NickRef} class={`form-control loginform loginanimation ${NickAnimation}`}  required value={Nick} onChange={(e)=> SetNick(e.target.value)} placeholder="Nick" />
                                          
                                            {!ShowPassword &&<input type="password" ref={PasswordRef} class={`form-control loginform loginanimation ${PasswordAnimation}`} required value={Password} onChange={(e)=> SetPassword(e.target.value)} placeholder="Password" />}
                                            {ShowPassword &&<input type="text" ref={PasswordRef} class={`form-control loginform loginanimation ${PasswordAnimation}`} required value={Password} onChange={(e)=> SetPassword(e.target.value)} placeholder="Password" />}
                                            {!ShowPassword &&<button type="button" ref={ShowPasswordRef} onClick={() => setShow(true)} class={`btn btn-dark col-12 loginanimation ${ShowPasswordAnimation}`} >Show Password</button>}
                                            {ShowPassword &&<button type="button" ref={ShowPasswordRef} onClick={() => setShow(false)} class={`btn btn-secondary col-12 loginanimation ${ShowPasswordAnimation}`}>Hide Password</button>}
                                            
                                          
                                          <input type="submit" ref={SubmitRef} class={`form-control loginform loginsubmit loginanimation ${SubmitAnimaton} `}value="Login" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            
                        )}

                        {Action==='register' &&
                        (  
                            
                            <div class="colors teminal terminalregister col-12">
                            <div className="d-flex justify-content-center mt-3">
                                <div onClick={ () => SetAction('login') } class="btn me-2 notsetloginaction"><h1>Login</h1></div>
                                <div  class="btn ms-2 btn-primary "><h1>Register</h1></div>
                            </div>
                                <div class="d-flex justify-content-center fs-2 text-warning">{Text}</div>
                            <div class="">
                                
                                <form class="" onSubmit={(e) => RunActionRegister(e)}>
                                    <div class="mb-3">
                                        <input type="text" class="form-control mt-1 loginform" required value={Nick} onChange={(e)=> SetNick(e.target.value)} placeholder="Nick" />
                                        <input type="password" class="form-control mt-1 loginform" required value={Password} onChange={(e)=> SetPassword(e.target.value)} placeholder="Password" />
                                        <input type="password" class="form-control mt-1 loginform" required value={Password1} onChange={(e)=> SetPassword1(e.target.value)} placeholder="RePassword" />
                                        <input type="email" class="form-control mt-1 loginform" required value={Email} onChange={(e)=> SetEmail(e.target.value)} placeholder="Email" />
                                        <input type="submit" class="form-control mt-1 loginform loginsubmit" value="Register" />
                                    </div> 
                                </form>
                            </div>
                        </div>
                        )}
                    </div>
                    
                    <div class="col-4"></div>
                    
                </div>
            </div>
        </body>
     );
}
 
export default Login;