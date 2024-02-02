import React from "react";
import { ReserveBoxContentProps } from "../../Types/app";

function ReserveBoxContent(props: ReserveBoxContentProps){
    return(
        <div>
                <span>{props.peopleClassification }</span>
                <div>
                    <button onClick={(e: React.MouseEvent<HTMLButtonElement>)=>{e.preventDefault();props.updateReserveAmount(props.peopleClassification,"-")}}>-</button>
                    <span>{props.amount}</span>
                    <button onClick={(e: React.MouseEvent<HTMLButtonElement>)=>{e.preventDefault();props.updateReserveAmount(props.peopleClassification,"+")}}>+</button>
                </div>
        </div>
    )
}
export default ReserveBoxContent;