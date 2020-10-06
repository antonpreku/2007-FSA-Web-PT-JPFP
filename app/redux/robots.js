import axios from 'axios';

const SET_ROBOTS = 'SET_ROBOTS';

export const setRobots = (robots) => {
  return {
    type: SET_ROBOTS,
    robots
  }
};

export const fetchRobots = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/robots')
      dispatch(setRobots(res.data))
    } catch (error) {
      console.log(error)
    }
  }
};

const GET_ROBOT = 'GET_ROBOT';

export const _setRobot = (robot) => {
  return {
    type: GET_ROBOT,
    robot
  }
};

export const getRobot = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/robots/${id}`)
      dispatch(_setRobot(res.data))
    } catch (error) {
      console.log(error)
    }
  }
};

export const updateRobot=(history,id,name,fuelType,fuelLevel,imageUrl)=>{
  return async (dispatch)=>{
     await axios.put(`/api/robots/edit/${id}`,{name,fuelType,fuelLevel,imageUrl})
     const res = await axios.get('/api/robots')
    dispatch(setRobots(res.data))
    history.push('/robots')
  }
}

export const createRobot=(name,history)=>{
  return async(dispatch)=>{
      await axios.post('/api/robots/create', {name})
      const res = await axios.get('/api/robots')
      dispatch(setRobots(res.data))
      history.push('/robots')
  }
} 

export const deleteRobot=(id)=>{
  return async (dispatch)=>{
    await axios.delete(`/api/robots/delete/${id}`)
    const res = await axios.get('/api/robots')
    dispatch(setRobots(res.data))
  }
}
// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function robotsReducer( state = [], action) {
  if (action.type === SET_ROBOTS){
    state = action.robots
    return state
  }
  if (action.type === GET_ROBOT){
    state = action.robot
    return state
  }
  return state
}