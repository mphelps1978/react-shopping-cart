import React, { useState, useContext, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import {useLocalStorage} from './hooks/useLocalStorage'

//Contexts
import {ProductContext} from './contexts/ProductContext';
import {CartContext} from './contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState(() => {
    const item = window.localStorage.getItem('cart');
    return item ? JSON.parse(item) : [];
  });

	const addItem = item => {
		setCart([...cart, item]);
	};

	const removeItem = id => {
		setCart(cart.filter(item => item.id !== id));
	}

	useEffect(() => window.localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

	return (
		<div className="App">



			{/* Routes */}
			<ProductContext.Provider value={{products, addItem}}>
				<CartContext.Provider value={{cart, removeItem}}>
					<Navigation cart={cart} />
					<Route exact path="/" render={() => <Products products={products} addItem={addItem}/>} />
					<Route path="/cart" render={() => <ShoppingCart cart={cart} />} />
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
