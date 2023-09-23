import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType, z } from 'zod';
import { Trans, useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { useAddStudentMutation } from '../redux/services/studentsApi';
import { useState } from 'react';
import { RutFormat, deconstructRut, formatRut } from '@fdograph/rut-utilities';

const levels = [
    { level: 'A1', nombre: 'Básico A1' },
    { level: 'A2', nombre: 'Básico A2' },
    { level: 'B1', nombre: 'Intermedio B1' },
    { level: 'B2', nombre: 'Intermedio B2' },
    { level: 'C1', nombre: 'Avanzado C1' }
];

type Student = {
    run: number;
    dv: string;
    name: string;
    first_surname: string;
    second_surname: string;
    level: string;
};

const formSchema: ZodType<Student> = z.object({
    run: z.coerce.number().positive(),
    dv: z.string().max(1),
    name: z.string(),
    first_surname: z.string(),
    second_surname: z.string(),
    level: z.string().min(2).max(2)
});

type formType = z.infer<typeof formSchema>;

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
        console.log(data);
        addStudent({
            run: data.run,
            dv: data.dv,
            name: data.name,
            first_surname: data.first_surname,
            second_surname: data.second_surname,
            level: data.level
        }).unwrap()
            .then((payload) => console.log('fulfilled', payload))
            .catch((error) => console.error('rejected', error))
    };



    return (
        <>
            <h2><Trans>student_registration</Trans></h2>
            <form onSubmit={handleSubmit(onSubmit)} className='student-register'>
                <h3><Trans>rut_input</Trans></h3>
                <div className='run-input-container'>
                    <input type="text" placeholder='12345678-K' {...register('run')} onChange={handleRUTChange} value={rut} />
                    {errors.dv && <span>{errors.dv.message}</span>}
                </div>
                <h3><Trans>names_input</Trans></h3>
                <div className='name-input-container'>
                    <input type="text" placeholder={t('name')} {...register('name')} />
                    <input type="text" placeholder={t('first_surname')} {...register('first_surname')} />
                    <input type="text" placeholder={t('second_surname')} {...register('second_surname')} />
                </div>
                <select defaultValue='0' {...register('level')} >
                    <option value="0"><Trans>level_input</Trans></option>
                    {levels.map(level => (
                        <option key={level.nombre} value={level.level}>{level.nombre}</option>
                    ))}
                </select>
                <button type="submit"><Trans>register</Trans></button>
            </form>
        </>
    )
}

export default FormNewStudent;