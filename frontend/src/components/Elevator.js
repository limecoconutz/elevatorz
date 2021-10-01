import React from "react";
function Elevator ({elevator}) {
    return (
      <>
        <div 
        className="elevator" 
        style={{order:`${elevator.floor}`}} 
        key={elevator.id}><p>{elevator.floor}</p>
        </div>
      </>
    );
}

export default Elevator;
