import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

// Styles
import "../styles/auth.css"

// API
import api from '../api/configuration';

// Helpers
import { format } from '../helpers/dateHelpers';



const signupSchema = yup.object({
  name: yup.string().required('نام الزامی است'),
  email: yup.string().email('ایمیل معتبر وارد کنید').required('ایمیل الزامی است'),
  password: yup.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد').required('رمز عبور الزامی است'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'رمز عبور مطابقت ندارد')
    .required('تایید رمز عبور الزامی است'),
});

export default function SignUp() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid } } = useForm({
    resolver: yupResolver(signupSchema)
  });

  const navigate = useNavigate();
  const today = format(new Date());


  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      localStorage.setItem('token', res.data.token);
      toast.success('ثبت‌نام موفق!');
      navigate(`/${today}`, { replace: true });
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <div className='authContainer'>
      <form onSubmit={handleSubmit(onSubmit)} className="authForm">
        <h2 className='formTitle'>ثبت‌نام</h2>

        <div className="inputContainer">
          <label>نام</label>
          <input type="text" {...register('name')} placeholder='نام خود را وارد کنید' />
          {errors.name && <p className="error">{errors.name?.message}</p>}
        </div>

        <div className="inputContainer">
          <label>ایمیل</label>
          <input type="email" {...register('email')} placeholder='ایمیل خود را وارد کنید' />
          {errors.email && <p className="error">{errors.email?.message}</p>}
        </div>

        <div className="inputContainer">
          <label>رمز عبور</label>
          <input type="password" {...register('password')} placeholder='رمز عبور...' />
          {errors.password && <p className="error">{errors.password?.message}</p>}
        </div>

        <div className="inputContainer">
          <label>تایید رمز عبور</label>
          <input type="password" {...register('confirmPassword')} placeholder='تکرار رمز عبور...' />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword?.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting || !isDirty || !isValid} className='formBtn'>
          {isSubmitting ? 'در حال ارسال...' : 'ثبت‌نام'}
        </button>

        <p className="switchAuth">
          حساب دارید؟ <Link to="/login">لاگین کنید</Link>
        </p>
      </form>
    </div>
  );
}
