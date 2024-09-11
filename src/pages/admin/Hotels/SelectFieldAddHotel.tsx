import { SelectFieldProps } from "../../../Types/app";

function SelectFieldAddHotel(props:SelectFieldProps){
    return(
        <div className="main" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <label htmlFor={props.name}>{props.label}</label>
        <select id={props.name} name={props.name} value={props.value} onChange={props.onChange}>
            <optgroup label={props.label}>
                {props.options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </optgroup>
        </select>
        </div>
    )
}
export default SelectFieldAddHotel;