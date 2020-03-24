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
    
    Application.associate = (models) => {
        Application.hasOne(models.JobPosting,{
            through: 'Application_JobPosting'
        });
    };
    
    Application.associate = (models) => {
        Application.hasOne(models.UserFile,{
            through: 'Application_UserFile'
        });
    };
    
    Application.associate = (models) => {
        Application.hasOne(models.User,{
            through: 'Application_User'
        });
    };
    
    return Application
};
