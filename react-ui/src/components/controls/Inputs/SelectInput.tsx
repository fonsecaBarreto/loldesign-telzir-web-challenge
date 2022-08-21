import React, { ChangeEvent, useEffect, useState } from "react"
import { BaseInputTypes } from "./Base"

export namespace SelectBoxType {
	export type Option ={ label: string, value: string }
	export interface Params extends BaseInputTypes.Params {
		allowEmpty?: boolean,
		options: Option[],
		onChange: (name: string, value: Option ) => void,
	}
}

export const SelectBox: React.FunctionComponent<SelectBoxType.Params> = ({ 
	name, options, onChange, placeHolder, disabled=false, allowEmpty=true, value="" }) =>{

	const [ observable, setObservable] = useState<SelectBoxType.Option[]>([])

	useEffect(()=>{
		const novo: any[] = options.map((v,i)=> v);
		if(allowEmpty){
				setObservable([{ 
						value: "", 
						label: placeHolder ??  "Nenhum Item Selecionado " 
				}, ...novo]);

		}else{
				setObservable([ ...novo]);
		}
	},[options])
	
	const handleInput = ( e:ChangeEvent<HTMLSelectElement> ) =>{
		onChange(name, { value: e.target.value, label: observable[e.target.options.selectedIndex].label }) 
	}

	return (
		<>
			<select disabled={ disabled } value={ value } onChange={handleInput}>
				{ 
					observable.map((u,i)=>( <option value={u.value} key={i}>{u.label}</option> )) 
				}
			</select>
		</>
	)
}


export default SelectBox