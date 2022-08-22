import React from "react";
import { ChangeEvent } from "react"
import { BaseInputTypes } from "./Base";

export namespace NumberInputType {
  export interface Params extends BaseInputTypes.Params {}
}

export const NumberInput: React.FunctionComponent<NumberInputType.Params> = ({ 
  name, onChange, placeHolder, value=0, disabled=false }) =>{
    
  function handleChanges( e:any | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) { 
    onChange(name, e.target.value)
  }
    
  const common_props = {
    disabled, placeholder: placeHolder ?? "", onInput: handleChanges, value
  }
  return (
    <>
      <input { ...common_props } type={"number"}/>
    </>
  )
}

export default NumberInput