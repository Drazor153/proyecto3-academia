import { t } from 'i18next';
import { useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type inputType = 'number' | 'text' | 'email'

type Register = UseFormRegister<FieldValues>;

interface InputComponentProps {
    name: string;
    type: inputType;
    register: Register;
}

function FloatLabelInput({ name, type, register }: InputComponentProps) {
    useTranslation();

    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
        setHasValue(true);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        if (!event.target.value) {
            setHasValue(false);
        }
    };

    return (
        <fieldset className={`float-label-field ${isFocused || hasValue ? 'float focus' : ''}`}>
            <label htmlFor={`${name}Input`} >{t(name)}</label>
            <input
                id={`${name}Input`}
                type={type}
                onFocus={handleFocus}
                {...register(name)}
                onBlur={handleBlur}
            />

        </fieldset>
    );
}

export default FloatLabelInput;