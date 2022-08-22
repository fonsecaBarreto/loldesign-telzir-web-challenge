
import  ApiController from "./base/ApiController"


export class PlansApiController extends ApiController {
  constructor(){ super("plans") }
  async getPlans(){
    const result = await this.send({ url:`` }) 
    return result
  }
}

export default PlansApiController
