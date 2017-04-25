import { ADD_TO_CART, ORDER_QUANTITY_INCREASE, ORDER_QUANTITY_DECREASE, ORDER_QUANTITY_MANUAL_ENTRY, SHOPPING_CART_QUANTITY_INCREASE, SHOPPING_CART_QUANTITY_DECREASE, SHOPPING_CART_ORDER_COMPLETED } from '../actions/payments.js'

const initialState = {
  annualPassQuantity: 0,
  annualPassPrice: 80,
  shoppingCartState: {
    'annualPass': 0
  },
}

export const payments = (state=initialState, action) => {
  switch (action.type) {
    case ORDER_QUANTITY_INCREASE:
      return Object.assign({}, state, {
        [action.item + 'Quantity']: action.quantity + 1,
      }) 
    case ORDER_QUANTITY_DECREASE:
      return Object.assign({}, state, {
        [action.item + 'Quantity']: (!(action.quantity) ? action.quantity : (action.quantity - 1)),
      }) 
    case ADD_TO_CART:
      return Object.assign({}, state, {
        shoppingCartState: Object.assign({}, state.shoppingCartState,
          {
            [action.item]: (!action.quantity ? state.shoppingCartState[action.item] : action.quantity + state.shoppingCartState[action.item])
          }),
        [action.item + 'Quantity']: 0
      })
    case SHOPPING_CART_QUANTITY_INCREASE:
      return Object.assign({}, state, {
        shoppingCartQuantity: action.shoppingCartQuantity + 1,
        shoppingCartTotal: (action.shoppingCartQuantity + 1) * state[action.item + 'Price']
      }) 
    case SHOPPING_CART_QUANTITY_DECREASE:
      return Object.assign({}, state, {
        shoppingCartQuantity: (!(action.shoppingCartQuantity) ? action.shoppingCartQuantity : (action.shoppingCartQuantity - 1)),
        shoppingCartTotal: (!(action.shoppingCartQuantity) ? state.shoppingCartTotal: ((action.shoppingCartQuantity - 1) * state[action.item + 'Price']))
      }) 
    default:
      return state
  }
}