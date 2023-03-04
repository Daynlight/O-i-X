import { useState } from "react";
const LocalGame = () => {
    const [Place,SetPlace] = useState([{id:1, Pose:''},{id:2, Pose:''},{id:3, Pose:''},{id:4, Pose:''},{id:5, Pose:''},{id:6, Pose:''},{id:7, Pose:''},{id:8, Pose:''},{id:9, Pose:''}])
    const [Move,SetMove] = useState(0);
    const [Win, SetWin] = useState('');

    function UpdatePlaces(id) 
    {
        var NewPlace = [...Place];
        if(Move===0)
        {
            NewPlace[id-1].Pose = 'x';
            SetMove(1);
        }
        if(Move===1)
        {
            NewPlace[id-1].Pose = 'o';
            SetMove(0);
            
        }
        SetPlace(NewPlace);
        CheckIfWin();
    }

    function Again()
    {
        SetPlace([{id:1, Pose:''},{id:2, Pose:''},{id:3, Pose:''},{id:4, Pose:''},{id:5, Pose:''},{id:6, Pose:''},{id:7, Pose:''},{id:8, Pose:''},{id:9, Pose:''}]);
        SetWin('');
    }

    function CheckIfWin() 
    {
        var us = 'x';
        if(Place[0].Pose===us && Place[1].Pose===us && Place[2].Pose===us){SetWin(us);}
        if(Place[3].Pose===us && Place[4].Pose===us && Place[5].Pose===us){SetWin(us);}
        if(Place[6].Pose===us && Place[7].Pose===us && Place[8].Pose===us){SetWin(us);}
        if(Place[0].Pose===us && Place[3].Pose===us && Place[6].Pose===us){SetWin(us);}
        if(Place[1].Pose===us && Place[4].Pose===us && Place[7].Pose===us){SetWin(us);}
        if(Place[2].Pose===us && Place[5].Pose===us && Place[8].Pose===us){SetWin(us);}
        if(Place[0].Pose===us && Place[4].Pose===us && Place[8].Pose===us){SetWin(us);}
        if(Place[2].Pose===us && Place[4].Pose===us && Place[6].Pose===us){SetWin(us);}
 
        us = 'o';
        if(Place[0].Pose===us && Place[1].Pose===us && Place[2].Pose===us){SetWin(us);}
        if(Place[3].Pose===us && Place[4].Pose===us && Place[5].Pose===us){SetWin(us);}
        if(Place[6].Pose===us && Place[7].Pose===us && Place[8].Pose===us){SetWin(us);}
        if(Place[0].Pose===us && Place[3].Pose===us && Place[6].Pose===us){SetWin(us);}
        if(Place[1].Pose===us && Place[4].Pose===us && Place[7].Pose===us){SetWin(us);}
        if(Place[2].Pose===us && Place[5].Pose===us && Place[8].Pose===us){SetWin(us);}
        if(Place[0].Pose===us && Place[4].Pose===us && Place[8].Pose===us){SetWin(us);}
        if(Place[2].Pose===us && Place[4].Pose===us && Place[6].Pose===us){SetWin(us);}

        var c = 0
        for(var i=0;i<9;i++) if(Place[i].Pose==='') c++;
        if(c===0)SetWin("Draw");
    }

    return ( 
        <div>
            {Win!=='' &&
                <div className="mx-5 d-flex mb-1 DarkerBackground ActualTime justify-content-center border rounded-5">
                    {Win === 'x' && <div className="fs-1">X Win</div>}
                    {Win === 'o' && <div className="fs-1">O Win</div>}
                    {Win==='Draw' && <div className="fs-1">Draw</div>}
                    <div onClick={() => Again()} className="ms-2 btn btn-primary fs-3">Play Again</div>
                </div>
            }
            <div>
                <div className="mx-5 row border DarkerBackground ActualTime rounded-5 p-3">
                    {Place.map(e=>(
                        (e.Pose==='x' && <div key={e.id} className="col-4 Place PlaceX">
                            
                        <svg fill="#6c757d" version="1.1" xmlns="http://www.w3.org/2000/svg"
                            width="100%" height="100%" className="p-5" viewBox="0 0 94.926 94.926">
                        <g>
                            <path d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0
                                c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096
                                c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476
                                c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62
                                s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"/>
                        </g>
                        </svg>
                        </div>) ||
                        (e.Pose==='o' && <div key={e.id} className="col-4 Place PlaceO">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" className="bi bi-circle p-5" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            </svg>
                        </div>) || 
                        ( e.Pose==='' && Win==='' && <div key={e.id} onClick={() => UpdatePlaces(e.id) } className="col-4 Place"></div>) ||
                        ( e.Pose==='' && Win!=='' && <div key={e.id} className="col-4 Place"></div>)
                    ))}
                </div>
            </div>

            
            
        </div>
     );
}
 
export default LocalGame;