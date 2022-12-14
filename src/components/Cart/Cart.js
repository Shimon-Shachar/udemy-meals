import { useContext , useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout'


const Cart = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isOrderSent, setIsOrderSent] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  
	const orderButtonHandler = () => {
		setIsOpen(true);
	};
	
	const submitOrder = async (userData) => {
		setIsOrderSent(true)
		const response = await fetch('https://react-http2-66530-default-rtdb.firebaseio.com/orders.json', {
			method: 'POST', 
			body: JSON.stringify({
				user: userData,
				orderItems: cartCtx.items,
				totalPrice: cartCtx.totalAmount  
			}),
		})
		if (response.ok) {
			setIsSubmitted(true);
			setIsOrderSent(false);
			
		}
	}
  const cartItems = (
    <ul className={classes['cart-items']}>
    	{isSubmitted && <h3>Submitted!</h3>}
      {!isOrderSent && cartCtx.items.map((item) => (
       	<CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
	const modalActions = 
		<div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
         Close
      </button>
      {hasItems && <button className={classes.button} onClick={orderButtonHandler}>
      	Order
  		</button>}  
    </div>;
    
  return (
    <Modal onClose={props.onClose}>
      <div>
      	{cartItems}
     	  <div className={classes.total}>
        	<span>Total Amount</span>
        	<span>{totalAmount}</span>
      	</div>
      	{isOpen && <Checkout onConfirm={submitOrder} onCancel={props.onClose}/>}
      	{!isOpen && modalActions} 	
      </div>
      
    </Modal>
  );
};

export default Cart;
