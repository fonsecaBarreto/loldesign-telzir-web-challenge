import React, { useMemo } from "react";
import { ChangeEvent, useEffect, useState } from "react"
import { BaseInputTypes } from "./Base";

export namespace TextInputType {
  export interface Params extends BaseInputTypes.Params {
    type?: string
  }
}

export const TextInput: React.FunctionComponent<TextInputType.Params> = ({ 
  name,  onChange, type="text", placeHolder, value="", disabled=false }) =>{
    
  function handleChanges( e:any | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) { 
      onChange(name, e.target.value)
  }
    
  const common_props = {
    disabled, placeHolder: placeHolder ?? "", handleChanges, value
  }
  return (
    <>
      { type === "textarea" 
        ?( 
          <textarea { ...common_props } rows={3} cols={50}/>
        ):(
          <input { ...common_props } type={type}/>
        )
      }
    </>
  )
}

export default TextInput