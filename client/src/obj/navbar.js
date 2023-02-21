import { useState } from "react";

const NavBar = () => {
    const [Name,setName] = useState('');



    return ( 
        <div>
            
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link active " aria-current="page">{ Name }</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" >Disabled link</a>
                </li>
            </ul>

            
        </div>
     );
}
 
export default NavBar;