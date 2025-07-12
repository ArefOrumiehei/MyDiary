import * as SecureStore from 'expo-secure-store';

export async function getToken() {
  return await SecureStore.getItemAsync('token');
}
