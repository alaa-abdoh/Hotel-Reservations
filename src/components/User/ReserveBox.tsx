import { ReserveBoxProps } from "../../Types/app";
import ReserveBoxContent from "./ReserveBoxContent";

function ReserveBox(props: ReserveBoxProps){
    return(
        <div className="ReserveBox">
            {
                Object.entries(props.reserve).map(([peopleClassification, amount])=>{
                    return <ReserveBoxContent key={peopleClassification} peopleClassification= {peopleClassification} amount= {amount}/>
                })
            }
        </div>
    )
}
export default ReserveBox;