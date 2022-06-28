import React from 'react';
import ICartItem from "../interfaces/ICartItem";
import {Button} from "@mui/material";
import store from "../store/cartStore";
import { observer } from 'mobx-react';

type ICartItemProps = {
    item: ICartItem
}

const CartItem: React.FC<ICartItemProps> = observer(({item}) => {

    return (
        <div className={'cart-item'}>
            <div>
                <h3>{item.title}</h3>
                <div className='information'>
                    <p>Price: ${item.price}</p>
                    <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
                </div>
                <div className='buttons'>
                    <Button
                        size='small'
                        disableElevation
                        variant='contained'
                        onClick={() => store.deleteItem(item.id)}
                    >
                        -
                    </Button>
                    <p>{item.amount}</p>
                    <Button
                        size='small'
                        disableElevation
                        variant='contained'
                        onClick={() => store.addItem(item)}
                    >
                        +
                    </Button>
                </div>
            </div>
            <img src={item.image} alt={item.title}/>
        </div>
    );
})

export default CartItem;