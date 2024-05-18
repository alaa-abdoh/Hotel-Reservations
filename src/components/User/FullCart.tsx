import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../Context/CartProvider";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { showPopup } from "../ShowPopup";
import { Link } from "react-router-dom";

function FullCart() {
  const { cartItems } = useCart();
  const { removeFromCart } = useCart();
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  function deleteItem(id:number){
    showPopup(
        'Confirmation',
        'Are you sure you want to delete this room from your cart?',
        'question',
        true, "No"
    ).then((result) => {
        if (result.isConfirmed) {
            removeFromCart(id);
            showPopup("success", "The Room Deleted Successfully", "success", false)
        }
    });
  }

  return (
    <div className="fullCart">
      <div className="cartItems">
        {cartItems.map((item) => (
          <div key={item.roomId} className="cartItem">
            <img
              src={item.roomPhotoUrl}
              alt={item.roomType}
            />
            <div className="info">
              <p>{item.roomType}</p>
              <p>${item.price}</p>
              <button
                onClick={() => deleteItem(item.roomId)}
                className="delete-button"
              >
                <FontAwesomeIcon icon={faTrash} className="icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cartSummary">
        <h3>Cart Summary</h3>
        <p>Total: <span>${totalPrice}</span></p>
        <Link to="/home/cart/checkout" className="btn">Checkout</Link>
      </div>
    </div>
  );
}
export default FullCart;
