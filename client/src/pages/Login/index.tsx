import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { t } from 'i18next';
import EALogo from '../../assets/EnglishAcademyLogoVertical.png';
import FloatLabelInput from '../../components/FloatLabelInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType, z } from 'zod';
import { BiSolidUserCircle } from 'react-icons/bi';
import { GrFormViewHide, GrFormView } from 'react-icons/gr';
import { useState } from 'react';
import { RutFormat, formatRut, validateRut } from '@fdograph/rut-utilities';
import { toast } from 'react-toastify';
import { useAuthUserMutation } from '../../redux/services/userApi';
import { setUser } from '../../redux/features/userSlice';
import { useTranslation } from 'react-i18next';

type Login = {
  run: string;
  password: string;
};

const formSchema: ZodType<Login> = z.object({
  run: z.string().max(12),
  password: z.string().max(25),
});

type formType = z.infer<typeof formSchema>;

function Login() {
  useTranslation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  const [auth] = useAuthUserMutation();

  const [showPassword, setShowPassword] = useState(false);

  const [run, setRun] = useState('');

  const handlerRUNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRUN = event.target.value;
    const cleanRUN = newRUN.replace(/[^0-9kK]/g, '').toUpperCase();
    setRun(formatRut(cleanRUN, RutFormat.DOTS_DASH));
  };

  const handlerLogin: SubmitHandler<formType> = data => {
    data.run = data.run.replace(/[^0-9kK]/g, '').toUpperCase();

    if (!validateRut(String(data.run))) return toast.error(t('invalid_run'));

    data.run = data.run.substring(0, data.run.length - 1);

    auth(data)
      .unwrap()
      .then(res => {
        dispatch(setUser(res.userData));
        navigate('/');
      })
      .catch(err => {
        toast.error(t(err.data.message));
      });
  };

  const handlerClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main id="login-page">
      <div id="login-form">
        <img
          src={EALogo}
          alt="English Academy Logo"
        />
        <form onSubmit={handleSubmit(handlerLogin)}>
          <FloatLabelInput
            name="run"
            type="text"
            register={register}
            onChange={handlerRUNChange}
            value={run}
            maxLength={12}
          >
            <BiSolidUserCircle className="biSolidUserRectangle" />
          </FloatLabelInput>
          <FloatLabelInput
            name="password"
            type={showPassword ? 'text' : 'password'}
            register={register}
            maxLength={25}
          >
            <GrFormViewHide
              className={`grFormViewHide ${!showPassword ? 'show' : 'hide'}`}
              onClick={handlerClickShowPassword}
            />
            <GrFormView
              className={`grFormView ${showPassword ? 'show' : 'hide'}`}
              onClick={handlerClickShowPassword}
            />
          </FloatLabelInput>
          <button type="submit">{t('login')}</button>
        </form>
      </div>
    </main>
  );
}

export default Login;
