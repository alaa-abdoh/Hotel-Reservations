import { ReserveBoxContentProps } from "../../Types/app";

function ReserveBoxContent(props: ReserveBoxContentProps){
    return(
        <div>
                <span>{props.peopleClassification }</span>
                <div>
                    <button>-</button>
                    <span>{props.amount}</span>
                    <button>+</button>
                </div>
        </div>
    )
}
export default ReserveBoxContent;