import { useState } from "react";
const BotGame = () => {
    const [Place,SetPlace] = useState([{id:1, get:''},{id:2, get:''},{id:3, get:''},{id:4, get:''},{id:5, get:''},{id:6, get:''},{id:7, get:''},{id:8, get:''},{id:9, get:''}])
    
    return ( 
        <div class="mx-5 row border rounded-5 p-3">
            <div className="col-4 plcae"></div>
            <div className="col-4 plcae"></div>
            <div className="col-4 plcae"></div>
            <div className="col-4 plcae"></div>
            <div className="col-4 plcae"></div>
            <div className="col-4 plcae"></div>
            <div className="col-4 plcae"></div>
            <div className="col-4 plcae"></div>
            <div className="col-4 plcae"></div>



        </div>
     );
}
 
export default BotGame;