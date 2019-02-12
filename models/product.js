const db = require("../util/database");
module.exports = class Product {

  constructor(title, img, price, description, number) {
    this.title = title;
    this.img = img;
    this.price = price;
    this.description = description;
    this.number = number;
  }
  save() {
    return db.execute('INSERT INTO product (name,img,price,description,number)VALUES(?,?,?,?,?)', [this.title, this.img, this.price, this.description, this.number]);
  }
  static fetchAll() {
    return db.execute('SELECT * FROM product');
  }
  static deleteById(id) {
    return db.execute('DELETE  FROM product WHERE product.id = ?', [id]);
  }
  static findById(id) {
    return db.execute('SELECT * FROM product WHERE product.id = ?', [id]);
  }
  static updateProduct(id) {

  }
}