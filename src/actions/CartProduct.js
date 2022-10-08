export const cartProduct = (product) => {
    return {
        type: 'CART_PRODUCT',
        payload: product,
    };
};
