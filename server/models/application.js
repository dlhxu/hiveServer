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
        Application.hasMany(models.JobPosting);
    };
    
    Application.associate = (models) => {
        Application.hasMany(models.UserFile);
    };
    
    // we should consider taking out this relation because Application takes FK from User File, so i'm not sure if this will imply that Application should take FK userID from User instead of UserFile
    Application.associate = (models) => {
        Application.hasMany(models.User);
    };
    
    return Application
};
