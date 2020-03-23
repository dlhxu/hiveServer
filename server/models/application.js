module.exports = (sequelize, DataTypes) => {
    const Application = sequelize.define('Application', {
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

    return Application
};