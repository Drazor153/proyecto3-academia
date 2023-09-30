import { type SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType, z } from 'zod';
import { Trans, useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { useAddStudentMutation } from '../redux/services/studentsApi';
import { useState } from 'react';
import { RutFormat, deconstructRut, formatRut } from '@fdograph/rut-utilities';
import { ToastContainer, toast } from 'react-toastify';
import FloatLabelInput from './FloatLabelInput';
import { useGetLevelsQuery } from '../redux/services/levelsApi';
import { ThreeDots } from 'react-loading-icons'
import { Level, Student } from '../utils/types';

const formSchema: ZodType<Student> = z.object({
    run: z.string(),
    name: z.string(),
    first_surname: z.string(),
    second_surname: z.string(),
    level: z.string().min(2).max(2)
});

type formType = z.infer<typeof formSchema>;

type Response = {
    errorMsg: { msg: string; }[],
    errorType: 'invalidFields';
} | {
    errorMsg: string,
    errorType: 'msg';
};

type ServerResponse = { status: number, data: Response, message: string }

function handleSuccessMsg(payload: ServerResponse) {
    toast.success(payload.message)

}

function handleErrorMsg(error: ServerResponse) {
    switch (error.data.errorType) {
        case 'invalidFields':
            toast.error(t(error.data.errorMsg[0].msg));
            break;
        case 'msg':
            toast.error(t(error.data.errorMsg));
            break;
    }
}

function LevelsSelect(register: UseFormRegister<Student>) {
    const { data: response, isLoading, isFetching, isError } = useGetLevelsQuery(null);

    if (isLoading || isFetching) {
        return (<ThreeDots fill='#2F4858' />);
    }

    if (isError) {
        return (<p>{t('error_loading_data')}</p>);
    }

    if (!response) {
        return (<p>{t('no_data')}</p>);
    }

    const levels: Level[] = response.data;

    return (
        <select defaultValue='0' {...register('level')}>
            {levels.map((level: Level) => (
                <option key={level.code} value={level.code}>{level.name} {level.code}</option>
            ))}
        </select>
    );
}

function FormNewStudent() {
    const [run, setRun] = useState('');
    useTranslation();

    const handleRUNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRUN = event.target.value;
        const cleanRUN = newRUN.replace(/[^0-9kK]/g, '').toUpperCase();
        setRun(formatRut(cleanRUN, RutFormat.DOTS_DASH));
    };

    const [addStudent] = useAddStudentMutation()

    const { register, handleSubmit } = useForm<formType>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit: SubmitHandler<formType> = (data) => {
        const { digits, verifier } = deconstructRut(String(data.run));

        addStudent({
            run: parseInt(digits),
            dv: verifier,
            name: data.name,
            first_surname: data.first_surname,
            second_surname: data.second_surname,
            level: data.level
        }).unwrap()
            .then((payload) => handleSuccessMsg(payload))
            .catch((error) => handleErrorMsg(error));
    };

    return (
        <>
            <h2><Trans>student_registration</Trans></h2>
            <form onSubmit={handleSubmit(onSubmit)} className='student-register'>
                <div className='input-section'>
                    <h3><Trans>run_input</Trans></h3>
                    <div className='run-input-container'>
                        <fieldset className='float-label-field'>
                            <input type="text" {...register('run')} onChange={handleRUNChange} value={run} />
                        </fieldset>
                    </div>
                </div>
                <div className='input-section'>
                    <h3><Trans>names_input</Trans></h3>
                    <div className='name-input-container'>
                        <FloatLabelInput name='name' type='text' register={register} />
                        <FloatLabelInput name='first_surname' type='text' register={register} />
                        <FloatLabelInput name='second_surname' type='text' register={register} />

                    </div>
                </div>
                <div className='input-section'>
                    <h3><Trans>level_input</Trans></h3>

                    {LevelsSelect(register)}
                </div>
                <div className='submit-btn'>
                    <button type="submit"><Trans>register</Trans></button>
                </div>
            </form>
            <ToastContainer />
        </>
    )
}

export default FormNewStudent;