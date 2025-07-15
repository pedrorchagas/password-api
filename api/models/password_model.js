const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Password extends Model {}
    Password.init(
        {
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                default: true,
            } 
        },
        {
            sequelize,
            modelName: 'password',
            timestamps: false,
        }
    )
    sequelize.sync();
    return Password;
}
