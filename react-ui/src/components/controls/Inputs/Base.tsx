export namespace BaseInputTypes {
  export interface Params {
      name: string,
      value: any,
      onChange: (name: string, value: any) => void,
      placeHolder?:string,
      disabled?: boolean
  }
}