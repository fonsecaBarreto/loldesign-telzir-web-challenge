import { FranchisePlanEntity } from "./plan";

export type SimulationRecord = {
  originCod: string
  destinyCod: string;
  minutes: number;
  plan_label: string;
  result_raw: number;
  result_plan: number;
}

export class Simulation{

  originCod: string;
  destinyCod: string;
  minutes: number;
  fare: number;
  plan: FranchisePlanEntity;
 
  constructor( o: string, d: string, f: number, m: number, plan: FranchisePlanEntity ){
    this.originCod = o;
    this.destinyCod=d
    this.fare = f;
    this.minutes=m;
    this.plan= plan
  }

  toRecord(): SimulationRecord {
    const { originCod, destinyCod, minutes, plan } = this
    const result_raw = this.minutes * this.fare;
    var remain_minutes = (this.minutes - this.plan.franchiseMinutes) > 0 ? ( this.minutes - this.plan.franchiseMinutes) : 0
    const result_plan = remain_minutes * (this.fare * 1.1)
    return {
      originCod, 
      destinyCod, 
      minutes,
      plan_label: plan.label,
      result_plan,
      result_raw
    };
  }
}