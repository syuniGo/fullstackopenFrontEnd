import axios from 'axios'
const baseUrl = `http://localhost:3001/`

const getAll = (obj_type) => {
  const request = axios.get(baseUrl+obj_type)
  return request.then(response => response.data)
}

const create = (obj_type, newObject) => {
  const request = axios.post(baseUrl+obj_type, newObject)
  return request.then(response => response.data)
}

const update = (obj_type, id, newObject) => {
  const request = axios.put(`${baseUrl+obj_type}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteObj = (obj_type, id) => {
  console.log('Deleting:', `${baseUrl}${obj_type}/${id}`)
  const request = axios.delete(`${baseUrl+obj_type}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, deleteObj}
