import React from "react";
import "./Board.css";
export default function Board(props) {
  // const squareElements = squares.map(square => (
  //     <div className="box" key={square}></div>
  // ))
  let tmp = [];
  for (let i = 0; i < props.size; i++) {
    let x = [];
    for (let j = 0; j < props.size; j++) x.push(0);
    tmp.push(x);
  }
  const [place, setPlace] = React.useState(tmp);
  const [use, setUse] = React.useState([]);

  const [res, setRes] = React.useState([]);
  let col = new Set();
  let pos = new Set();
  let neg = new Set();
  function backtrack(n) {
    if (n <= 0) return;
    for (let i = 0; i < props.size; i++) {
      if (!col.has(i) && !pos.has(n + i) && !neg.has(n - i)) {
        col.add(i);
        pos.add(n + i);
        neg.add(n - i);
        setRes((x) => [...x, { row: n, colom: i, status: "insert" }]);
        // console.log(res)
        backtrack(n - 1);
        setRes((x) => [...x, { row: n, colom: i, status: "remove" }]);
        col.delete(i);
        pos.delete(n + i);
        neg.delete(n - i);
      } else {
        setRes((x) => [...x, { row: n, colom: i, status: "insert" }]);
        setRes((x) => [...x, { row: n, colom: i, status: "remove" }]);
      }
    }
  }
  function loops() {
    setUse([]);
    for (let i = 0; i < props.size; i++) {
      setUse((prev) => {
        return [
          ...prev,
          <div className="flex-con">
            {" "}
            {place[i].map((num) => {
              if (num === 0) return <div className="not-placed text box"></div>;
              else return <div className="placed text box"></div>;
            })}{" "}
          </div>,
        ];
      });
    }
  }
  React.useEffect(() => {
    backtrack(props.size);
    loops();
  }, []);
  const[count,setCount] = React.useState(0)
  function next()
  {
    if(count < res.length)
    {
      setPlace((prev)=>{
        let change = [[]];
        // console.log(change)
        change = prev
        // console.log(prev)
        // console.log("hey" + change)
        const r = res[count].row-1
        const c = res[count].colom
        // console.log(r,c)
        // console.log(count)
        for(let i = 0; i < props.size; i++)
        {
          for(let j = 0; j < props.size; j++)
          {
            if(i === r && j === c) change[r][c] = res[count].status === 'insert' ? 1 : 0
          }
        }
        // change[r][c] = res[count].status === 'insert' ? 1 : 0
        return change
      })
      loops()
      setCount((prev)=>prev+1)
    }
  }
  console.log(res);
  return (
    <div className="board">
      <h1 className="text"> {props.size} recived </h1>
      {use}
      <button onClick={next}>Next</button>
    </div>
  );
}
