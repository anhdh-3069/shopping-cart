import { Box, Button } from "@material-ui/core";
import React from "react";
import { CartItemType } from "../../App";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      borderBottom: "1px solid lightblue",
      paddingBottom: "20px",
    },
    flexJustifyContent: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      margin: "10px"
    },
    imgInCart: {
      maxWidth: "80px",
      objectFit: "cover",
      marginLeft: "40px",
    },
  })
);

function CartItem({ item, addToCart, removeFromCart }: Props) {
  const classes = useStyles();
  return (
    <Box className={classes.listItem}>
      <h3>{item.title}</h3>
      <div className={classes.flexJustifyContent}>
        <p>Price: ${item.price}</p>
        <p>Total: ${item.amount * item.price}</p>
      </div>
      <div className={classes.flexJustifyContent}>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => removeFromCart(item.id)}
        >
          -
        </Button>
        <b>{item.amount}</b>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => addToCart(item)}
        >
          +
        </Button>
      </div>
      <img className={classes.imgInCart} src={item.image} alt={item.title} />
    </Box>
  );
}

export default CartItem;
