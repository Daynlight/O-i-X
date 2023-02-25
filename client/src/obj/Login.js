import { useEffect, useState } from "react";
import Typical from 'react-typical'
import Cookies from "universal-cookie";
var md5 = require('md5');


const Login = () => {

    const cookies = new Cookies();
    var [Action,SetAction] = useState('login');
    var [Nick,SetNick] = useState('');
    var [Email,SetEmail] = useState('');
    var [Password,SetPassword] = useState('');
    var [Passsword1,SetPasssword1] = useState('');
    var [Text,SetText] = useState('Your Nick: \n')
    var [Z,SetZ] = useState('')
    var [etap,SetEtap] = useState(0);
    var Error = '';
    
   
    const timexpire = {path: '/', maxAge: 1209600 };

    

    function ChangeAction(action)
    {
        if(action==='login')SetText('Your Nick: ');
        if(action==='register')SetText('Give Us Your UserName: ');
        SetEtap(0);
        SetAction(action);
        Error = '';
    }
    
    function RunActionLogin()
    {
        const url="http://localhost:8080/Login/"+md5(Nick)+"/"+md5(Password);
        fetch(url)
        .then((resp) => resp.json())
        .then((apidata) =>
        {

            cookies.set('UserID', md5(apidata[0].id),timexpire)
            cookies.set('UserNick', md5(Nick),timexpire)
            cookies.set('UserPass', md5(Password),timexpire)
            window.location.reload(true);
            
            
        })
        if( typeof cookies.get('UserID')==='undefined')
        {
            Error = 'Password or Username is wrong!';
            SetEtap(0);
            SetText(Error + ' ' + 'Your Nick: ')
            Error = '';
        }
        
    }
    
    function UpdateLogin(e,etap)
    {
        e.preventDefault();
        
       
        if(etap.etap==0)
        {
            SetNick(Z);
            SetText(Text+Z+' Your Password: ');
            SetZ('');
            SetEtap(1);
        }

        if(etap.etap==1)
        {
            SetPassword(Z);
            Z='******** \nPress Enter';
            SetText(Text + Z);
            SetZ('');
            SetEtap(2);
            
        } 
        if(etap.etap==2)RunActionLogin();

    }
    function UpdateRgister(e,etap)
    {
        e.preventDefault();
        
       
        if(etap.etap==0)
        {
            SetNick(Z);
            SetText(Text+Z+' Your Email: ');
            SetZ('');
            SetEtap(1);
        }

        if(etap.etap==1)
        {
            SetEmail(Z);
            SetText(Text + Z +' Password: ');
            SetZ('');
            SetEtap(2);
        }
        if(etap.etap==2)
        {
            SetPassword(Z);
            SetText(Text + Z +' RePassword: ');
            SetZ('');
            SetEtap(3);
        }
        if(etap.etap==3)
        {
            SetPasssword1(Z);
            SetText(Text + Z);
            SetZ('');
            SetEtap(4);
        }

        console.log(etap);
        
        

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
                                    <div onClick={ () => ChangeAction('register') } class="btn ms-2 notsetloginaction"><h1>Register</h1></div>
                                </div>

                                <div class="">
                                    <div class="col-6 term">
                                        <h3>
                                            <Typical
                                                wrapper="n"
                                                loop={1}
                                                steps={[Text + Z]}
                                            />
                                        </h3>
                                    </div>
                                    <form class="tt" onSubmit={(e) => UpdateLogin(e,{etap})}>
                                        <input type="text" class="col-12" value={Z} autoFocus onChange={(e) => {SetZ(e.target.value)}} />
                                    </form>

                                </div>

                            </div>
                            
                        )}



                        {Action==='register' &&
                        (  
                            
                            <div class="colors teminal px-5 pt-5">
                            <div className="d-flex justify-content-center mb-5">
                                <div onClick={ () => ChangeAction('login') } class="btn me-2 notsetloginaction"><h1>Login</h1></div>
                                <div  class="btn ms-2 btn-primary "><h1>Register</h1></div>
                            </div>

                            <div class="">
                                <div class="col-6 term">
                                    <h3>
                                        <Typical
                                            wrapper="p"
                                            loop={1}
                                            steps={[Text + Z]}
                                        />
                                    </h3>
                                </div>
                                <form class="tt" onSubmit={(e) => UpdateRgister(e,{etap})}>
                                    <input type="text" class="col-12" value={Z} autoFocus onChange={(e) => {SetZ(e.target.value)}} />
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