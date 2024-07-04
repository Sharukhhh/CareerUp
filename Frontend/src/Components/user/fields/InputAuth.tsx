import React from 'react'

interface InputAuthProps {
    labelName: string,
    type: string,
    name: string,
    placeholder: string,
    isNormalInput: boolean,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;

}

const InputAuth: React.FC<InputAuthProps> = ({labelName , type, name , value , onChange, placeholder , isNormalInput}) => {
  return (
    <div>
        <label htmlFor={labelName} className='block text-gray-700'>{labelName}</label>
        {isNormalInput ? (
            <>
                <input type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
                className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
            </>
        ) : (
            <>
                <select required name={name} value={value} onChange={onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
                className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                    <option value="Select your role">Choose a Role</option>
                    <option value="Company">Company</option>
                    <option value="Candidate">Candidate</option>
                </select>
            </>
        )}
    </div>
  )
}

export default InputAuth