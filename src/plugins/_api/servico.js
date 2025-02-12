import axios from 'axios'

export default {
  GetAll: function () {
    return new Promise((resolve) => {
      axios.get('Servicos').then((res) => resolve(res.data))
    })
  },

  GetById: function (id) {
    return new Promise((resolve, reject) => {
      axios.get(`Servicos/${id}`).then((res) => resolve(res.data))
      .catch(() => reject('Atendimento não encontrado'))
    })
  },
  Patch: function (id, data) {
    return new Promise((resolve) => {
      axios.patch(`Servicos/${id}`, data).then((res) => resolve(res.data))
    })
  },
}
