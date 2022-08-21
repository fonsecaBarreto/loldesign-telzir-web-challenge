
import React, {useMemo } from 'react'
import './style.css'

export namespace PrimaryHeader {
    export type Params = {
        onChange?: any
    }
}

export const PrimaryHeaderComponent: React.FunctionComponent<PrimaryHeader.Params> =  ({ onChange })=> {
    return (
        <header className="primary-header-container">
            <div className="primary-header-content app-container">
               {/*  <section>
                  { goBack && 
                    <Link className='backwards-btn' to={goBack}> 
                       &#x2039;
                    </Link>
                    }
                  <span className='primary-header-title'>{ currentPage?.label }</span>
                </section>
                <section>
                    
                </section> */} 
            </div> 
        </header> 
    )
}

export default PrimaryHeaderComponent
