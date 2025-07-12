import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { getToken } from '../utils/auth';

export default function AuthLoading({ navigation }) {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (token) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    };
    checkAuth();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
