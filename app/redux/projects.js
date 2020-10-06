import axios from 'axios'

const SET_PROJECTS = 'SET_PROJECTS';

export const setProjects = (projects) => {
  return {
    type: SET_PROJECTS,
    projects
  }
};

export const fetchProjects = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/projects')
      dispatch(setProjects(res.data))
    } catch (error) {
      console.log(error)
    }
  }
};
const GET_PROJECT = 'GET_PROJECT';

export const _setProject = (project) => {
  return {
    type: GET_PROJECT,
    project
  }
};

export const getProject = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/projects/${id}`)
      dispatch(_setProject(res.data))
    } catch (error) {
      console.log(error)
    }
  }
};
export const updateProject=(history,id,title,completed,priority,deadline)=>{
  return async (dispatch)=>{
    await axios.put(`/api/projects/edit/${id}`,{title,completed,priority,deadline})
    const res = await axios.get('/api/projects')
    dispatch(setProjects(res.data))
    history.push('/projects')
  }
}
export const createProject=(title,history)=>{
  return async(dispatch)=>{
    await axios.post('/api/projects/create', {title})
    const res = await axios.get('/api/projects')
    dispatch(setProjects(res.data))
    history.push('/projects')
  }
} 
export const deleteProject=(id)=>{
  return async (dispatch)=>{
    await axios.delete(`/api/projects/delete/${id}`)
    const res = await axios.get('/api/projects')
    dispatch(setProjects(res.data))
  }
}

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function projectsReducer(state = [], action) {
  if (action.type === SET_PROJECTS){
    state = action.projects
    return state
  }
  if (action.type === GET_PROJECT){
    state = action.project
    return state
  }
  console.log(state)
  return state
}