import React from 'react';
import ICartItem from "../interfaces/ICartItem";
import '../App.css';
import CartItem from "./CartItem";
import { observer } from 'mobx-react';

type ICartItemProps = {
    items: ICartItem[]
}

const Cart: React.FC<ICartItemProps> = observer(({items}) => {
    const calculateTotal = (items: ICartItem[]) =>
        items.reduce((previousValue: number, item) => previousValue + item.amount * item.price, 0);

    return (
        <aside className={'App-cart'}>
            <h2>Your Shopping Cart</h2>
            {items.length === 0 ? <p>No items in cart.</p> : null}
            {items.map(item => (
                <CartItem
                    key={item.id}
                    item={item}
                />
            ))}
            <h2>Total: ${calculateTotal(items).toFixed(2)}</h2>
        </aside>
    );
})

export default Cart;