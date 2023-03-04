import { useState } from "react";
import Cookies from 'universal-cookie';
import md5 from "md5";


const AddFriend = () => {
    const { AddFriendURL } = require("../BackendLinks");
    const { FetchData } = require('../Functions/Fetch');
    const cookies = new Cookies();

    const [FriendAded,SetFriendAded] = useState('');
    const [FriendNick,SetFriendNick] = useState('');

    function AddFriendFunction(e)
    {
        e.preventDefault();
        FetchData(AddFriendURL,{UserNick: cookies.get("UserNick"), UserPass: cookies.get("UserPass"), FriendNick: md5(FriendNick)},(Resault)=>SetFriendAded(Resault[0].status))
    }

    return ( 
    <div>
        <div class="d-flex justify-content-center">
        <form onSubmit={ (e)=> AddFriendFunction(e) }>
            <input type="text" class="form-control my-2" value={FriendNick} onChange={(e)=>SetFriendNick(e.target.value.toLowerCase())} placeholder="Friend Nick" />
            <div class="d-flex justify-content-center">
                <input type="submit" class="btn btn-warning text-dark" value="ADD Friend" />
            </div>
        </form>
        </div>
        <div class="d-flex justify-content-center">{FriendAded}</div>
    </div> 
    );
}
 
export default AddFriend;