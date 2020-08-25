import { AsyncStorage } from 'react-native'

//Guarda el token en el almacenamiento del dispositivo
export default async (token) => {
  if (token !== null) {
    console.log('Salvando token en dispositivo')
    await AsyncStorage.setItem('token', token)
  } else {
    console.log('Borrando token en dispositivo')
    await AsyncStorage.removeItem('token')
  }
}
