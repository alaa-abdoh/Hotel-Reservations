import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { CalendarsProps } from '../../Types/app';

function Calendars(props:CalendarsProps){
    {console.log(props.startDate)}
    {console.log(props.endDate)}
    return(
        <div className="calendarContainer">
            <DatePicker selected={props.startDate} onChange={date => props.setStartDate(date)} />
            <DatePicker selected={props.endDate} onChange={date => props.setEndDate(date)} />
        </div>
    )
}
export default Calendars;