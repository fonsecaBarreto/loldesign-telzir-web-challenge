import SelectBox from "@/components/controls/Inputs/SelectInput"
import InputWrapper from "@/components/controls/InputWrapper"
import { useMemo } from "react"

export const DestinySelectBox: React.FunctionComponent<any> = ({ options, onChange, value, error }) =>{

  const handleChange = (name: string, payload: any) =>{
    onChange((prev: any) => {
      return {...prev, [name]: payload.value }
    })
  }
  const serializedOptions = useMemo(()=>{
    return options.map((p:any)=>({ 
      value: p.region.cod, 
      label: `(${p.region.cod}) ${p.region.name}`
    }))
  },[options])

  return (
    <InputWrapper
      error={error}
      label="Região de destino" >
      <SelectBox 
        placeHolder="Selecione o DDD de destino"
        disabled={options.length == 0}
        name="destinyCod" 
        options={serializedOptions} 
        onChange ={handleChange} 
        value={value}/>
    </InputWrapper>
  )
}

export const OriginSelectBox: React.FunctionComponent<any> = ({ options, onChange, value, error }) =>{

  const handleChange = (name: string, payload: any) =>{
    onChange((prev: any) => {
      return ( { ...prev, destinyCod: "", [name]: payload.value, });
    });
  }

  const serializedOptions = useMemo(()=>{
    return options.map((region:any)=>({ 
      value: region.cod, 
      label: `(${region.cod}) ${region.name}`
    }))
  },[ options])

  return (
    <InputWrapper 
      error={error}
      label="Região de origem" >
      <SelectBox 
        placeHolder="Selecione o DDD de origem"
        disabled={options.length == 0}
        name="originCod" 
        options={serializedOptions} 
        onChange ={handleChange} 
        value={value}/>
    </InputWrapper>
  )

}

export const PlanSelectBox: React.FunctionComponent<any> = ({ options, onChange, value, error }) =>{

  const handleChange = (name: string, payload: any) =>{
    onChange((prev: any) => {
      return ( { ...prev, [name]: payload.value, });
    });
  }

  const serializedOptions = useMemo(()=>{
    return options.map((plan:any)=>({ 
      value: plan.id, 
      label: `${plan.label}`
    }))
  },[ options])

  return (
    <InputWrapper 
      error={error}
      label="Planos" >
      <SelectBox 
        placeHolder="Selecione um plano de franquia se desejar"
        disabled={options.length == 0}
        name="planId" 
        options={serializedOptions} 
        onChange ={handleChange} 
        value={value}/>
    </InputWrapper>
  )
}