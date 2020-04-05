module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        tagId: {
            type: DataTypes.INTEGER,
            field: 'tagID',
            primaryKey: true
        },
        tagName: {
            type: DataTypes.STRING,
            field: 'tagName',
        }
    },{
        tableName: 'tags'
    });

    Tag.associate = (models) => {
        Tag.hasMany(models.UserTag, {as:"userTags", foreignKey:'tagId'});
        Tag.hasMany(models.JobTag, {as:"jobTags", foreignKey:"tagId"});
    };

    return Tag
};
