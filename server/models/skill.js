module.exports = (sequelize, DataTypes) => {
    const Skill = sequelize.define('Skill', {
        userId: {
            type: DataTypes.INTEGER,
            field: 'userID',
            primaryKey: true
        },
        jobId: {
            type: DataTypes.INTEGER,
            field: 'jobID',
            primaryKey: true
        },
        employerId: {
            type: DataTypes.INTEGER,
            field: 'employerID',
            primaryKey: true
        },
        tagId: {
            type: DataTypes.INTEGER,
            field: 'tagID',
            primaryKey: true
        },
        skillName: {
            type: DataTypes.STRING,
            field: 'skillName'
        },
    },{
        tableName: 'skill'
    });

    return Skill
};