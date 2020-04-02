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
        UserTag.belongsTo(models.Tags);
        UserTag.belongsTo(models.User);
    };

    return UserTag
};
