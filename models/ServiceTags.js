// Create a Model with the Entities in the Database
// ****************** Organization Model **********************************
module.exports = function(sequelize, DataTypes) {
    var ServiceTags = sequelize.define('ServiceTags', {
        row_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        service_id: DataTypes.INTEGER,
        tag_name: DataTypes.STRING,
        row_updated: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
          }
      }, {freezeTableName: true, timestamps: false, tableName: 'service_tags'});
    return ServiceTags;
}