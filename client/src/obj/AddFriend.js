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
        <div className="">
            <form onSubmit={ (e)=> AddFriendFunction(e) }>
                <input type="text" className="" value={FriendNick} onChange={(e)=>SetFriendNick(e.target.value.toLowerCase())} placeholder="Friend Nick" />
                <div className="">
                    <input type="submit" className="btn btn-warning text-dark" value="ADD Friend" />
                </div>
            </form>
        </div>
        <div className="infotext TextGradiant">{FriendAded}</div>
    </div> 
    );
}
 
export default AddFriend;