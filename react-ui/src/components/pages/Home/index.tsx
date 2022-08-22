import { SimulationForm } from "@/components/forms/SimulationForm"
import TelzirTable from "@/components/TelzirTable"
import { FranchisePlanEntity } from "@/domain/models/plan"
import { DestinyRegion, RegionEntity } from "@/domain/models/Region"
import { Simulation } from "@/domain/models/Simulation"
import PlansApiController from "@/lib/api/PlansApi"
import RegionsApiController from "@/lib/api/RegionsApi"
import { useEffect, useMemo, useState } from "react"
import MainLayout from "../../layout/Main"
import "./styles.css"

export const HomePage = () => {

  const api = useMemo(()=>new RegionsApiController(),[])
  const plansApi = useMemo(()=>new PlansApiController(),[])
  const [ plans, setPlans ] = useState<FranchisePlanEntity[]>([])
  const [ regions, setRegions ] = useState<DestinyRegion[]>([])
  
  /* result_data */
  const [ selectedOrigin, setSelectedOrigin ] = useState<RegionEntity | null>(null);
  const [ simulations, setSimulations ] = useState<Simulation[]>([]);

  /* Fetch Regions and plans on load */
  useEffect(()=>{ 
    api.getRegions().then(setRegions); 
    plansApi.getPlans().then(setPlans)
  },[])

  const handleChange = (key: string, payload?: any) =>{
    switch(key){
      case "FETCH_REGION":
        if(!payload) return setSelectedOrigin(null);
        api.getRegionByCod(Number(payload))
          .then(setSelectedOrigin);
      break;
      case "SUBMIT":

        const { originCod, destinyCod, minutes, planId } = payload;

        const { fare }: any = selectedOrigin?.destinies.find((r: any)=>{
          return (r.region.cod == destinyCod)
        })
  
        const plan: any = plans.find((plan: FranchisePlanEntity)=>{
          return (plan.id ==  Number(planId) )
        })
        
        const result = new Simulation( originCod, destinyCod, fare, minutes, plan);
        
        setSimulations((prev) => {
          return ([ ...prev, result])
        })
    
      break;
    }
  }

  /*  Should show load page before load content from api */
  return (
  <div id="home-page">
    <MainLayout>
      <main>
        <h1> Simulação Planos FaleMais </h1>
        <SimulationForm 
          onChange={handleChange}
          originRegions={regions} 
          destinyRegions={selectedOrigin?.destinies ?? []}
          plans={plans}/>
        <TelzirTable data={simulations}/> 
      </main>
    </MainLayout>
  </div>)
}

export default HomePage