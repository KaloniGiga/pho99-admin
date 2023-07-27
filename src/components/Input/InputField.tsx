/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface InputFieldProps {
    inputValue: any,
    setInputValue: React.Dispatch<React.SetStateAction<any>>,
    name: string,
    textArea?: boolean,
    label: string,
    type: string,
    placeholder: string,
    client?: boolean,
}

const InputField = (props: InputFieldProps) => {
  const {
    inputValue,
    setInputValue,
    name,
    textArea,
    label,
    type,
    placeholder,
    client
  } = props;
  return (
    <div className={`${client ? "client-input-field" : ''} mb-[20px] mr-[10px] w-full`}>
      <div className="mb-[5px] text-white">{label}</div>
      {textArea ? (
        <textarea
         className="border-[1px] border-[rgba(255, 255, 255, 0.189)] rounded-[12px] outline-none p-[20px] w-full bg-transparent text-white"
          rows={4}
          value={inputValue[name]}
          onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => {
            setInputValue((prev)=>({...prev, [name]: e.target.value }));
          }}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="h-[40px] bg-transparent border-[1px] border-[rgba(255, 255, 255, 0.189)] rounded-[12px] outline-none p-[20px] w-full text-white"
          value={inputValue[name]}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            setInputValue((prev)=>({...prev, [name]: e.target.value }));
          }}
          type={type}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default InputField;
