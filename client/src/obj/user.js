import { useState } from "react";

const User = () => {
    const [Name,SetName] = useState('Anonim');
    return ( 
        <div class="border justify-content-center d-flex">
            <div>
                <h1>{ Name }</h1>
            </div>



        </div> 
    );
}
 
export default User;