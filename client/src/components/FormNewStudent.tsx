import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType, z } from 'zod';
import { Trans, useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { useAddStudentMutation } from '../redux/services/studentsApi';
import { useState } from 'react';
import { RutFormat, deconstructRut, formatRut } from '@fdograph/rut-utilities';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import FloatLabelInput from './FloatLabelInput';

const levels = [
    { level: 'A1', nombre: 'Básico A1' },
    { level: 'A2', nombre: 'Básico A2' },
    { level: 'B1', nombre: 'Intermedio B1' },
    { level: 'B2', nombre: 'Intermedio B2' },
    { level: 'C1', nombre: 'Avanzado C1' }
];

type Student = {
    run: string;
    name: string;
    first_surname: string;
    second_surname: string;
    level: string;
};

const formSchema: ZodType<Student> = z.object({
    run: z.string(),
    name: z.string(),
    first_surname: z.string(),
    second_surname: z.string(),
    level: z.string().min(2).max(2)
});

type formType = z.infer<typeof formSchema>;

type Response = {
    errorMsg: [] | string,
    errorType: string
}

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
    }
}

function FormNewStudent() {
    const [rut, setRut] = useState('');
    useTranslation();

    const handleRUTChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRUT = event.target.value;
        const cleanRUT = newRUT.replace(/[^0-9kK]/g, '').toUpperCase();
        setRut(formatRut(cleanRUT, RutFormat.DOTS_DASH));
    };

    const [addStudent] = useAddStudentMutation()

    const { register, handleSubmit, formState: { errors } } = useForm<formType>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit: SubmitHandler<formType> = (data) => {
        const { digits, verifier } = deconstructRut(data.run);

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
                    <h3><Trans>rut_input</Trans></h3>
                    <div className='run-input-container'>
                        <fieldset className='float-label-field'>
                            <input type="text" {...register('run')} onChange={handleRUTChange} value={rut} />
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
                    <select defaultValue='0' {...register('level')} >
                        <option value="0"><Trans>no_input</Trans></option>
                        {levels.map(level => (
                            <option key={level.nombre} value={level.level}>{level.nombre}</option>
                        ))}
                    </select>
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