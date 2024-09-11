import { priceFilterProps } from "../../../Types/app";


function PriceFilter(props: priceFilterProps) {
    return (
        <div className="priceFilter">
            <h4>Price</h4>
            <div>
                <label htmlFor="min" style={{fontWeight:"bold"}}>Min: </label>
                <span>${props.minPrice}</span>
                <input
                    id="min"
                    type="range"
                    min="50"
                    max={props.maxPrice-1}
                    value={props.minPrice}
                    onChange={(e: any) => props.setMinPrice(e.target.value)}
                />
            </div>    
            <div>
                <label htmlFor="max" style={{fontWeight:"bold"}}>Max: </label>
                <span>${props.maxPrice}</span>
                <input
                    id="max"
                    type="range"
                    min="50"
                    max="550"
                    value={props.maxPrice}
                    onChange={(e: any) => props.setMaxPrice(e.target.value)}
                />
            </div>
        </div>
    );
}
export default PriceFilter;
