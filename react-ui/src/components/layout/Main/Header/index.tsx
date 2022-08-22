
import React, {useMemo } from 'react'
import Logo from "@assets/logo.png"
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
				<div className='telzir-logo'>
						<img src={Logo}/> 
						<span> 
							<span> Telzir </span>
							FaleMais 
						</span>
				</div>
			</div> 
		</header> 
	)
}

export default PrimaryHeaderComponent
