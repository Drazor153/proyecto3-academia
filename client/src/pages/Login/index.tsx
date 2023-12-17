import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { t } from 'i18next';
import FloatLabelInput from '../../components/FloatLabelInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType, z } from 'zod';
import { BiSolidUserCircle } from 'react-icons/bi';
import { GrFormViewHide, GrFormView } from 'react-icons/gr';
import { useEffect, useRef, useState } from 'react';
import { RutFormat, formatRut, validateRut } from '@fdograph/rut-utilities';
import { toast } from 'react-toastify';
import { useAuthUserMutation } from '../../redux/services/userApi';
import { setUser } from '../../redux/features/userSlice';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

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

	const imgRef = useRef<HTMLImageElement>(null);

	const [animate, setAnimate] = useState<{
		x?: number;
		y?: number;
		width?: number;
		height?: number;
	}>({ x: 0, y: 0 });

	const animPlayed = localStorage.getItem('animPlayed');

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

	useEffect(() => {
		if (!animPlayed && imgRef.current) {
			const { y, width, height } = imgRef.current.getBoundingClientRect();
			console.log(y, width, height);
			setAnimate({
				y: -y + 30,
				width,
				height,
			});
			localStorage.setItem('animPlayed', 'true');
		}
	}, []);

	return (
		<main id='login-page'>
			<AnimatePresence>
				{!animPlayed && (
					<motion.img
						key='entry'
						src='/images/entry.png'
						style={{
							marginBlock: '20px',
							position: 'absolute',
							transform: 'translate(-50%, -50%)',
							zIndex: 2,
							filter: 'drop-shadow(0px 0px 10px #000000)',
						}}
						alt='English Academy Logo'
						animate={{
							...animate,
							filter: 'drop-shadow(0px 0px 5px #000000)',
						}}
						transition={{
							delay: 2,
							ease: 'anticipate',
						}}
					/>
				)}
				<motion.div
					key='login'
					id='login-form'
					initial={{ opacity: animPlayed ? 1 : 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 2 }}
				>
					<img
						ref={imgRef}
						src={'/images/entry_static.png'}
						alt='English Academy Logo'
						style={{
							height: '150px',
							opacity: animPlayed ? 1 : 0,
							visibility: animPlayed ? 'visible' : 'hidden',
							filter: 'drop-shadow(0px 0px 5px #000000)',
						}}
					/>
					<form onSubmit={handleSubmit(handlerLogin)}>
						<FloatLabelInput
							name='run'
							type='text'
							register={register}
							onChange={handlerRUNChange}
							value={run}
							maxLength={12}
							autocomplete='on'
						>
							<BiSolidUserCircle className='biSolidUserRectangle' />
						</FloatLabelInput>
						<FloatLabelInput
							name='password'
							type={showPassword ? 'text' : 'password'}
							register={register}
							maxLength={25}
							autocomplete='off'
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
						<button type='submit'>{t('login')}</button>
					</form>
				</motion.div>
			</AnimatePresence>
		</main>
	);
}

export default Login;
