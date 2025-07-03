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


const loginSchema = yup.object({
  email: yup.string().email('ایمیل معتبر وارد کنید').required('ایمیل الزامی است'),
  password: yup.string().required('رمز عبور الزامی است'),
});

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isValid, isDirty } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const navigate = useNavigate();
  const today = format(new Date());

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/login', data);
      localStorage.setItem("token", res.data.token);
      toast.success('ورود موفق!');
      navigate(`/${today}`, { replace: true });
    } catch (err) {
      toast.error(err.response.data || "خطا در ورود");
    }
  };

  return (
    <div className="authContainer">
      <form onSubmit={handleSubmit(onSubmit)} className="authForm">
        <h2 className='formTitle'>ورود</h2>

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

        <button type="submit" disabled={isSubmitting || !isDirty || !isValid} className='formBtn'>
          {isSubmitting ? 'در حال ارسال...' : 'ورود'}
        </button>
        
        <p className="switchAuth">
          حساب ندارید؟ <Link to="/signup">ثبت‌نام کنید</Link>
        </p>
      </form>
    </div>
  );
}
