import { AsyncStorage } from 'react-native'

//Busca un token de sesion previa en la memoria persistente del dispositivo
export default async () => {
  console.log('Buscando token en el dispositivo...')
  const token = await AsyncStorage.getItem('token')
  if (token == null) {
    console.log('No hay token')
  } else {
    console.log('Token encontrado')
  }
  return token
}
