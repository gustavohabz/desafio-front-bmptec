import axios from 'axios'

export default {
  GetAll: function () {
    return new Promise((resolve) => {
      axios.get('Atendimentos').then((res) => resolve(res.data))
    })
  },
  GetById: function (id) {
    return new Promise((resolve, reject) => {
      axios.get(`Atendimentos/${id}`).then((res) => resolve(res.data))
      .catch(() => reject('Atendimento não encontrado'))
    })
  },
  GetAllByUser: function (id) {
    return new Promise((resolve) => {
      axios.get('Atendimentos').then((res) => {
        const atendimentos = res.data.filter(at => at.idUsuario === id)
        resolve(atendimentos)
      })
    })

  },
  Post: function (data) {
    return new Promise((resolve) => {
      axios.post('Atendimentos', data).then((res) => resolve(res.data))
    })
  },
  Put: function (id, data) {
    return new Promise((resolve) => {
      axios.put(`Atendimentos/${id}`, data).then((res) => resolve(res.data))
    })
  },
  Patch: function (id, data) {
    return new Promise((resolve) => {
      axios.put(`Atendimentos/${id}`, data).then((res) => resolve(res.data))
    })
  },
  Delete: function (id) {
    return new Promise((resolve) => {
      axios.delete(`Atendimentos/${id}`).then(() => resolve(id))
    })
  }
}
