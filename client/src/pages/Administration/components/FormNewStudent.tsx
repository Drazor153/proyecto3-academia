import { type SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType, z } from 'zod';
import { Trans, useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { useAddStudentMutation } from '../../../redux/services/studentsApi';
import { useState } from 'react';
import { RutFormat, deconstructRut, formatRut, validateRut } from '@fdograph/rut-utilities';
import { toast } from 'react-toastify';
import FloatLabelInput from '../../../components/FloatLabelInput';
import { useGetLevelsQuery } from '../../../redux/services/levelsApi';
import { ThreeDots } from 'react-loading-icons'
import { LevelInfo, Student } from '../../../utils/types';

const formSchema: ZodType<Student> = z.object({
    run: z.string().max(12),
    name: z.string(),
    first_surname: z.string(),
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

    const levels = response.data;

    return (
        <select defaultValue='0' {...register('level')}>
            {levels.map((level: LevelInfo) => (
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

    const { register, handleSubmit, reset } = useForm<formType>({
        resolver: zodResolver(formSchema)
    });


    const handleSuccessMsg = (payload: ServerResponse) => {
        toast.success(payload.message)
        setRun('')
        reset()
    }

    const handleErrorMsg = (error: ServerResponse) => {
        switch (error.data.errorType) {
            case 'invalidFields':
                toast.error(t(error.data.errorMsg[0].msg));
                break;
            case 'msg':
                toast.error(t(error.data.errorMsg));
                break;
        }
    }

    const onSubmit: SubmitHandler<formType> = (data) => {
        if (!validateRut(String(data.run))) return toast.error(t('invalid_run'))

        const { digits, verifier } = deconstructRut(String(data.run));

        addStudent({
            run: parseInt(digits),
            dv: verifier,
            name: data.name,
            first_surname: data.first_surname,
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
                            <input type="text" {...register('run')} onChange={handleRUNChange} value={run} placeholder='Ej. 12.345.678-9' />
                        </fieldset>
                    </div>
                </div>
                <div className='input-section'>
                    <h3><Trans>names_input</Trans></h3>
                    <div className='name-input-container'>
                        <FloatLabelInput name='name' type='text' register={register} />
                        <FloatLabelInput name='first_surname' type='text' register={register} />
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
        </>
    )
}

export default FormNewStudent;