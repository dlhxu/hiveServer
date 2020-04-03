module.exports = (sequelize, DataTypes) => {
    const UserTag = sequelize.define('UserTag', {
        tagId: {
            type: DataTypes.INTEGER,
            field: 'tagID',
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            field: 'userID',
            primaryKey: true
        },

    },{
        tableName: 'userTags'
    });

    // TODO update these based on new relationships
    UserTag.associate = (models) => {
        UserTag.belongsTo(models.Tag, {foreignKey:"tagId"});
        UserTag.belongsTo(models.User, {foreignKey:"userId"});
    };

    return UserTag
};
