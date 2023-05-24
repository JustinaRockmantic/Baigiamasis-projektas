import { createContext, useReducer } from "react";
import guestReducer, { initialState } from "./reducer";

export const ListContext = createContext();

const ListWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(guestReducer, initialState);

  const addToList = (guest) => {
    // updateTotalPrice(updatedBasket);

    dispatch({
      type: "add",
      payload: guest,
    });
  };

  const removeFromList = (id) => {
    dispatch({
      type: "delete",
      payload: id,
    });
  };

  return (
    <ListContext.Provider
      value={{
        total: state.total,
        products: state.guest,
        addToList,
        removeFromList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export default ListWrapper;
