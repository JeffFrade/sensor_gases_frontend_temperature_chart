import { createStore } from 'vuex'
import axios from 'axios'
import moment from 'moment'

export default createStore({
  state: {
    temperatures: {
      date: [],
      max: [],
      min: []
    }
  },
  mutations: {
    storeToken(state, payload) {
      localStorage.setItem('token', `Bearer  ${payload.access_token}`)
      localStorage.setItem('refresh_token', payload.refresh_token)
    },

    storeTemperatures(state, payload) {
      state.temperatures.date = []
      state.temperatures.max = []
      state.temperatures.min = []

      payload.metrics.forEach(item => {
        state.temperatures.date.push(moment(item._id).format('DD/MM/YYYY'))
        state.temperatures.max.push(item.temperatura_max)
        state.temperatures.min.push(item.temperatura_min)
      })
    }
  },
  getters: {
    getDateTemperatures(state) {
      return state.temperatures.date
    },

    getMaxTemperatures(state) {
      return state.temperatures.max
    },

    getMinTemperatures(state) {
      return state.temperatures.min
    }
  },
  actions: {
    async login(ctx) {
      await axios.post(`${process.env.VUE_APP_API_HOST}/oauth/token`, {
        grant_type: 'password',
        client_id: process.env.VUE_APP_API_CLIENT_ID,
        client_secret: process.env.VUE_APP_API_CLIENT_SECRET,
        username: process.env.VUE_APP_API_USERNAME,
        password: process.env.VUE_APP_API_PASSWORD
      }).then((response) => {
        ctx.commit('storeToken', response.data)
      })
    },

    async getTemperature(ctx) {
      await axios.get(`${process.env.VUE_APP_API_HOST}/metrics/temperature`, {
        headers: {
          Authorization: localStorage.getItem('token')
        },

        params: {
          id_device: process.env.VUE_APP_API_ID_DEVICE,
          period: [
            moment().subtract(6, 'days').format('YYYY-MM-DD'),
            moment().format('YYYY-MM-DD')
          ]
        }
      }).then((response) => {
        ctx.commit('storeTemperatures', response.data.data)
      })
    },
  },
})
