import { Link } from "react-router-dom";

function EmptyCart(){
    return (
        <div className="emptyCart">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8vxcXbyvy5JHHV_7wMO_HQv-j6aZxX0I5MA&s" alt="Empty Cart" className="empty-cart-image" />
          <h2>Your Cart is <span>Empty!</span></h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <p>Explore our rooms and start adding items to your cart!</p>
          <Link to="/home" className="btn">Explore Hotels</Link>
        </div>
      );
}
export default EmptyCart;