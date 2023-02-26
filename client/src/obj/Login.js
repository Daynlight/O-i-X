import { useState } from "react";
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
    

    function RunActionLogin(e)
    {
        e.preventDefault();
        const url="http://localhost:8080/Login/"+md5(Nick)+"/"+md5(Password);
        fetch(url)
        .then((resp) => resp.json())
        .then((apidata) =>
        {
            cookies.set('UserID', md5(apidata[0].id),timexpire)
            cookies.set('UserNick', md5(Nick),timexpire)
            cookies.set('UserPass', md5(Password),timexpire)
        })
        if( typeof cookies.get('UserID')==='undefined')
        {
            SetText('User Do not Exist');
        }
        if(typeof cookies.get('UserID')!=='undefined')
        {
            window.location.reload(true);
        } 
    }

    function RunActionRegister(e)
    {
        e.preventDefault();
        if(Nick!='' && Password!='' && Password1!='' && Email!='')
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
        <body class="loginBack">
            
        
            <div>
                <div className="d-flex row col-12 pt-5 justify-content-center">
                    <div class="col-3"></div>
                    <div class="col-6  d-flex justify-content-center border-3">
                        
                        {Action==='login' &&
                        (  
                            
                            <div class=" colors teminal px-5 pt-5">
                                <div className="d-flex justify-content-center mb-5">
                                    <div class="btn btn-primary me-2"><h1>Login</h1></div>
                                    <div onClick={ () => SetAction('register') } class="btn ms-2 notsetloginaction"><h1>Register</h1></div>
                                </div>
                                    <div class="d-flex justify-content-center fs-2 text-warning ">{Text}</div>
                                <div class="">
                                    
                                    <form class="" onSubmit={(e) => RunActionLogin(e)}>
                                        <div class="mb-3">
                                          <input type="text" class="form-control mt-1 loginform" required value={Nick} onChange={(e)=> SetNick(e.target.value)} placeholder="Nick" />
                                          <input type="password" class="form-control mt-1 loginform" required value={Password} onChange={(e)=> SetPassword(e.target.value)} placeholder="Password" />
                                          <input type="submit" class="form-control mt-1 loginform loginsubmit" required value="Login" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            
                        )}

                        {Action==='register' &&
                        (  
                            
                            <div class="colors teminal px-5 pt-5">
                            <div className="d-flex justify-content-center mb-5">
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
                    
                    <div class="col-3"></div>
                    
                </div>
            </div>
        </body>
     );
}
 
export default Login;