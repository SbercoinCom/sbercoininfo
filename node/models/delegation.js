const Sequelize = require('sequelize')

function generate(sequelize) {
  let Delegation = sequelize.define('delegation', {
    _id: {
        type: Sequelize.BIGINT.UNSIGNED,
        field: '_id',
        primaryKey: true,
        autoIncrement: true
    },
    delegatorData: Sequelize.STRING(32).BINARY,
    superstakerData: Sequelize.STRING(32).BINARY,
    fee: Sequelize.INTEGER.UNSIGNED,
    isActive: Sequelize.BOOLEAN
  }, {freezeTableName: true, underscored: true, timestamps: false})
  
}

module.exports = generate
