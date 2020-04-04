module.exports = (sequelize, DataTypes) => {
    const UserEducation = sequelize.define('UserEducation', {
        degreeName: {
            type: DataTypes.STRING,
            field: 'degreeName',
            primaryKey: true,
            allowNull: false
        },
        programName: {
            type: DataTypes.STRING,
            field: 'programName',
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            field: 'userID',
            primaryKey: true,
            allowNull: false
        },
        institutionId: {
            type: DataTypes.INTEGER,
            field: 'institutionID',
            primaryKey: true,
            allowNull: false
        },
        educationStartDate: {
            type: DataTypes.DATE,
            field: 'educationStartDate',
            allowNull: false
        },
        educationEndDate: {
            type: DataTypes.DATE,
            field: 'educationEndDate',
            allowNull: false
        },
        degreeLevel: {
            type: DataTypes.STRING,
            field: 'degreeLevel',
            allowNull: false
        },
        current: {
            type: DataTypes.BOOLEAN,
            field: 'current',
            allowNull: false
        },
    },{

        tableName: 'userEducation'
    });

    UserEducation.associate = (models) => {
        UserEducation.belongsTo(models.Institution, {foreignKey:"institutionId"});
        UserEducation.belongsTo(models.User, {foreignKey: "userId"});
    };

    return UserEducation
};
