const getFromDb = () => {
  return JSON.parse(localStorage.getItem("shopping_cart"));
};

const AddToDb = (id) => {
  const exist = getFromDb();
  let shoppingCart = {};

  if (!exist) {
    shoppingCart[id] = 1;
  } else {
    shoppingCart = exist;
    if (shoppingCart[id]) {
      const newCount = shoppingCart[id] + 1;
      shoppingCart[id] = newCount;
    } else {
      shoppingCart[id] = 1;
    }
  }
  localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart));
};
const AddChoosedItem = (id) => {
  localStorage.setItem("choosed_item", JSON.stringify(id));
};



const RemoveFromDb = (id) => {
  let storedItem = getFromDb();
  if (storedItem[id]) {
    delete storedItem[id];
  }
  localStorage.setItem("shopping_cart", JSON.stringify(storedItem));
};

export { AddToDb , AddChoosedItem };
export { RemoveFromDb, getFromDb };
