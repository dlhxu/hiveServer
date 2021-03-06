module.exports = (sequelize, DataTypes) => {
    const Institution = sequelize.define('Institution', {
        institutionId: {
            type: DataTypes.INTEGER,
            field: 'institutionID',
            primaryKey: true,
            autoIncrement: true
        },
        institutionName: {
            type: DataTypes.STRING,
            field: 'institutionName',
            allowNull: false
        }
    },{
        tableName: 'institution'
    });

    Institution.associate = (models) => {
         Institution.hasMany(models.UserEducation, {as: "userEducation", foreignKey: "institutionId"});
    };
    
    return Institution
};
