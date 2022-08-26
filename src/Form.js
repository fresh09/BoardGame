import React from "react";
import { useState, useRef } from "react";
import "./Style.css";

var data = [
  {
    id: 1,
    name: ""
  },
  {
    id: 2,
    name: ""
  },
  {
    id: 3,
    name: ""
  },
  {
    id: 4,
    name: ""
  },
  {
    id: 5,
    name: ""
  },
  {
    id: 6,
    name: ""
  },
  {
    id: 7,
    name: ""
  },
  {
    id: 8,
    name: ""
  },
  {
    id: 9,
    name: ""
  }
];
const initialState = [
  {
    data: data,
    isXNext: true,
    step: 0
  }
];

const Form = () => {
  const gameBoardRef = useRef(null);
  const [people, setPeople] = useState(data);
  const [isXNext, setIsXNext] = useState(true);
  const [moveHistory, setMoveHistory] = useState(initialState);
  const [winner, setWinner] = useState("No one win yet!");
  const changeName = (id) => {
    let newdata = people.map((p) => {
      if (p.id === id) {
        if (isXNext) {
          p.name = "X";
          setIsXNext(false);
        } else {
          p.name = "O";
          setIsXNext(true);
        }
      }
      return p;
    });
    setPeople(newdata);
    let newMove = {
      data: newdata,
      isXNext: isXNext,
      step: moveHistory.length
    };
    setMoveHistory(moveHistory.concat([newMove]));
    calculateWinner(data);
  };
  const reset = () => {
    let newdata = data.map((p) => {
      p.name = "";
      return p;
    });
    setPeople(newdata);
    setMoveHistory(initialState);
    setWinner("No one win yet!");
  };
  const winPositions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
  const calculateWinner = (data) => {
    let xPos = data.filter((p) => p.name === "X").map((p) => p.id);
    let oPos = data.filter((p) => p.name === "O").map((p) => p.id);
    for (let w of winPositions) {
      if (isSubset(w, xPos)) {
        setWinner("Player X win!");
        gameBoardRef.current.style = "pointer-events: none";
        break;
      } else if (isSubset(w, oPos)) {
        setWinner("Player O win!");
        gameBoardRef.current.style = "pointer-events: none";
        break;
      }
    }
  };

  const MoveHistory = (props) => {
    return (
      <>
        <span>Move History</span>
        <ol style={{ paddingLeft: "1em" }}>
          {props.moveHistory.map((move) =>
            move.step !== 0 ? (
              <li
                key={move.step}
                onClick={() => revertToPreviousMove(move.step)}
              >
                Move #{move.step}
              </li>
            ) : (
              ""
            )
          )}
        </ol>
      </>
    );
  };

  const revertToPreviousMove = (moveNumber) => {
    let history = moveHistory[moveNumber];
    setPeople(history.data);
    setMoveHistory(moveHistory.slice(0, moveNumber));
  };
  const isSubset = (array1, array2) => {
    return array1.every((e) => array2.includes(e));
  };
  return (
    <>
      <h1>Hello</h1>
      <h3>{winner}</h3>
      <div className="inlineBlock">
        <table ref={gameBoardRef}>
          <tbody>
            <tr>
              <td key={1} onClick={() => changeName(1)}>
                {data[0].name}
              </td>
              <td key={2} onClick={() => changeName(2)}>
                {data[1].name}
              </td>
              <td key={3} onClick={() => changeName(3)}>
                {data[2].name}
              </td>
            </tr>
            <tr>
              <td key={4} onClick={() => changeName(4)}>
                {data[3].name}
              </td>
              <td key={5} onClick={() => changeName(5)}>
                {data[4].name}
              </td>
              <td key={6} onClick={() => changeName(6)}>
                {data[5].name}
              </td>
            </tr>
            <tr>
              <td key={7} onClick={() => changeName(7)}>
                {data[6].name}
              </td>
              <td key={8} onClick={() => changeName(8)}>
                {data[7].name}
              </td>
              <td key={9} onClick={() => changeName(9)}>
                {data[8].name}
              </td>
            </tr>
          </tbody>
        </table>
        <button style={{ marginTop: "1em" }} onClick={reset}>
          Reset
        </button>
      </div>
      <div
        className="inlineBlock"
        style={{ verticalAlign: "top", paddingLeft: "1em" }}
      >
        <MoveHistory moveHistory={moveHistory} />
      </div>
    </>
  );
};

export default Form;
