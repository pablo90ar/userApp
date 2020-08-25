import axios from 'axios'
import { ApiUrl } from './constants'

export default () => {
  axios.defaults.baseURL = ApiUrl
  axios.defaults.headers.get['Content-Type'] = 'application/json' // default header for all GET request
  axios.defaults.headers.post['Content-Type'] = 'application/json' // default header for all POST request
}
