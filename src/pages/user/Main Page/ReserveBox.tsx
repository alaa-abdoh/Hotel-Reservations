import { useState } from "react";
import ReserveBoxContent from "./ReserveBoxContent";
import { Reserve, ReserveBoxProps } from "../../../Types/app";

function ReserveBox(props: ReserveBoxProps){
    function updateReserveAmount(classification: keyof Reserve, operation: "+" | "-"){
        const updatedReserve= {...props.reserve}
        if(operation === "+")
            updatedReserve[classification]+=1;
        else if (operation === "-" && updatedReserve[classification]!== 0 )
            updatedReserve[classification]-=1;
        props.setReserve(updatedReserve)
    }

    return(
        <div className="ReserveBox">
            {
                Object.entries(props.reserve).map(([peopleClassification, amount])=>{
                    return <ReserveBoxContent key={peopleClassification} peopleClassification= {peopleClassification} amount= {amount} updateReserveAmount={updateReserveAmount}/>
                })
            }
        </div>
    )
}
export default ReserveBox;