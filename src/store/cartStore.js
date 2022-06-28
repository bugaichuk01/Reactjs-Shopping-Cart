import {
    action, autorun, computed,
    makeObservable,
    observable,
} from "mobx";


class cartStore {
    cartItems = [];

    constructor() {
        makeObservable(this, {
            cartItems: observable,
            addItem: action,
            deleteItem: action,
            totalItems: computed,
            totalItemsLength: computed
        });
        autorun(this.logStoreDetails);
    }

    get totalItems() {
        return this.cartItems;
    }

    get totalItemsLength() {
        return this.cartItems.length;
    }

    addItem(clickedItem) {
        const check = this.cartItems.find(item => item.id === clickedItem.id)
        if (check) {
            this.cartItems.map(item =>
                item.id === clickedItem.id
                    ? item.amount += 1
                    : item
            );
        } else this.cartItems.push({...clickedItem, amount: 1});
    }

    deleteItem(id) {
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