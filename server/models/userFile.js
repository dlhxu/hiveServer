module.exports = (sequelize, DataTypes) => {
    const UserFile = sequelize.define('UserFile', {
        userId: {
            type: DataTypes.INTEGER,
            field: 'userID',
            primaryKey: true,
            allowNull: false
        },
        fileId: {
            type: DataTypes.INTEGER,
            field: 'fileID',
            primaryKey: true,
            allowNull: false
        },
        fileLocation: {
            type: DataTypes.STRING,
            field: 'fileLocation',
            allowNull: false
        }
    },{
        tableName: 'userFile'
    });

    UserFile.associate = (models) => {
         UserFile.belongsTo(models.Application);
    };
    
    UserFile.associate = (models) => {
         UserFile.belongsTo(models.User);
    };

    return UserFile
};
