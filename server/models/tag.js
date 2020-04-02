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
        Tag.hasMany(models.UserTag, {foreignKey:'tagId'});
        Tag.belongsTo(models.JobTag);
    };

    return Tag
};
