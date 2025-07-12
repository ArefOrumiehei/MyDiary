import { View, TextInput, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from "@env";
import axios from 'axios';
import { authStyles } from '../styles/authStyles';


export default function Login() {
  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors, isSubmitting }} = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      });
      const token = res.data.token;
      await SecureStore.setItemAsync("token", token);
      Toast.show({
        type: 'success',
        text1: 'ورود موفق!',
      });
      navigation.replace('Home');
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'خطا در ورود',
        text2: err.response?.data || 'نام کاربری یا رمز اشتباه است.',
      });
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/relax2.jpg')} style={authStyles.authContainer}>
      <View style={authStyles.authForm}>
        <Text style={authStyles.formTitle}>ورود</Text>

        <View style={authStyles.inputContainer}>
          <Text style={authStyles.label}>ایمیل</Text>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            rules={{
              required: 'ایمیل الزامی است',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'فرمت ایمیل معتبر نیست',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="example@gmail.com"
                style={authStyles.input}
                value={value}
                onChangeText={onChange}
                keyboardType='email-address'
                autoCapitalize="none"
                textAlign='right'
              />
            )}
          />
          <Text style={authStyles.error}>{errors.email && errors.email.message}</Text>
        </View>

        <View style={authStyles.inputContainer}>
          <Text style={authStyles.label}>رمز عبور</Text>
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{ required: 'رمز عبور الزامی است' }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="رمز عبور"
                secureTextEntry
                style={authStyles.input}
                value={value}
                onChangeText={onChange}
                textAlign='right'
              />
            )}
          />
          <Text style={authStyles.error}>{errors.password && errors.password.message}</Text>
        </View>


        <TouchableOpacity style={authStyles.formBtn} onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
          <Text style={authStyles.formBtnText}>{isSubmitting ? 'در حال ورود...' : 'ورود'}</Text>
        </TouchableOpacity>

        <Text style={authStyles.switchAuth}>
          حساب نداری؟ <Text style={authStyles.switchAuthLink} onPress={() => navigation.navigate("Signup")}>ثبت‌نام کن</Text>
        </Text>
        
        <Toast />
      </View>
    </ImageBackground>
  );
}