'use strict';
const fs = require('fs').promises;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let seed = JSON.parse(await fs.readFile('./data/products.json'))
   seed = seed.map(el => {
    delete el.id
    el.createdAt = el.updatedAt = new Date()
    return el
   })
   await queryInterface.bulkInsert('Products', seed, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {
      restartIdentity: true,
      cascade: true
    })
  }
};
