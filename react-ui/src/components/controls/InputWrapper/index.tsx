import React from 'react'
import './style.css'

export namespace InputWrapperType {
    export type Params = {
        children: React.ReactNode, 
        className?:string,
        error?:string, 
        label?:string, 
        fill?: boolean
    }
}

export const InputWrapper: React.FunctionComponent<InputWrapperType.Params> = ({children, label, error, className, fill=true })=> {
    return (
    <div className={`input-wrapper ${error ? "warning" : ''} ${fill ? "w100": ""} ${className} `}>
        { label ? <label>{label}</label> : <span/>} 
        {children}
        { error && <span className="form-error">
            {error}
        </span>
        }
    </div>)
}

export default InputWrapper