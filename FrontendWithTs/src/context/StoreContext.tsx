/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { message } from "antd";
import { Dispatch, SetStateAction } from 'react';


export interface CategoryType{
    category: string;
    setCategory: Dispatch<SetStateAction<string>>;
}

// Define the types for the context and state
export interface FoodItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
  }

interface CartItems {
    [key: string]: number;
}

export interface StoreContextType {
    category: string;
    searchTerm: string | null;
    setSearchTerm: (term: string ) => void;
    setCategory: (category: string) => void;
    findItem: (searchTerm: string) => Promise<void>;
    food_list: FoodItem[];
    cartItems: CartItems;
    addToCart: (itemId: string) => Promise<void>;
    setCartItems: (cart: CartItems) => void;
    removeFromCart: (itemId: string) => Promise<void>;
    getTotalCartAmount: () => number;
    url: string;
    token: string;
    setToken: (token: string) => void;
}

export const StoreContext = createContext<StoreContextType | null>(null);

interface StoreContextProviderProps {
    children: ReactNode;
}

const StoreContextProvider = (props: StoreContextProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItems>({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState<string>("");
    const [food_list, setFoodList] = useState<FoodItem[]>([]);
    const [category, setCategory] = useState<string>("All");
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    const addToCart = async (itemId: string): Promise<void> => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
            message.success("Item Added successfully");
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
            message.success("Item Added successfully");
        }

        if (token) {
            await axios.post(
                `${url}/api/cart/add`,
                { itemId },
                { headers: { token } }
            );
        }
    };

    const findItem = async (searchTerm: string): Promise<void> => {
        const response = await axios.post(`${url}/api/food/search?name=${searchTerm}`);
        if (response.data.success) {
            const food = response.data.food.map((item: FoodItem) => item.name);
            setCategory(food.join(', '));
        } else {
            console.log("Failed to fetch food list");
        }
    };
    const removeFromCart = async (itemId: string): Promise<void> => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(
                `${url}/api/cart/remove`,
                { itemId },
                { headers: { token } }
            );
            message.success("Item removed successfully");
        }
    };

    const getTotalCartAmount = (): number => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async (): Promise<void> => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setFoodList(response.data.data);
        } else {
            console.log("Failed to fetch food list");
        }
    };
    console.log(food_list);
    
    const loadCartData = async (token: string): Promise<void> => {
        const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
        setCartItems(response.data.cartData);
    };

    useEffect(() => {
        fetchFoodList();
        async function loadData() {
            if (localStorage.getItem("token")) {
                const tokenFromLocalStorage = localStorage.getItem("token")!;
                setToken(tokenFromLocalStorage);
                await loadCartData(tokenFromLocalStorage);
            }
        }
        loadData();
    }, []);

    const contextValue: StoreContextType = {
        category,
        searchTerm,
        setSearchTerm,
        setCategory,
        findItem,
        food_list,
        cartItems,
        addToCart,
        setCartItems,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
