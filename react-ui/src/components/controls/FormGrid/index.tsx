import React, { useEffect, useState } from "react";
import './style.css'

export type ColumnConfig = { sm: number, lg: number };
export namespace FormGridType {
    export type Params = {
        children: React.ReactNode,
        columns: { sm: number, lg: number }[] | number[],
        freeze?: boolean
    }
}

export const FormGrid: React.FunctionComponent<FormGridType.Params> = ({children, columns, freeze = false}) => {
  
    const [ cols, setCols ] = useState<ColumnConfig[]>([]);

    useEffect(()=>{
        if(!columns) return;
        const novo = columns.map((c,i)=>{
            if( typeof c === "number"){
                return { sm: 12, lg: c }
            }
            return c;
        })
        setCols(novo);
    },[columns])
    return (
        <div className={`form-panel ${freeze ? 'freeze' : ''}`}>
            <section className="form-panel-content">
                <div className="form-panel-grid">
                    { React.Children.map(children, (x,i) =>(<div className={`grid-row r-lg${ cols[i]?.lg ?? 12 } r-sm${cols[i]?.sm ?? 12}` }> {x} </div> ))}
                </div>
            </section>
        </div>
    )
}

export default FormGrid