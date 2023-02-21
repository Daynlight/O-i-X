import { useEffect, useState } from "react";
const LocalGame = () => {
    const [Place,SetPlace] = useState([{id:1, get:''},{id:2, get:''},{id:3, get:''},{id:4, get:''},{id:5, get:''},{id:6, get:''},{id:7, get:''},{id:8, get:''},{id:9, get:''}])
    const [Move,SetMove] = useState(0);
    const [Ture,SetTure] = useState(0);
    const [Win, SetWin] = useState('');

    
    function setPos(id) 
    {
        if(Move===0)
        {
            var NewPlace = [...Place];
            NewPlace[id-1].get = 'x';
            SetPlace(NewPlace);
            SetMove(1);
            SetTure(Ture+1);
        }
        if(Move===1)
        {
            var NewPlace = [...Place];
            NewPlace[id-1].get = 'o';
            SetPlace(NewPlace);
            SetMove(0);
        }
    }


    useEffect(() =>
    {
       
       var us = 'o';
       if(Place[0].get===us && Place[1].get===us && Place[2].get===us)
       {
        SetWin(us);
       }
       if(Place[3].get===us && Place[4].get===us && Place[5].get===us)
       {
        SetWin(us);
       }
       if(Place[6].get===us && Place[7].get===us && Place[8].get===us)
       {
        SetWin(us);
       }
       if(Place[0].get===us && Place[3].get===us && Place[6].get===us)
       {
        SetWin(us);
       }
       if(Place[1].get===us && Place[4].get===us && Place[7].get===us)
       {
        SetWin(us);
       }
       if(Place[2].get===us && Place[5].get===us && Place[8].get===us)
       {
        SetWin(us);
       }
       if(Place[0].get===us && Place[4].get===us && Place[8].get===us)
       {
        SetWin(us);
       }
       if(Place[2].get===us && Place[4].get===us && Place[6].get===us)
       {
        SetWin(us);
       }

       var us = 'x';
       if(Place[0].get===us && Place[1].get===us && Place[2].get===us)
       {
        SetWin(us);
       }
       if(Place[3].get===us && Place[4].get===us && Place[5].get===us)
       {
        SetWin(us);
       }
       if(Place[6].get===us && Place[7].get===us && Place[8].get===us)
       {
        SetWin(us);
       }
       if(Place[0].get===us && Place[3].get===us && Place[6].get===us)
       {
        SetWin(us);
       }
       if(Place[1].get===us && Place[4].get===us && Place[7].get===us)
       {
        SetWin(us);
       }
       if(Place[2].get===us && Place[5].get===us && Place[8].get===us)
       {
        SetWin(us);
       }
       if(Place[0].get===us && Place[4].get===us && Place[8].get===us)
       {
        SetWin(us);
       }
       if(Place[2].get===us && Place[4].get===us && Place[6].get===us)
       {
        SetWin(us);
       }
    });

    

    return ( 
        <div>
            <div class="mx-5 d-flex justify-content-center border rounded-5">
                {Win === '' && Ture!==5 && <div class="fs-1">Game is Running</div>}
                {Win === 'x' && <div class="fs-1">X Win</div>}
                {Win === 'o' && <div class="fs-1">O Win</div>}
                {Ture === 5 && Win==='' && <div class="fs-1">Remis</div>}
            </div>
            <div class="mx-5 row border rounded-5 p-3">
                {Place.map(e=>(
                    (e.get==='x' && <div key={e.id} class="col-4 plcae">
                        
                    <svg fill="#6c757d" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                        width="100%" height="100%" class="p-5" viewBox="0 0 94.926 94.926">
                    <g>
                        <path d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0
                            c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096
                            c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476
                            c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62
                            s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"/>
                    </g>
                    </svg>

                    </div>) ||
                    (e.get==='o' && <div key={e.id} class="col-4 plcae">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-circle p-5" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        </svg>
                    </div>) || 
                    ( e.get==='' && Win==='' && <div key={e.id} onClick={() => setPos(e.id) } class="col-4 plcae"></div>) ||
                    ( e.get==='' && Win!=='' && <div key={e.id} class="col-4 plcae"></div>)
                ))}



            </div>
        </div>
     );
}
 
export default LocalGame;