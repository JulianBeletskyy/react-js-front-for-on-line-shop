import * as types from 'actions/types.js'

const initialState = {
    list: {
        product: [],
        service: [],
        promotion: [],
        credit_bundle: []
    },
    total: {},
    use_credits: false,
    step: 1,
    updated: false,
    delivery: {},
    guestAddress: {},
    guestCard: {},
    delivery_types: []
}

export default function cart(cart = initialState, action = {}) {
    let tempList = Object.assign({}, cart.list)
    switch (action.type) {
        case types.SET_CART:
            tempList.product = action.data.filter(item => item.type === 'product')
            tempList.service = action.data.filter(item => item.type === 'service')
            tempList.credit_bundle = action.data.filter(item => item.type === 'credit-bundle')
            tempList.promotion = action.data.filter(item => item.type === 'promotion')

            return Object.assign({}, cart, {
                list: tempList,
                updated: true
            });
        case types.SET_CART_TOTAL:
            return {...cart, total: action.data}
        case types.SET_USE_CREDITS:
            return {...cart, use_credits: action.value}
        case types.SET_STEP:
            return {...cart, step: action.step}
        case types.SET_UPDATED_CART:
            return {...cart, updated: action.value}
        case types.SET_GUEST_INFO:
            console.log(action.data)
            return {...cart, [action.key]: action.data}
        case types.SET_DELIVERY_TYPES:
            return {...cart, delivery_types: action.data}
        case types.SET_DELIVERY_CART:
            return {...cart, delivery: action.value}
        default:
            return cart
    }
}