import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const levels = [
    { level: 1, nombre: 'Principiante' },
    { level: 2, nombre: 'Intermedio' }
];
const formSchema = z.object({
    run: z.number().positive(),
    dv: z.string().max(1),
    name: z.string(),
    firstLastname: z.string(),
    secondLastname: z.string(),
    level: z.number()
});

type formType = z.infer<typeof formSchema>;

function FormNewStudent() {
    const { register, handleSubmit, formState: { errors } } = useForm<formType>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit: SubmitHandler<formType> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="number" placeholder='Run' {...register('run')} />
            <input type="number" placeholder='Digito verificador' {...register('dv')} />
            {errors.dv && <span>{errors.dv.message}</span>}
            <input type="text" placeholder='Nombre' {...register('name')} />
            <input type="text" placeholder='Primer apellido' {...register('firstLastname')} />
            <input type="text" placeholder='Segundo apellido' {...register('secondLastname')} />
            <select {...register('level')} >
                <option selected value="0">Elija el nivel académico correspondiente</option>
                {levels.map(level => (
                    <option key={level.nombre} value={level.level}>{level.nombre}</option>
                ))}
            </select>
            <button type="submit">Inscribir alumno</button>
        </form>
    )
}

export default FormNewStudent;