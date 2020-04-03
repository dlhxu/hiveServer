module.exports = (sequelize, DataTypes) => {
    const Application = sequelize.define('Application', {
        userId: {
            type: DataTypes.INTEGER,
            field: 'userID',
            primaryKey: true,
            allowNull: false
        },
        jobId: {
            type: DataTypes.INTEGER,
            field: 'jobID',
            primaryKey: true,
            allowNull: false
        },
        employerId: {
            type: DataTypes.INTEGER,
            field: 'employerID',
            primaryKey: true,
            allowNull: false
        },
        applicationId: {
            type: DataTypes.INTEGER,
            field: 'applicationID',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        applicationStatus: {
            type: DataTypes.STRING,
            field: 'applicationStatus',
            allowNull: false
        }
    },{
        tableName: 'application'
    });
    
    Application.associate = (models) => {
        Application.belongsTo(models.JobPosting, {foreignKey:"jobId"});
        Application.belongsTo(models.User, {foreignKey:"userId"});
    };
    
    return Application
};
