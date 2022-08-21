
import React from 'react'
import './style.css'

export namespace IPrimaryContent {
    export type Params = {
      children: any
    }
}

export const PrimaryContent: React.FunctionComponent<IPrimaryContent.Params> =  ({ children })=> {
    return (
        <main className="app-container">
            <div className="primary-content-content">
                {children}
            </div> 
        </main> 
    )
}

export default PrimaryContent
