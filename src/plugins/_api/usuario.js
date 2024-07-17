import axios from 'axios'

export default {
  GetAll: function () {
    return new Promise((resolve) => {
      axios.get('Usuario').then((res) => resolve(res.data))
    })
  },
  GetById: function (id) {
    return new Promise((resolve, reject) => {
      axios.get(`Usuario/${id}`).then((res) => resolve(res.data))
      .catch(() => reject('Usuário não encontrado'))
    })
  },
  GetByCpf: function (cpf){
    return new Promise((resolve) => {
      axios.get('Usuario').then((res) => {
        const user = res.data.find((user) => user.cpf === cpf)
        resolve(user ? user : false)
      })
    })
  },
  Post: function (data) {
    return new Promise((resolve) => {
      axios.post('Usuario', data).then((res) => resolve(res.data))
    })
  },
  Put: function (id, data) {
    return new Promise((resolve) => {
      axios.put(`Usuario/${id}`, data).then((res) => resolve(res.data))
    })
  },
  Patch: function (id, data) {
    return new Promise((resolve) => {
      axios.put(`Usuario/${id}`, data).then((res) => resolve(res.data))
    })
  },
  Delete: function (id) {
    return new Promise((resolve) => {
      return axios.delete(`Usuario/${id}`).then(() => resolve(id))
    })
  },
}
