import {
    action, autorun, computed,
    makeObservable,
    observable,
} from "mobx";
import ICartItem from "../interfaces/ICartItem";


class cartStore {
    cartItems: ICartItem[] = [];

    constructor() {
        makeObservable(this, {
            cartItems: observable,
            addItem: action,
            deleteItem: action,
            totalItemsLength: computed
        });
        autorun(this.logStoreDetails);
    }

    get totalItemsLength() {
        return this.cartItems.length;
    }

    addItem(clickedItem: ICartItem) {
        const check = this.cartItems.find(item => item.id === clickedItem.id)
        if (check) {
            this.cartItems.map(item =>
                item.id === clickedItem.id
                    ? item.amount += 1
                    : item
            );
        } else this.cartItems.push({...clickedItem, amount: 1});
    }

    deleteItem(id: number) {
        const itemIndex = this.cartItems.findIndex((item) => item.id === id);
        this.cartItems.map((item) => {
            if (item.id === id) {
                if (item.amount === 1) return this.cartItems.splice(itemIndex, 1);
                return item.amount -= 1;
            } else {
                return item;
            }
        })
    }

    get storeDetails() {
        return `total items: ${this.cartItems.length}`;
    }

    logStoreDetails = () => {
        console.log(this.storeDetails);
    };
}

const CartStore = new cartStore();

export default CartStore;
export {cartStore}