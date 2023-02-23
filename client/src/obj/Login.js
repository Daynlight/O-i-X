import { useEffect, useState } from "react";
import Typical from 'react-typical'

const Login = () => {
    var [Action,SetAction] = useState('login');
    var [Nick,SetNick] = useState('');
    var [Email,SetEmail] = useState('');
    var [Password,SetPassword] = useState('');
    var [Passsword1,SetPasssword1] = useState('');
    var [Text,SetText] = useState('Your Nick: ')
    var [Z,SetZ] = useState('')
    var [etap,SetEtap] = useState(0);
    

    function ChangeAction(action)
    {
        if(action==='login')SetText('Your Nick: ');
        if(action==='register')SetText('Give Us Your UserName: ');
        SetEtap(0);
        SetAction(action);
    }
    
    function RunActionLogin()
    {
        

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
            Z='********';
            SetText(Text + Z);
            SetZ('');
            SetEtap(2);
        }
        if(etap.etap==2)RunActionLogin();

        console.log(etap);
        
        

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
        <div>
            <div className="d-flex row col-12 pt-5 justify-content-center">
                <div class="col-3"></div>
                <div class="col-6  d-flex justify-content-center border-3">
                    
                    {Action==='login' &&
                    (  
                        
                        <div class="border rounded border-danger">
                            <div className="d-flex justify-content-center">
                                <div class="btn btn-primary me-2"><h1>Login</h1></div>
                                <div onClick={ () => ChangeAction('register') } class="btn ms-2 notsetloginaction"><h1>Register</h1></div>
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
                                <form class="tt" onSubmit={(e) => UpdateLogin(e,{etap})}>
                                    <input type="text" class="col-12" value={Z} autoFocus onChange={(e) => {SetZ(e.target.value)}} />
                                </form>

                            </div>

                        </div>
                        
                    )}



                    {Action==='register' &&
                    (  
                        
                        <div class="border rounded border-danger">
                        <div className="d-flex justify-content-center">
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
     );
}
 
export default Login;