
import  ApiController from "./base/ApiController"


export class RegionsApiController extends ApiController {
  constructor(){ super("regions") }
  async getRegions(){
    const result = await this.send({ url:`` }) 
    return result
  }
  async getRegionByCod( regionCod: number ){
    const result = await this.send({ url:`/${regionCod}` }) 
    return result
  }
}

export default RegionsApiController
