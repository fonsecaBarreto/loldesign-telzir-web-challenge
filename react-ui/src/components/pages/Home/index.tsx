import { RegionEntity } from "@/domain/models/Region"
import PlansApiController from "@/lib/PlansApi"
import RegionsApiController from "@/lib/RegionsApi"
import { useEffect, useMemo, useState } from "react"
import FormGrid from "../../controls/FormGrid"
import SelectBox from "../../controls/Inputs/SelectInput"
import InputWrapper from "../../controls/InputWrapper"
import MainLayout from "../../layout/Main"
import "./styles.css"
export namespace TelzirSimulacao {
  export class Inputs {
    originCod: string=""
    destinyCod: string=""
    planId: string=""
    constructor(fields?: Partial<Inputs>){
      Object.assign(this, fields)
    }
  }
}

export const DestinySelectBox: React.FunctionComponent<any> = ({ options, onChange, value }) =>{

  const serializedOptions = useMemo(()=>{
    return options.map((p:any)=>({ value: p.region.cod, label: p.region.name }))
  },[options])

  return (
    <InputWrapper label="Região de destino" >
      <SelectBox 
        placeHolder="Selecione o DDD de destino"
        disabled={options.length == 0}
        name="destinyCod" 
        options={serializedOptions} 
        onChange ={onChange} 
        value={value}/>
    </InputWrapper>
  )
}

export const OriginSelectBox: React.FunctionComponent<any> = ({ options, onChange, value }) =>{

  const serializedOptions = useMemo(()=>{
    return options.map((region:any)=>({ value: region.cod, label: region.name}))
  },[ options])

  return (
    <InputWrapper label="Região de origem" >
      <SelectBox 
        placeHolder="Selecione o DDD de origem"
        disabled={options.length == 0}
        name="originCod" 
        options={serializedOptions} 
        onChange ={onChange} 
        value={value}/>
    </InputWrapper>
  )

}

export const HomePage = () =>{
  const [ plans, setPlans ] = useState([])
  const [ regions, setRegions ] = useState([])
  const [ inputs, setInputs ] = useState<TelzirSimulacao.Inputs>(new TelzirSimulacao.Inputs)
  const [ selectedOrigin, setSelectedOrigin ] = useState<RegionEntity | null>(null)
  const api = useMemo(()=>new RegionsApiController(),[])
  const plansApi = useMemo(()=>new PlansApiController(),[])

  /* Fetch Regions and plans on load */
  useEffect(()=>{ 
    api.getRegions().then(setRegions); 
    plansApi.getPlans().then(setPlans)
  },[])

  /* After a region is slected it should fetch region by cod */
  useEffect(()=>{
    if(!inputs.originCod) return setSelectedOrigin(null)
    api.getRegionByCod(Number(inputs.originCod))
      .then(setSelectedOrigin);
  },[inputs.originCod])

  const handleChange = (name: string, payload: any) =>{

    switch(name){
      /* Quando a origem for alterada deve limpar a região de destino*/
      case "originCod": 
        setInputs((prev: any) => {
          return ( { ...prev, destinyCod: "", [name]: payload.value, });
        });
      break;
      /* Do contratio sera alterando somente o valor da mesma */
      default:
        setInputs((prev: any) => {
          return {...prev, [name]: payload.value }
        })
      break;
    }
  }


  return (
  <div>
    <MainLayout>
      <main>
        <h1> Simulação Telzir </h1>

        <FormGrid columns={[12, 12, 12]}>
       
          <OriginSelectBox
            options={regions}
            onChange ={handleChange} 
            value={inputs.originCod}/> 

          <DestinySelectBox
            options={selectedOrigin?.destinies ?? []}
            onChange ={handleChange} 
            value={inputs.destinyCod}/>

          <InputWrapper label="Planos" >
            <SelectBox 
              placeHolder="Selecione um plano de franquia se desejar"
              name="planId" 
              options={plans} 
              onChange ={handleChange} 
              value={inputs.planId}/>
          </InputWrapper>

          <div>
            <button className="telzir-add-btn"> Simular </button>
          </div>

        </FormGrid>

      </main>
    </MainLayout>
  </div>)
}

export default HomePage