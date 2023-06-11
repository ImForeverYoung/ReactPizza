import { CartItem } from "../redux/slices/cart/types";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
    
    const data = localStorage.getItem('cart')
    const json = data? JSON.parse(data) : []
    const items = calcTotalPrice(json);

    return {
        items: json as CartItem[],
        totalPrice: items,
    }

}