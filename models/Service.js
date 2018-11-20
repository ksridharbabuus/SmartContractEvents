// Create a Model with the Entities in the Database
// ****************** Organization Model **********************************
module.exports = function(sequelize, DataTypes) {
    var Service = sequelize.define('Service', {
        row_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        service_name: DataTypes.STRING,
        service_path: DataTypes.STRING,
        organization_name: DataTypes.STRING,
        ipfs_hash: DataTypes.STRING,
        is_curated: DataTypes.TINYINT,
        row_updated: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
          }
      }, {freezeTableName: true, timestamps: false, tableName: 'service'});
    return Service;
}