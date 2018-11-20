// Create a Model with the Entities in the Database
// ****************** Organization Model **********************************
module.exports = function(sequelize, DataTypes) {
    var Channel = sequelize.define('Channel', {
        row_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        channel_id: DataTypes.INTEGER,
        sender: DataTypes.STRING,
        recipient: DataTypes.STRING,
        groupId: DataTypes.STRING,
        balance: DataTypes.DECIMAL(19,8),
        pending: DataTypes.DECIMAL(19,8),
        nonce: DataTypes.INTEGER,
        expiration: DataTypes.BIGINT(20),
        signer: DataTypes.STRING,
        row_updated: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
          }
      }, {freezeTableName: true, timestamps: false, tableName: 'mpe_channel'});
    return Channel;
}