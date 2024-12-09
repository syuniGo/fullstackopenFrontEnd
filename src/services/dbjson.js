import axios from 'axios'
const baseUrl = `http://localhost:3001/api/`

const getAll = (obj_type) => {
  const request = axios.get(baseUrl+obj_type)
  return request.then(response => response.data)
}

const create = (obj_type, newObject) => {
  const request = axios.post(baseUrl+obj_type, newObject)
  return request.then(response => response.data)
}

const update = (obj_type, rid, newObject) => {
  const request = axios.put(`${baseUrl+obj_type}/${rid}`, newObject)
  return request.then(response => response.data)
}

const deleteObj = (obj_type, rid) => {
  console.log('Deleting:', `${baseUrl}${obj_type}/${rid}`)
  const request = axios.delete(`${baseUrl+obj_type}/${rid}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, deleteObj}
