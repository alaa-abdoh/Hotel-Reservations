import { roomTypeFilterProps } from "../../Types/app";

function RoomTypeFilter(props: roomTypeFilterProps){
    function handleChange(event:any){
        const value = event.target.value;
        props.setSelectedRoomType(value);
    }
    
    return(
        <div className="roomFilter">
            <h4>Room Type</h4>
            <div>
                <div>
                    <input type="radio" id="All" value="" name="roomType" onChange={handleChange} checked={props.selectedRoomType === ''} />
                    <label htmlFor="All">Any Type</label>
                </div>
                <div>
                    <input type="radio" id="Ocean View" value="Ocean View" name="roomType" onChange={handleChange} checked={props.selectedRoomType === 'Ocean View'} />
                    <label htmlFor="Ocean View">Ocean View</label>
                </div>
                <div>
                    <input type="radio" id="Cabin" value="Cabin" name="roomType" onChange={handleChange} checked={props.selectedRoomType === 'Cabin'} />
                    <label htmlFor="Cabin">Cabin</label>
                </div>
                <div>
                    <input type="radio" id="Standard" value="Standard" name="roomType" onChange={handleChange} checked={props.selectedRoomType === 'Standard'}/>
                    <label htmlFor="Standard">Standard</label>
                </div>
                <div>
                    <input type="radio" id="King Suite" value="King Suite" name="roomType" onChange={handleChange} checked={props.selectedRoomType === 'King Suite'} />
                    <label htmlFor="King Suite">King Suite</label>
                </div>
                <div>
                    <input type="radio" id="Double" value="Double" name="roomType" onChange={handleChange} />
                    <label htmlFor="Double">Double</label>
                </div>
            </div>
        </div>
    )
}
export default RoomTypeFilter;