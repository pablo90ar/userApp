import axios from 'axios'

//Guarda el token en la configuracion de las peticiones de axios
export default async (token) => {
  if (token !== null) {
    console.log('Seteando token en header de axios')
    axios.defaults.headers.common['x-auth-token'] = token
  } else {
    console.log('Borrando token en header de axios')
    delete axios.defaults.headers.common['x-auth-token']
  }
}
