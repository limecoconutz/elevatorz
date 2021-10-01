const elevators = require('../db_mock/elevators.json');

const notFound = id => `id of ${id} not found`;
const findElevatorByID = id => elevators.find(el => el.id === id);
const findElevatorsByFloor = floor => elevators.filter(el => el.floor === floor);
const findElevatorsByStatus = status => elevators.filter(el => el.status === status);

const getElevators = (req, res) => {
  res.json(elevators);
}

const moveElevator = async(req, res) => {
  try {
    const elevatorToMove = await findElevatorByID(+req.params.id);
    if(!elevatorToMove) return res.status(404);
    if(req.body.floor > 20 || req.body.floor < 1) return res.status(404);
    elevatorToMove.floor = req.body.floor;
    res.json(elevatorToMove);
  }catch(err) {
    res.status(400).json({err});
  }
}

const moveElevatorUp = async(req, res) => {
  try{
    const elevatorToMove = await findElevatorByID(+req.params.id);
    if(elevatorToMove.floor === 20) return;
    elevatorToMove.floor++;
    res.json(elevatorToMove);
  }catch(err) {
    res.status(400).json({message: err});
  }
}

const moveElevatorDown = async(req, res) => {
  try{
    const elevatorToMove = await findElevatorByID(+req.params.id);
    if(elevatorToMove.floor === 1) return;
    elevatorToMove.floor--;
    res.json(elevatorToMove);
  }catch(err) {
    res.status(400).json({message: err});
  }
}

const getElevatorById = async(req, res) => {
  try{
    const searchedElevator = await findElevatorByID(+req.params.id);
    if(!searchedElevator){ res.status(404).json(notFound(req.params.id))};
    res.status(200).json(searchedElevator);
  }catch(err){
    res.json({message: err});
  }
}

const getElevatorsByFloor = async(req, res) => {
  try{
    const searchedElevators = await findElevatorsByFloor(+req.params.floor);
    res.status(200).json(searchedElevators);
  }catch(err){
    res.json({message: err});
  }
}

const getElevatorsByStatus = async(req, res) => {
  try{
    const searchedElevators = await findElevatorsByStatus(req.params.status);
    res.status(200).json(searchedElevators);
  }catch(err){
    res.json({message:err});
  }
}

module.exports = {
  getElevators,
  getElevatorsByFloor,
  getElevatorsByStatus,
  getElevatorById,
  moveElevatorDown,
  moveElevatorUp,
  moveElevator
}
