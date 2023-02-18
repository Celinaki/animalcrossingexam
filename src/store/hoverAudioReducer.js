const initialState = {
    isHovering: false,
  };
  
  const hoverReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_HOVER":
        return {
          ...state,
          isHovering: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default hoverReducer;