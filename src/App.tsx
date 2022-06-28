import React, {useEffect, useState} from 'react';
import axios from "axios";
import './App.css';
import store from "./store/cartStore";
import {Badge, Drawer, Grid, IconButton} from '@mui/material';
// @ts-ignore
import ICartItem from 'interfaces/ICartItem';
import Item from "./components/Item";
import Cart from "./components/Cart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { observer } from 'mobx-react';

const App = observer(() => {
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<ICartItem[]>([]);

    useEffect(() => {
        const getProducts = async () => {
            await axios.get('https://fakestoreapi.com/products').then(r => setData(r.data))
        }
        getProducts();
    }, []);

    return (
        <div className="App">
            <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
                <Cart
                    items={store.cartItems}
                />
            </Drawer>
            <IconButton  onClick={() => setOpen(true)}>
                <Badge badgeContent={store.totalItemsLength} color='error'>
                    <AddShoppingCartIcon/>
                </Badge>
            </IconButton>
            <Grid container spacing={3}>
                {data?.map(item => (
                    <Grid item key={item.id} xs={4} sm={4}>
                        <Item item={item}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
})

export default App;
