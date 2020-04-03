module.exports = (sequelize, DataTypes) => {
    const JobTag = sequelize.define('JobTag', {
        jobId: {
            type: DataTypes.INTEGER,
            field: 'jobID',
            primaryKey: true
        },
        tagId: {
            type: DataTypes.INTEGER,
            field: 'tagID',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
    },{
        tableName: 'jobTags'
    });

    // TODO verify associations match new relationships
    JobTag.associate = (models) => {
        JobTag.belongsTo(models.JobPosting, {foreignKey:'jobId'});
        JobTag.hasOne(models.Tag, {as:"tags", foreignKey:'tagId'});
    };

    return JobTag
};
