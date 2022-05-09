export class AdminOrder {
    constructor(product,address ,quantity) {
      this.ownerId = product.ownerId;
      this.id = product.id;
      this.price = product.price;
      this.title = product.title;
      this.imageUrl = product.imageUrl;
      this.ownerId = product.ownerId;
      this.quantity = quantity;
      this.total = this.price * this.quantity;
    }
  }