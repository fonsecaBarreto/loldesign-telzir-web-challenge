import axios, { AxiosInstance } from 'axios'
import { errorHandler } from './ApiErrorHandler';

export namespace ApiControllerType {
  export interface SendParams {  url: string,  method?: string, data?: any,  headers?: any }
}

export class ApiController {
  static baseApiUrl: string = process.env.REACT_APP_API_URL+"";
  private readonly _axios: AxiosInstance;
  
  constructor( base_entryPoint: string, base_url?: string,){
    var baseURL = base_url ?? ApiController.baseApiUrl ; //process.env.REACT_APP_API_URL+""; 
    this._axios = axios.create({ baseURL: baseURL +"/"+ base_entryPoint });
  }

  public async send( { url, method = "GET", data, headers }: ApiControllerType.SendParams ){
    try{
        const axiosPayload = { method, url: url, data }
        const result = await this._axios(axiosPayload)
        return result.data;
    } catch(error: any) { errorHandler(error) } 
  }
}

export default ApiController