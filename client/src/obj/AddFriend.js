import { useState } from "react";
import Cookies from 'universal-cookie';
import md5 from "md5";

const AddFriend = () => {
    const cookies = new Cookies();

    const [FriendAded,SetFriendAded] = useState(false);
    const [FriendNick,SetFriendNick] = useState('');

    var url = 'http://localhost:8080/FirendAdd/'+cookies.get('UserID')+'/'+cookies.get('UserNick')+'/'+cookies.get('UserPass')+'/'+md5(FriendNick);

    function AddFriendFunction(e)
    {
        e.preventDefault();
        fetch(url)
        .then((r)=>r.json())
        .then((res)=>SetFriendAded(res[0].status));
    }

    return ( 
    <div>
        <div class="d-flex justify-content-center">
        <form onSubmit={ (e)=> AddFriendFunction(e) }>
            <input type="text" class="form-control my-2" value={FriendNick} onChange={(e)=>SetFriendNick(e.target.value)} placeholder="Friend Nick to ADD" />

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