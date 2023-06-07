import React, { useState } from "react"
import "../App.css"
import Board from "../components/Board"
import AddBoard from "../components/AddBoard"

export default function Kanban(props){
    var project_name= props.project_name
    const [boards, setBoards]=useState([ 
                   
                    {   
                        id:Date.now()+Math.random()*2,
                        name:"Board 1",
                        color:"#ce7ddc",
                        cards:[
                            
                            {
                                id:Date.now()+Math.random(),
                                name:"Card 2",
                                date:"2/06/23",
                                task:[],
                                priority:"medium",
                                assignee:"pearl",
                                desc:"Hi this is the description",
                                date:"",
                            }
                        ]
                    },
                    {
                        id:Date.now()+Math.random()*2,
                        name:"Board 2",
                        color:"#ff9f79",
                        cards:[
                            {
                                id:Date.now()+Math.random(),
                                name:"Card 3",
                                assignee:"patrick",
                                date:"2/06/23",
                                task:[],
                                priority:"high",
                                desc:"Hi this is the description",
                                date:"",
                            },
                            {
                                id:Date.now()+Math.random(),
                                name:"Card 4",
                                date:"2/06/23",
                                task:[],
                                priority:"medium",
                                assignee:"mad max",
                                desc:"Hi this is the description",
                                date:"",
                            }
                        ]
                       
                    },
                    {
                        id:Date.now()+Math.random()*2,
                        name:"Board 3",
                        color:"#96a9fb",
                        cards:[
                            {
                                id:Date.now()+Math.random(),
                                name:"Card 1",
                                assignee:"bob",
                                date:"2/06/23",
                                task:[],
                                priority:"low",
                                desc:"Hi this is the description",
                                date:"",
                            },
                            {
                                id:Date.now()+Math.random(),
                                name:"Card 5",
                                assignee:"Gary V",
                                date:"2/06/23",
                                task:[],
                                priority:"high",
                                desc:"Hi this is the description",
                                date:"",
                            },
                            {
                                id:Date.now()+Math.random(),
                                name:"Card 6",
                                assignee:"Medusa",
                                date:"2/06/23",
                                task:[],
                                priority:"high",
                                desc:"Hi this is the description",
                                date:"",
                            }
                        ]
                       
                    }])
                       
    

    const addCard=(name, bid)=>{
        const newCard={
            id:Date.now()+ Math.random(),
            name,
            labels:[],
            tasks:[],
            date: "",
            desc:""
        }
        const index= boards.findIndex(item=>item.id===bid)
        if(index<0) return
        const tempBoards=[...boards]
        tempBoards[index].cards.push(newCard)
        setBoards(tempBoards)
        
    }
    
    const removeCard=(cid,bid)=>{
        const bIndex= boards.findIndex((item)=>item.id===bid)
        if(bIndex<0)return;

        const cIndex= boards[bIndex].cards.findIndex((item)=>item.id===cid)
        if(cIndex<0) return;

        const tempBoards=[...boards]
        tempBoards[bIndex].cards.splice(cIndex,1)
        setBoards(tempBoards)
        console.log("remove  card")
    }

    const addBoard=(title)=>{
        var letters = 'BCDEF'.split('');
        let code = "#";
        for (var i = 0; i < 6; i++ ) {
            code += letters[Math.floor(Math.random() * letters.length)];
        }
        code=`hsla(${~~(360 * Math.random())}, 70%,  72%, 0.8)`
        setBoards([
            ...boards,
            {
                id:Date.now()+Math.random()*2,
                name:title,
                color:code,
                cards:[],
            }
        ])
    };

    const removeBoard=(Bid)=>{
        const tempBoards=boards.filter(item=>item.id!==Bid)
        setBoards(tempBoards)
       
    }


    const boardelements= boards.map((board)=>{
        return(<Board   key={board.id}
                        id={board.id}
                        board_name={board.name} 
                        color={board.color} 
                        show={true}
                        cards={board.cards}
                        addCard={addCard}
                        removeBoard={()=>removeBoard(board.id)}
                        addBoard={addBoard}
                        removeCard={removeCard}/>)
    })
    return(
     <div className="kanban">
        <div className="kanban-header">
             <h1>{project_name}</h1>
        </div>
        <div className="kanban-container">
             <div className="kanban-boards">
                   {boardelements}
                    <AddBoard addBoard={addBoard}/>
             </div>
        </div>
     </div>   
    )
}
