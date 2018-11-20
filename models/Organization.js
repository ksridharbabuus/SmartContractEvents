// Create a Model with the Entities in the Database
// ****************** Organization Model **********************************
module.exports = function(sequelize, DataTypes) {
    var Organization = sequelize.define('Organization', {
        row_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        organization_name: DataTypes.STRING,
        owner_address: DataTypes.STRING,
        row_updated: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {freezeTableName: true, timestamps: false, tableName: 'organization'});
    return Organization;
}