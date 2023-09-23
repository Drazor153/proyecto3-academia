import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Trans, useTranslation } from 'react-i18next';
import { t } from 'i18next';

const levels = [
    { level: 1, nombre: 'Principiante' },
    { level: 2, nombre: 'Intermedio' }
];
const formSchema = z.object({
    run: z.number().positive(),
    dv: z.string().max(1),
    name: z.string(),
    first_surname: z.string(),
    second_surname: z.string(),
    level: z.number()
});

type formType = z.infer<typeof formSchema>;

function FormNewStudent() {
    useTranslation();

    const { register, handleSubmit, formState: { errors } } = useForm<formType>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit: SubmitHandler<formType> = (data) => {
        console.log(data);
    };

    return (
        <>
            <h2><Trans>student_registration</Trans></h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3><Trans>rut_input</Trans></h3>
                <div className='run-input-container'>
                    <input type="number" placeholder='Run' {...register('run')} />
                    <input type="number" placeholder={t('dv')} {...register('dv')} />
                    {errors.dv && <span>{errors.dv.message}</span>}
                </div>
                <h3><Trans>names_input</Trans></h3>
                <div className='name-input-container'>
                    <input type="text" placeholder={t('name')} {...register('name')} />
                    <input type="text" placeholder={t('first_surname')} {...register('first_surname')} />
                    <input type="text" placeholder={t('second_surname')} {...register('second_surname')} />
                </div>
                <select {...register('level')} >
                    <option selected value="0"><Trans>level_input</Trans></option>
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