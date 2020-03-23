module.exports = (sequelize, DataTypes) => {
    const JobTag = sequelize.define('JobTag', {
        jobId: {
            type: DataTypes.INTEGER,
            field: 'jobID',
            primaryKey: true
        },
        employerId: {
            type: DataTypes.INTEGER,
            field: 'employerID',
            primaryKey: true,
            allowNull: false
        },
        tagId: {
            type: DataTypes.INTEGER,
            field: 'tagID',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tagName: {
            type: DataTypes.STRING,
            field: 'tagName',
            allowNull: false
        }
    },{
        tableName: 'jobTags'
    });

    return JobTag
};