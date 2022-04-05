export class Product {
  constructor(id, ownerId, title,imageUrl,category, description, price) {
    this.id = id;
    this.ownerId = ownerId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.category = category;
    this.description = description;
    this.price = price;
  }
}
