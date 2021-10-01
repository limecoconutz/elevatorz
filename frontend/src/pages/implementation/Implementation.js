import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Implementation.scss';
import Elevator from '../../components/Elevator';

const floors = Array(20).fill(null).map((_, i) => i+1).reverse();

function Implementation() {
const url = 'http://localhost:8000/api/elevators';
const [elevators, setElevators] = useState([]);
useEffect(()=>{
    const fetchElevators = async () => {
      const data = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const allElevators = data.data;
      setElevators(allElevators);
    }
    fetchElevators();
  },[]);
  const elevatorsOnFloor = floor => elevators.filter(el=> el.floor === floor);
  const findClosestElevator = floor => {
    if(elevatorsOnFloor(floor).length > 0) return null;
    const closestElevatorAbove = elevators.find(el => el.floor > floor);
    const closestElevatorBeneath = elevators.find(el => el.floor < floor);
    if(!closestElevatorAbove) {
      return closestElevatorBeneath;
    }
    if(!closestElevatorBeneath) {
      return closestElevatorAbove;
    }
    return closestElevatorAbove.floor < closestElevatorBeneath.floor ? closestElevatorAbove : closestElevatorBeneath;
  }

  const callElevatorToFloor = (fl) => {
    const elevatorToMove = findClosestElevator(fl);
    if(!elevatorToMove) return;
    const calculatedTimeout = Math.abs(fl-elevatorToMove.floor)*2000;
    console.log(calculatedTimeout);
    const updatedElevators = [...elevators, elevatorToMove.floor = fl];
    setTimeout(()=> {
      setElevators(updatedElevators);
      axios.patch(`${url}/${elevatorToMove.id}`, {floor: fl});
      return;
    }, calculatedTimeout);
  }
    return(
    <>
      <section className="floors">
        <ul>
        {
          floors.map(fl =>
            <li 
            key={fl} 
            className="floor"
            id={`floor_${fl}`}>
              <button className="button_floor" id={`${fl}`} onClick={()=> callElevatorToFloor(fl)}></button>
              <p>Floor {fl}</p>
              <div className="">
                {elevatorsOnFloor(fl).map( el=>
                <Elevator elevator={el} key={el.id}/>
                )}
              </div>
            </li>
          )
        }
        </ul>
      </section>
    </>
    );
}

export default Implementation;
