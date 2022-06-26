const faker = require('faker');
const boom = require('@hapi/boom');


class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    let productLimit = 10; // default.
    for (let index = 0; index < productLimit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        productName: faker.commerce.productName(),
        productPrice: parseInt(faker.commerce.price(), 10),
        productImage: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(product) {
    const { productName, productPrice, productImage } = product;

    if(productName == null || productPrice == null || productImage == null) {
      //throw new Error('Error of property.');
      throw boom.notAcceptable('Error of property.');
    }

    product = {
      id: faker.datatype.uuid(),
      productName,
      productPrice,
      productImage
    }
    this.products.push(product);
    return product;
  }

  async find() {
    if(this.products.length === 0) {
      //throw new Error('There are not products.');
      throw boom.notFound('There are not products.');
    }

    return this.products;
  }

  async findOne(id) {
    const product = this.products.find((product) => product.id === id);
    if(product == undefined) {
      //throw new Error('Product not found.');
      throw boom.notFound('Product not found.');
    }

    if(product.isBlock) {
      throw boom.conflict('Product is block.');
    }

    return product;
  }

  async update(id, newProduct) {
    const index = this.products.findIndex((product) => {
      return product.id === id;
    });

    if(index === -1) {
      //throw new Error('product not found');
      throw boom.notFound('Product not found.');
    }

    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...newProduct
    }

    return this.products[index];

  }

  async delete(id) {
    const index = this.products.findIndex((product) => {
      return product.id === id;
    });

    if(index === -1) {
      //throw new Error('product not found');
      throw boom.notFound('Product not found.');
    }

    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;