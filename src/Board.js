import React from "react";

const Square = (props) => {
  return <button>1</button>;
};

const Board = () => {
  return (
    <React.Fragment>
      <h1>Hello</h1>
      <div>
        <Square />
        <Square />
        <Square />
      </div>
      <div>
        <Square />
        <Square />
        <Square />
      </div>
      <div>
        <Square />
        <Square />
        <Square />
      </div>
    </React.Fragment>
  );
};

export default Board;
