export class CartItem {
  constructor(product, quantity) {
    this.id = product.id;
    this.price = product.price;
    this.title = product.title;
    this.imageUrl = product.imageUrl;
    this.category  = product.category;
    this.quantity = quantity;
    this.total = this.price * this.quantity;
  }
}
