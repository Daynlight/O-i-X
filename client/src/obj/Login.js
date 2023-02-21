import { useState } from "react";
const Login = () => {
    const[Action,SetAction] = useState('register');
    const[Nick,SetNick] = useState('');
    const[Email,SetEmail] = useState('');
    const[Password,SetPassword] = useState('');
    const[Passsword1,SetPasssword1] = useState('');



    return ( 
        <div>
            <div className="d-flex row col-12 pt-5 justify-content-center">
                <div class="col-3"></div>
                <div class="col-6 border rounded border-danger d-flex justify-content-center border-3">
                    {Action==='login' &&
                    (  
                        
                        <form action="">
                            <div className="d-flex justify-content-center">
                                <h1>Login</h1>
                            </div>
                            <input type="text" class="col-12 my-1 form-login" required value={Nick} placeholder="Nick" onChange={e=> {SetNick(e.target.value)}}/>
                            <input type="password" class="col-12 my-1 form-login" required value={Password} placeholder="Password" onChange={e=> {SetPassword(e.target.value)}}/>
                            <input type="password" class="col-12 my-1 form-login" required value={Passsword1} placeholder="RePassword" onChange={e=> {SetPasssword1(e.target.value)}}/>
                            <input type="submit" class="col-12 btn my-1 btn-info form-login" value="Login" />
                        </form>
                        
                    )}


                    
                    {Action==='register' &&
                    (  
                        
                        <form action="">
                            <div className="d-flex justify-content-center">
                                <h1>Login</h1>
                            </div>
                            <input type="text" class="col-12 my-1 form-login" required value={Nick} placeholder="Nick" onChange={e=> {SetNick(e.target.value)}}/>
                            <input type="email" class="col-12 my-1 form-login" required value={Email} placeholder="Email" onChange={e=> {SetEmail(e.target.value)}}/>
                            <input type="password" class="col-12 my-1 form-login" required value={Password} placeholder="Password" onChange={e=> {SetPassword(e.target.value)}}/>
                            <input type="password" class="col-12 my-1 form-login" required value={Passsword1} placeholder="RePassword" onChange={e=> {SetPasssword1(e.target.value)}}/>
                            <input type="submit" class="col-12 btn my-1 btn-info form-login" value="Login" />
                        </form>
                        
                    )}





                </div>
                <div class="col-3"></div>
            </div>
        </div>
     );
}
 
export default Login;