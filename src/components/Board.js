import React from "react";
import "./Board.css";
export default function Board(props) {
  // const squareElements = squares.map(square => (
  //     <div className="box" key={square}></div>
  // ))
  const [res, setRes] = React.useState([])
  let col = new Set()
  let pos = new Set()
  let neg = new Set()
  function backtrack(n){
    if(n <= 0) return
    for(let i = 0; i < props.size; i++)
    {
      if(!col.has(i) && !pos.has(n+i) && !neg.has(n-i))
      {
        col.add(i)
        pos.add(n+i)
        neg.add(n-i)
        setRes(x => [...x,{row : n,colom: i,status : "insert"}])
        // console.log(res)
        backtrack(n-1)
        setRes(x => [...x,{row : n,colom: i,status : "remove"}])
        col.delete(i)
        pos.delete(n+i)
        neg.delete(n-i)
      }
      else{
        setRes(x => [...x,{row : n,colom: i,status : "insert"}])
        setRes(x => [...x,{row : n,colom: i,status : "remove"}])
      }
    }
  }
  React.useEffect(()=>{
    backtrack(props.size)
  },[props.size])
  console.log(res)
  return (
    <div>
      <h1 className="text" > {props.size} recived </h1>
      
    </div>
  );
}
