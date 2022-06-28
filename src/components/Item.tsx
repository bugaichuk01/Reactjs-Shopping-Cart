import {IconButton} from '@mui/material';
import React from 'react';
import '../App.css';
import ICartItem from "../interfaces/ICartItem";
import store from "../store/cartStore";
import { observer } from 'mobx-react';
// @ts-ignore
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

type ICartItemProps = {
    item: ICartItem
}

const Item: React.FC<ICartItemProps> = ({item}) => {
    return (
        <div className={'App-item'}>
            <img src={item.image} alt={item.title}/>
            <div>
                <h3>{item.title}</h3>
                <span>
                    <h3>${item.price}</h3>
                    <IconButton onClick={() => store.addItem(item)} color="primary" aria-label="Добавить в корзину">
                        <AddShoppingCartIcon/>
                    </IconButton>
                </span>
            </div>
        </div>
    );
}

export default observer(Item);