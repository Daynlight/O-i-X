import { useState } from "react";

const NavBar = ({Name}) => {



    return ( 
        <div>
            
            <ul class="nav justify-content-center fs-3">
                <li class="nav-item ">
                    <a class="nav-link active " aria-current="page">Hello { Name }</a>
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