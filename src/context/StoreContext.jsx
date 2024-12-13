// import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";

// export const StoreContext = createContext(null)

// const StoreContextProvider = (props) => {

//     const[cartItems ,setCartItems]  = useState({});

//     const addToCart = (itemId) =>{
//         if(cartItem[itemId] ){
//             setCartItem((prev) =>({...prev,[itemId]:1}))
//         }
//         else{
//             setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
//         }
//     }

//     const removeFromCart =  (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
//     }

//     useEffect(() =>{
//         console.log(cartItems);
//     }, [cartItems])

//     const contextValue = {
//         food_list,
//         cartItems,
//         setCartItems,
//         addToCart,
//         removeFromCart
//     }

//     return (
//         <StoreContext.Provider value={contextValue}>
//             {props.children}
//         </StoreContext.Provider>
//     )
// }

// export default StoreContextProvider;





import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCount = (prev[itemId] || 0) - 1;
            if (newCount <= 0) {
                const { [itemId]: _, ...newCart } = prev; // Remove item if count is 0
                return newCart;
            }
            return { ...prev, [itemId]: newCount };
        });
    };

    
    const getTotalCartAmount =() =>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item] >0){
                let itemInfo = food_list.find((product)=>  product._id === item);
                totalAmount+= itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }


    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
