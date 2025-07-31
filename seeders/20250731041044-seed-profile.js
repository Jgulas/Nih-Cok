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
   let seed = JSON.parse(await fs.readFile('./data/profiles.json'))
   seed = seed.map(el => {
    delete el.id
    el.createdAt = el.updatedAt = new Date()
    return el
   })

   await queryInterface.bulkInsert('Profiles', seed, {
     truncate: true
   })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Profiles', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    })
  }
};
