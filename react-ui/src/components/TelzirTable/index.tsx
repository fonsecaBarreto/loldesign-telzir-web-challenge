import { FranchisePlanEntity } from "@/domain/models/plan";
import { Simulation, SimulationRecord } from "@/domain/models/Simulation";
import { useMemo } from "react";
import "./styles.css"

export interface TelzirTableType {
  data: Simulation[]
}

export const TelzirTable: React.FunctionComponent<TelzirTableType> = ({ data }) =>{

  const records = useMemo<SimulationRecord[]>(()=>data.map(p=>p.toRecord()),[data])

  return (
    <>
      <div className="telzir-table">
        <div className="telzir-table-scroll">
          <table>

            <thead>
              <tr>
                <th>Origem</th>
                <th>Destino</th>
                <th>Tempo (min)</th>
                <th>PLano FaleMais</th>
                <th>Com FaleMais</th>
                <th>Sem FaleMais</th>
              </tr>
            </thead>
            <tbody>
              {
                records.map((data: SimulationRecord, i: number)=>(
                  <tr key={i} >
                    <td>{data.originCod}</td>
                    <td>{data.destinyCod}</td>
                    <td>{data.minutes}</td>
                    <td>{data.plan_label}</td>
                    <td>$ {data.result_plan.toFixed(2)}</td>
                    <td>$ {data.result_raw.toFixed(2)}</td>
                  </tr>
                ))
              } 
            </tbody>
            
          </table> 
        </div>
      </div>
    </>
  )
}


export default TelzirTable