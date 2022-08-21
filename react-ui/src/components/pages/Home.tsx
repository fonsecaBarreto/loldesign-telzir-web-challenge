import { DestinyRegion, RegionEntity } from "@/domain/models/Region"
import { useEffect, useMemo, useState } from "react"
import FormGrid from "../controls/FormGrid"
import SelectBox from "../controls/Inputs/SelectInput"
import InputWrapper from "../controls/InputWrapper"
import MainLayout from "../layout/Main"


const ORIGINS = [
 { value:"11", label: "Sao paulo tal" },
 { value:"21", label: "Rio" },
 { value:"22", label: "outro" },
]

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
    return options.map((p:any)=>{
      return ({
        value: p.region.cod,
        label: p.region.name
      })
    })
  },[ options])

  return (

    <InputWrapper label="Selecione a região de destino" >
      <SelectBox 
        disabled={options.length == 0}
        name="destinyCod" 
        options={serializedOptions} 
        onChange ={onChange} 
        value={value}/>
    </InputWrapper>
  )

}

export const HomePage = () =>{

  const [ inputs, setInputs ] = useState<TelzirSimulacao.Inputs>(new TelzirSimulacao.Inputs)
  const [ selectedOrigin, setSelectedOrigin ] = useState<RegionEntity | null>(null)

  const handleChange = (name: string, payload: any) =>{

    switch(name){
      /* Quando a origem for alterada deve limprar os demais inputs */
      case "originCod": 
        setInputs((prev: any) => {
          return new TelzirSimulacao.Inputs({ [name]: payload.value });
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

  useEffect(()=>{
    /*  
      ! Quanndo hover altercação no originCode 
        - Deve ser feito um feetch para a api
    */
    if(!inputs.originCod) return setSelectedOrigin(null)
   
    
    setSelectedOrigin({
      cod: Number(inputs.originCod),
      name: "Noma da regiao selecioand",
      destinies: [
        {
          fare: 22,
          region: {
            cod: 33,
            name: "Alguma regiao",
            destinies:[],
          }
        }
      ]
    })
  
  },[inputs.originCod])

  return (<div>
    <MainLayout>
      <main>
        <h1> Simulação Telzir </h1>

        <FormGrid columns={[12, 12, 12]}>

          <InputWrapper label="Selecione a região de origem" >
            <SelectBox 
              name="originCod" 
              options={ORIGINS} 
              onChange ={handleChange} 
              value={inputs.originCod}/>
          </InputWrapper>

          <DestinySelectBox
            options={selectedOrigin?.destinies ?? []}
            onChange ={handleChange} 
            value={inputs.destinyCod}/>

          {/* <InputWrapper label="Selecione o plano" >
            <SelectBox 
              name="planId" 
              options={[]} 
              onChange ={handleChange} 
              value={inputs.planId}/>
          </InputWrapper> */}

          <button> Simular </button>
        </FormGrid>

        <span> 
          {JSON.stringify(inputs)}
          <br/>
          {JSON.stringify(selectedOrigin, null, 4)}
        </span>

      </main>
    </MainLayout>
  </div>)
}

export default HomePage