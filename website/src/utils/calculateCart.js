export const calculateCartTotals = (cart) => {
  if (!cart) return { subTotal: 0, tax: 0, shipping: 0, total: 0, cartQty: 0 };

  const items = cart.items || [];

  const subTotal = cart.subTotal || 0;
  const tax = subTotal * 0.125; // 12.5% 
  const shipping = subTotal > 30 ? 0 : 19.99;
  const total = subTotal + tax + shipping;
  const cartQty = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return { subTotal, tax, shipping, total, cartQty };
};
