module.exports = (sequelize, DataTypes) => {
    const Employer = sequelize.define('Employer', {
        employerId: {
            type: DataTypes.INTEGER,
            field: 'employerID',
            primaryKey: true,
            autoIncrement: true
        },
        companyName: {
            type: DataTypes.STRING,
            field: 'companyName',
            allowNull: false
        }
    },{
        tableName: 'employer'
    });
    
    Employer.associate = (models) => {
         Employer.belongsTo(models.JobPosting);
    };
    
    return Employer
    
};
