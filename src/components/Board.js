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
  let flag = true
  function backtrack(n) {
    if (n <= 0) 
    {
      flag = false;
      return;
    }
    for (let i = 1; i <= props.size && flag; i++) {
      if (!col.has(i) && !pos.has(n + i) && !neg.has(n - i)) {
        col.add(i);
        pos.add(parseInt(n) + parseInt(i));
        // console.log(new Array(...pos).join(' '))
        neg.add(parseInt(n) - parseInt(i));
        setRes((x) => [...x, { row: n, colom: i, status: "insert" }]);
        // console.log(res)
        backtrack(n - 1);
        setRes((x) => [...x, { row: n, colom: i, status: "remove" }]);
        col.delete(i);
        pos.delete(parseInt(n) + parseInt(i));
        // console.log(new Array(...pos).join(' '))
        neg.delete(parseInt(n) - parseInt(i));
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
    if(count < res.length - props.size)
    {
      setPlace((prev)=>{
        let change = [[]];
        // console.log(change)
        change = prev
        // console.log(prev)
        // console.log("hey" + change)
        const r = res[count].row-1
        const c = res[count].colom-1
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
  // console.log(res);
  return (
    <div className="board">
      <h1 className="text"> {props.size} recived </h1>
      {use}
      <button onClick={next}>Next</button>
    </div>
  );
}
