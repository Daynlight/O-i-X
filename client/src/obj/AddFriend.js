import { useState } from "react";
import Cookies from 'universal-cookie';
import md5 from "md5";


const AddFriend = () => {
    const { AddFriendURL } = require("../BackendLinks");
    const cookies = new Cookies();

    const [FriendAded,SetFriendAded] = useState(false);
    const [FriendNick,SetFriendNick] = useState('');

    function AddFriendFunction(e)
    {
        e.preventDefault();
        fetch(AddFriendURL,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({UserNick: cookies.get("UserNick"), UserPass: cookies.get("UserPass"), FriendNick: md5(FriendNick)})
          })
        .then((r)=>r.json())
        .then((res)=>SetFriendAded(res[0].status));
    }

    return ( 
    <div>
        <div class="d-flex justify-content-center">
        <form onSubmit={ (e)=> AddFriendFunction(e) }>
            <input type="text" class="form-control my-2" value={FriendNick} onChange={(e)=>SetFriendNick(e.target.value.toLowerCase())} placeholder="Friend Nick to ADD" />

            <div class="d-flex justify-content-center">
                <input type="submit" class="btn btn-warning text-dark" value="ADD Friend" />
            </div>

        </form>
        </div>
        {FriendAded&& <div class="d-flex justify-content-center">{FriendAded}</div>}
    </div> 
    );
}
 
export default AddFriend;