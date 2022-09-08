import { Box } from "@material-ui/core";
import React from "react";
import { CartItemType } from "../../App";
import CartItem from "./CartItem";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

function Cart({ cartItems, addToCart, removeFromCart }: Props) {
  return (
    <Box>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in Cart</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
    </Box>
  );
}

export default Cart;
