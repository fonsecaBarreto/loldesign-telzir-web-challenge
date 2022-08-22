import NumberInput from "@/components/controls/Inputs/NumberInput"
import { FranchisePlanEntity } from "@/domain/models/plan"
import { DestinyRegion } from "@/domain/models/Region"
import { useEffect, useMemo, useState } from "react"
import FormGrid from "../../controls/FormGrid"
import InputWrapper from "../../controls/InputWrapper"
import { DestinySelectBox, OriginSelectBox, PlanSelectBox } from "./customInputs"
import "./styles.css"
/* validation */
import { IsInt, Min, IsString, MinLength } from 'class-validator';
import { ClassValidatorAdapter } from "@/lib/vendors/ClassValidatorAdapter"

export namespace SimulationFormTypes {
  export type Props = {
    originRegions: DestinyRegion[],
    destinyRegions: DestinyRegion[],
    plans: FranchisePlanEntity[],
    onChange: any
  }
  export class Inputs {
    @IsString()
    @MinLength(1,{message: "Qual DDD de origem?"})
    originCod: string="";
    @IsString()
    @MinLength(1,{message: "Qual DDD de destino?"})
    destinyCod: string="";
    @IsString()
    @MinLength(1,{message: "Escolha um plano para continuar!"})
    planId: string="";
    
    @IsInt()
    @Min(1, {message: "Maior que 0, por favor!"})
    minutes: number=0;
    constructor(fields?: Partial<Inputs>){
      Object.assign(this, fields)
    }
  }
}

export const SimulationForm: React.FunctionComponent<SimulationFormTypes.Props> = (
  { onChange, originRegions, destinyRegions, plans }) => {

  const validator = useMemo(() => new ClassValidatorAdapter, [])
  const [ inputs, setInputs ] = useState<SimulationFormTypes.Inputs>(new SimulationFormTypes.Inputs)
  const [ errors, setErrors ] = useState<any>({})

  useEffect(()=>{ onChange("FETCH_REGION", inputs.originCod); },[inputs.originCod])

  const handleChange = (name: string, payload: any) =>{
    setInputs((prev: any) => ({ ...prev, [name]: payload }));
  }

  const submit = async () =>{
    var data = new SimulationFormTypes.Inputs(inputs)
    const errors = await validator.validate(data)
    setErrors(errors);
    if(!errors){ 
      onChange("SUBMIT", { ...inputs })
    } 
  }
  
  return (
  <div>
    <main>
      <FormGrid columns={[ 6, 6, 12, 12]}>
    
        <OriginSelectBox
          error={errors?.originCod}
          options={originRegions}
          onChange ={setInputs} 
          value={inputs.originCod}/> 

        <DestinySelectBox
          error={errors?.destinyCod}
          options={destinyRegions}
          onChange ={setInputs} 
          value={inputs.destinyCod}/>

        <PlanSelectBox
          error={errors?.planId}
          options={plans}
          onChange ={setInputs} 
          value={inputs.planId}/>

        <InputWrapper 
          label="Tempo (min)" 
          error={errors?.minutes}>
          <NumberInput 
            placeHolder="Selecione um plano de franquia se desejar"
            name="minutes" 
            onChange={handleChange} 
            value={inputs.minutes}/>
        </InputWrapper> 

      </FormGrid>
    </main>

    <footer className="form-grid-footer">
      <button 
        className="telzir-add-btn"
        onClick={submit}> &#43; Adicionar Simulação 
      </button>
    </footer>

  </div>)
}

export default SimulationForm
