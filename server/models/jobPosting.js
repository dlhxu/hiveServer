module.exports = (sequelize, DataTypes) => {
    const JobPosting = sequelize.define('JobPosting', {
        jobId: {
            type: DataTypes.INTEGER,
            field: 'jobID',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        employerId: {
            type: DataTypes.INTEGER,
            field: 'employerID',
            allowNull: false
        },
        title: {
            type: DataTypes.INTEGER,
            field: 'title',
            allowNull: false
        },
        postingDate: {
            type: DataTypes.DATE,
            field: 'postingDate',
            allowNull: false
        },
        applicationDeadline: {
            type: DataTypes.DATE,
            field: 'applicationDeadline',
            allowNull: false
        },
        season: {
            type: DataTypes.STRING,
            field: 'season',
            allowNull: false
        },
        jobLength: {
            type: DataTypes.STRING,
            field: 'jobLength',
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            field: 'description',
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            field: 'location',
        },
        jobApplicationUrl: {
            type: DataTypes.STRING,
            field: 'jobApplicationUrl',
        },
    },{
        tableName: 'jobPosting'
    });
    
    JobPosting.associate = (models) => {
        JobPosting.belongsTo(models.Employer);
        JobPosting.hasMany(models.Application);
        JobPosting.hasMany(models.JobTag);
    };
    
    return JobPosting
};
