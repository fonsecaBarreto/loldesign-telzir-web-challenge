import { validate } from 'class-validator';

const VALIDATON_OPTIONS = {
  validationError: {
    target: true,
    value: true,
  }, 
  forbidUnknownValues: true,
  stopAtFirstError: true,
}

export type AdapterErrors = Record<string, any>

export class ClassValidatorAdapter{

  public async validate(data: any): Promise<AdapterErrors | null> {
    
    const errors = await validate(data, VALIDATON_OPTIONS)
    if(errors.length == 0) return null
    const resolved: AdapterErrors ={}
    errors.map((e: any)=>{
      resolved[e.property] = Object.values(e.constraints)[0]
    })
    return resolved
  }
}