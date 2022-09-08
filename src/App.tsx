import React, { useState } from "react";
import "./App.css";
import { useQuery } from "react-query";
import {
  Badge,
  Box,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Item from "./components/Item/Item";
import { AddShoppingCart } from "@material-ui/icons";
import Cart from "./components/Cart/Cart";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btnCart: {
      position: "fixed",
      zIndex: 100,
      right: "20px",
      top: "20px",
    },
    maxWidth500: {
      maxWidth: "500px !importain"
    }
  })
);

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const App = () => {
  const classes = useStyles();

  const [cartOpen, setCartOpen] = useState(false);


  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  
  const getTotalItems = (items: CartItemType[]): any => {
    items.reduce((totalItem: number, items) => totalItem + items.amount, 0);
  };

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((itemTotal, item) => {
        if (item.id === id) {
          if (item.amount === 1) return itemTotal;
          return [...itemTotal, { ...item, amount: item.amount - 1 }];
        } else {
          return [...itemTotal, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;
  return (
    <Box m={4}>
      <Drawer  className={classes.maxWidth500} anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <IconButton className={classes.btnCart} onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="secondary">
          <AddShoppingCart />
        </Badge>
      </IconButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default App;
