import { useCart } from "../../../Context/CartProvider"
import EmptyCart from "./EmptyCart";
import FullCart from "./FullCart";

function Cart(){
    const { cartItems } = useCart();

    return(
        <div className="cart">
            <div className="container">
                <h2 className="heading">Your Cart</h2>
                {
                    cartItems.length === 0 ? <EmptyCart/> : <FullCart/>
                }
            </div>
        </div>
    )
}
export default Cart;