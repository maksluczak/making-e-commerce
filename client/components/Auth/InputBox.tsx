import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
    type: string;
    id: string;
    label: string;
    placeholder: string;
    error?: FieldError;
    registration: UseFormRegisterReturn;
};

export default function InputBox({ type, id, label, placeholder, error, registration }: InputProps) {
    return (
        <div className="flex flex-col relative overflow-hidden mb-4">
            <label htmlFor={id} className="text-black uppercase text-sm mb-1">
                {label}:
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                {...registration}
                autoComplete=""
                className="block py-1 px-3 bg-transparent border border-black text-black text-base placeholder-gray-400 focus-within:outline-none"
            />
            {error && (
                <span className="text-red-400 text-xs mt-1 italic">
          {error.message}
        </span>
            )}
            <div className="absolute bottom-0 left-0 w-full h-px bg-white transform -translate-x-full peer-focus-within:translate-x-0 transition-transform"></div>
        </div>
    );
}
