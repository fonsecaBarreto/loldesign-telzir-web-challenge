export class ClientError {
  status?: number = 404
  name?: string ="UNEXPECTED"
  message: any = "Erro inesperado."
  constructor(fields?: Partial<ClientError>){
    Object.assign(this, fields)
  }

  public setMessage( msg: string ){
    this.message = msg
  }
}

export const errorHandler = (error: any) =>{

  if(process.env.NODE_ENV !== 'production'){
    console.log("** Error: ", {error})
  }

  var data: any = error?.response?.data;

  throw new ClientError({
    status: error?.response?.status,
    name: data?.error,
    message: ( error?.response?.status === 400 )? ( 
      resolveBadRequestErrors(data?.message ) 
    ):( data?.message )
  })

}

export const resolveBadRequestErrors =(message: Record<string, string>[] ): Record<string, string> =>{
  var result: any ={};
  if(!message || message.length == 0 ) return result;
  message.map((m)=>{
    var key: string = Object.keys(m)[0]
    result[key]=m[key]
  })
  return result;
}
