import { Box, Button } from "@material-ui/core";
import { CartItemType } from "../../App";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      width: "100%",
      border: "1px solid lightblue",
      borderRadius: "20px",
      height: "100%",
    },
    btnAddToCard: {
      borderRadius: "0 0 20px 20px",
    },
    imgItem: {
      maxHeight: "250px",
      objectFit: "cover",
      borderRadius: "20px 20px 0 0",
    },
  })
);

const Item = ({ item, handleAddToCart }: Props)  => {
  const classes = useStyles();
  return (
    <Box className={classes.listItem}>
      <img className={classes.imgItem} src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>
      <Button
        variant="contained"
        className={classes.btnAddToCard}
        onClick={() => handleAddToCart(item)}
      >
        Add To Cart
      </Button>
    </Box>
  );
};

export default Item;
