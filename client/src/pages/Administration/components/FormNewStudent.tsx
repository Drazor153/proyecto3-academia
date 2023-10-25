import {
	type SubmitHandler,
	useForm,
	Controller,
	Control,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType, z } from 'zod';
import { t } from 'i18next';
import { useAddStudentMutation } from '../../../redux/services/studentsApi';
import { useState } from 'react';
import {
	RutFormat,
	deconstructRut,
	formatRut,
	validateRut,
} from '@fdograph/rut-utilities';
import { toast } from 'react-toastify';
import FloatLabelInput from '../../../components/FloatLabelInput';
import { useGetLevelsQuery } from '../../../redux/services/levelsApi';
import { ThreeDots } from 'react-loading-icons';
import { Student } from '../../../utils/types';
import Select from 'react-select';

const formSchema: ZodType<Student> = z.object({
	run: z.string().min(9).max(12),
	name: z.string().min(1),
	first_surname: z.string().min(1),
	level: z.string().min(2).max(2),
});

type formType = z.infer<typeof formSchema>;

type Response =
	| { errorMsg: { msg: string }[]; errorType: 'invalidFields' }
	| { errorMsg: string; errorType: 'msg' };

type ServerResponse = { status: number; data: Response; message: string };

function LevelsSelect({ control }: { control: Control<Student> }) {
	const {
		data: response,
		isLoading,
		isFetching,
		isError,
	} = useGetLevelsQuery(null);

	if (isLoading || isFetching) {
		return <ThreeDots fill="#2F4858" />;
	}

	if (isError) {
		return <p>{t('error_loading_data')}</p>;
	}

	if (!response) {
		return <p>{t('no_data')}</p>;
	}

	const levels = response.data;

	const levelsOptions = levels.map(level => ({
		value: level.code,
		label: t(level.name),
	}));

	return (
		<Controller
			name="level"
			control={control}
			render={({ field: { onChange } }) => (
				<Select
					placeholder={t('level_select')}
					options={levelsOptions}
					onChange={val => onChange(val?.value)}
					className="react-select-container"
					classNamePrefix="react-select"
				/>
			)}
		/>
	);
}

function FormNewStudent() {
	const [run, setRun] = useState('');

	const handleRUNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newRUN = event.target.value;
		const cleanRUN = newRUN.replace(/[^0-9kK]/g, '').toUpperCase();
		setRun(formatRut(cleanRUN, RutFormat.DOTS_DASH));
	};

	const [addStudent] = useAddStudentMutation();

	const { register, control, handleSubmit, reset } = useForm<formType>({
		resolver: zodResolver(formSchema),
	});

	const handleSuccessMsg = (payload: ServerResponse) => {
		toast.success(payload.message);
		setRun('');
		reset();
	};

	const handleErrorMsg = (error: ServerResponse) => {
		switch (error.data.errorType) {
			case 'invalidFields':
				toast.error(t(error.data.errorMsg[0].msg));
				break;
			case 'msg':
				toast.error(t(error.data.errorMsg));
				break;
		}
	};

	const onSubmit: SubmitHandler<formType> = data => {
		if (!validateRut(String(data.run))) return toast.error(t('invalid_run'));

		const { digits, verifier } = deconstructRut(String(data.run));

		addStudent({
			run: parseInt(digits),
			dv: verifier,
			name: data.name,
			first_surname: data.first_surname,
			level: data.level,
		})
			.unwrap()
			.then(payload => handleSuccessMsg(payload))
			.catch(error => handleErrorMsg(error));
	};

	const onError = () => {
		toast.error(t('invalid_field'));
	};

	return (
		<>
			<h2>{t('student_registration')}</h2>
			<form
				onSubmit={handleSubmit(onSubmit, onError)}
				className="student-register"
			>
				<div className="input-section">
					<h3>{t('run_input')}</h3>
					<div className="run-input-container">
						<fieldset className="float-label-field">
							<input
								type="text"
								{...register('run')}
								onChange={handleRUNChange}
								value={run}
								placeholder="Ej. 12.345.678-9"
							/>
						</fieldset>
					</div>
				</div>
				<div className="input-section">
					<h3>{t('names_input')}</h3>
					<div className="name-input-container">
						<FloatLabelInput
							name="name"
							type="text"
							register={register}
						/>
						<FloatLabelInput
							name="first_surname"
							type="text"
							register={register}
						/>
					</div>
				</div>
				<div className="input-section">
					<h3>{t('level_input')}</h3>

					<LevelsSelect control={control} />
				</div>
				<div className="submit-btn">
					<button type="submit">{t('register')}</button>
				</div>
			</form>
		</>
	);
}

export default FormNewStudent;
