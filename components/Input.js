import React from 'react'

const Input = ({type, placeholder, name, label, id, onChange, onBlur, value}) => {
    return (
        <div>
            <div>
                <label htmlFor={id}>{label}</label>
                <input type={type} name={name} onChange={onChange} value={value} onBlur={onBlur} placeholder={placeholder}/>
            </div>
        </div>
    )
}

export default Input