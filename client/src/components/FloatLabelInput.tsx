import { t } from 'i18next';
import { useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type inputType = 'number' | 'text' | 'email' | 'password'

type Register = UseFormRegister<FieldValues>;

interface InputComponentProps {
    name: string;
    type: inputType;
    register: Register;
    children?: React.ReactNode;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    maxLength?: number;
}

function FloatLabelInput({ name, type, register, children, onChange, value, maxLength }: InputComponentProps) {
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
                onChange={(e) => {
                    register(name).onChange(e);
                    if (onChange) {
                        onChange(e);
                    };
                }}
                onBlur={handleBlur}
                value={value}
                maxLength={maxLength}
            />
            {children}

        </fieldset>
    );
}

export default FloatLabelInput;