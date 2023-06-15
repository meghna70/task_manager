import React, { useEffect,useState } from "react"
import "../App.css"
import Board from "../components/Board"
import AddBoard from "../components/AddBoard"
import { Client,Databases,Account} from "appwrite";
import Header from '../components/Header'

export default function Kanban(props){
    const client=new Client();
    const databases=new Databases(client);
    const account=new Account(client);
    console.log(process.env.REACT_APP_APPWRITE_PROJID)
    client.setEndpoint('https://cloud.appwrite.io/v1').setProject(process.env.REACT_APP_APPWRITE_PROJID);
    const proj_id="6487dcefdf581387f277";


    const [boards,setBoards]=useState([]);
    const [loading,setLoading]=useState(true);
    const[boardLoading,setBoardsLoading]=useState(false);
    const[current,setCurrent]=useState(null)
    useEffect(()=>{
        setBoardsLoading(true);
        (async()=>{
                try{
                    const collid=process.env.REACT_APP_BOARD_COLL;
                    const promise=await fetch(`https://taskhive-0r79.onrender.com/listDocuments?id=${proj_id}&collectionId=${collid}&field=${"project_id"}`)
                    const response = await promise.json();
                    console.log(response.usr_dets.documents);
                    setBoards(response.usr_dets.documents);
                }
                catch(error){
                    console.log(error);
                }
                finally{
                setBoardsLoading(false);
                }
        })
        ();

    },[boards]);  

    const addBoard=async(title,proj_id)=>{
        var letters = 'BCDEF'.split('');
        let code = "#";
        for (var i = 0; i < 6; i++ ) {
            code += letters[Math.floor(Math.random() * letters.length)];
        }
        code=`hsla(${~~(360 * Math.random())}, 70%, 72%, 0.8)`;
        const idboard=(Date.now()+Math.random()*2).toString();
        var data={
            $id:"",
            board_id:idboard,
            name:title,
            project_id:(proj_id).toString(),
            card_ids:[],
            color:code
        };
        try{
            console.log("Reached pt 1");
            console.log(data);
            const res=await fetch('https://taskhive-0r79.onrender.com/createBoard',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    "board_id":data.board_id,
                    "name":title,
                    "project_id":data.project_id,
                    "card_ids":[],
                })
            });
            
            console.log(res);

            if (res.ok){
                const resData = await res.json();
                data.id = resData.board.$id;
                console.log("Doc id:"+data.id+" response: "+resData.board);
                setBoards([
                    ...boards,
                    data
                ]);
                // const res=await fetch(`https://taskhive-0r79.onrender.com/delete?id=${proj_id}&collectionId=${process.env.REACT_APP_PROJ_COLL}`,
                // {
                // method:'PATCH'
                // },{
                //     body:JSON.stringify({
                //         "board_ids":
                //     })
                // });
            }else{
                console.log("Internal server error");
            }
        }catch(error){
            console.log(error)
        }
        
    }

    const removeBoard=async(bid)=>{
        try{
            const tempBoards=boards.filter(item=>item.$id!==bid)
            const toDelBoard=boards.filter(item=>item.$id===bid)
            console.log("Document to delete:"+ bid);
            const res=await fetch(`https://taskhive-0r79.onrender.com/delete?id=${bid}&collectionId=${process.env.REACT_APP_BOARD_COLL}`,
            {
                method:'DELETE'
            });
            if (res.ok){
                console.log("Deleting document: "+res.json());
                setBoards(tempBoards)
               const promises= toDelBoard.card_ids.map((item)=>{
                (async()=>{
                    console.log("Document to delete:"+ bid);
                    const res=await fetch(`https://taskhive-0r79.onrender.com/delete?id=${item}&collectionId=${process.env.REACT_APP_CARDS_COLL}`,
                    {
                    method:'DELETE'
                    });
                })();
                })
                await Promise.all(promises);
            }
            else{
                console.log("Internal server error");
            }
        }catch(error){
            console.log(error)
        }
    }
    

    const addCard=async(name, bid,cardid)=>{
        const newCard={
            id:cardid,
            card_id:Date.now()+ Math.random(),
            topic:name,
            deadline:"",
            board_id:bid,
            user_ids:[],
            desc:"",
            priority:"",
        };
        // try{
        //     console.log("Reached pt card 1");
        //     console.log(data);
        //     const res=await fetch('https://taskhive-0r79.onrender.com/createBoard',{
        //         method:'POST',
        //         headers:{
        //             'Content-Type':'application/json'
        //         },
        //         body:JSON.stringify({
        //             "card_id":newCard.card_id,
        //             "topic":newCard.topic,
        //             "board_id":newCard.board_id,
        //             "deadline":newCard.deadline,
        //             "desc":newCard.desc,
        //             "":
        //         })
        //     });
            
        //     console.log(res);

        //     if (res.ok){
        //         const resData = await res.json();
        //         data.id = resData.board.$id;
        //         console.log("Doc id:"+data.id+" response: "+resData.board);
        //         setBoards([
        //             ...boards,
        //             data
        //         ]);
        //     }else{
        //         console.log("Internal server error");
        //     }
        // }catch(error){
        //     console.log(error)
        // }

        const index= boards.findIndex(item=>item.id===bid)
        if(index<0) return
        const tempBoards=[...boards]
        tempBoards[index].card_ids.push(newCard.id)
        setBoards(tempBoards);
        
    }
    
    const removeCard=async(cid,bid)=>{
        const bIndex= boards.findIndex((item)=>item.$id===bid)
        if(bIndex<0)return;
        
        const cIndex= boards[bIndex].card_ids.findIndex((item)=>item.id===cid)
        if(cIndex<0) return;

        try{
            console.log("Document to delete:"+ bid);
            const modified=boards[bIndex].card_ids.filter((item)=>item!==cid)
            const res=await fetch(`https://taskhive-0r79.onrender.com/delete?id=${cid}&collectionId=${process.env.REACT_APP_CARDS_COLL}`,
            {
                method:'DELETE'
            });
            const res2=await fetch(`https://taskhive-0r79.onrender.com/delete?id=${bid}&collectionId=${process.env.REACT_APP_BOARD_COLL}`,
                {
                    method:'PATCH',
                    heaeders:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        "card_ids":modified
                    })
                })
        }catch(err){
            console.log(err);
        }
        const tempBoards=[...boards]
        tempBoards[bIndex].cards.splice(cIndex,1)
        setBoards(tempBoards)
        console.log("remove  card");
    }

    const boardelements=boards?boards.map((board)=>{
        return(<Board   key={board.$id}
                        id={board.$id}
                        board_name={board.name} 
                        show={true}
                        color={"#ce7ddc"}
                        cards={board.card_ids}
                        addCard={addCard}
                        removeBoard={()=>removeBoard(board.$id)}
                        addBoard={addBoard}
                        removeCard={removeCard}/>)
    }):null
    return(
        <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl h-screen'>
          {/* <div className="kanban-header"> */}
          {/* <h1>{project_name}</h1> */}
          <Header category='Kanban' title="Project 1"/>
          {/* </div> */}
          <div className="kanban-container">
            <div className="kanban-boards" style={{ overflowX: "scroll" }}>
            <AddBoard addBoard={addBoard}/>
              <div className="scroll-wrapper">
                {boardelements}
              </div>
            </div>
          </div>
        </div>
      
    )
}
