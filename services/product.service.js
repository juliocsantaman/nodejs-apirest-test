const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');
const { models } = require('./../libs/sequelize');


class ProductsService {

  constructor() {
    //this.products = [];
  }

  // generate() {
  //   let productLimit = 10; // default.
  //   for (let index = 0; index < productLimit; index++) {
  //     this.products.push({
  //       id: faker.datatype.uuid(),
  //       productName: faker.commerce.productName(),
  //       productPrice: parseInt(faker.commerce.price(), 10),
  //       productImage: faker.image.imageUrl(),
  //       isBlock: faker.datatype.boolean()
  //     });
  //   }
  // }

  async create(product) {
    const newProduct = await models.Product.create(product);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
    }

    const { limit, offset } = query;

    if(limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if(!product) {
      throw boom.notFound('product not found.');
    }

    return product;
  }

  async update(id, newProduct) {
    const product = this.findOne(id);
    const response = await product.update(newProduct);
    return response;
  }

  async delete(id) {
    const product = this.findOne(id);
    await product.destroy();
    return id;
  }
}

module.exports = ProductsService;