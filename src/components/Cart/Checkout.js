import { useRef , useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFive = value => value.trim().length === 5;

const Checkout = (props) => {
	const [validFields, setValidFields] = useState({
		name: true,
		street: true,
		postal: true,
		city: true,
	});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();
	
	const confirmHandler = event => {
		event.preventDefault();
		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostal = postalInputRef.current.value;
		const enteredCity = cityInputRef.current.value;
	
		
		const nameIsValid = !isEmpty(enteredName);
		const streetIsValid = !isEmpty(enteredStreet);
		const postalIsValid = isFive(enteredPostal);
		const cityIsValid = !isEmpty(enteredCity);
		
		setValidFields({
			name: nameIsValid,
			street: streetIsValid,
			postal: postalIsValid,
			city: cityIsValid 
		})
		
		const formIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;
		
		if (!formIsValid) {
			
			return;
		}
		//Submit cart data
	} 

	
		
	return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${validFields.street ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
      	{!validFields.name && <p className={classes['error-text']}>Name must be valid</p>}
      </div>
      <div className={`${classes.control} ${validFields.street ? '' : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
				{!validFields.street && <p className={classes['error-text']}>Steet name must be valid</p>}
      </div>
      <div className={`${classes.control} ${validFields.postal ? '' : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
      	{!validFields.postal && <p className={classes['error-text']}>Post Code must be 5 characters</p>}
      </div>
      <div className={`${classes.control} ${validFields.city ? '' : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
      	{!validFields.city && <p className={classes['error-text']}>Must be valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  ) 
}
export default Checkout;
