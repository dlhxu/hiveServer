module.exports = (sequelize, DataTypes) => {
    const PreviousPosition = sequelize.define('PreviousPosition', {
        positionId: {
            type: DataTypes.INTEGER,
            field: 'positionID',
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            field: 'userID',
            primaryKey: true
        },
        positionName: {
            type: DataTypes.STRING,
            field: 'positionName',
            allowNull: false
        },
        positionDescription: {
            type: DataTypes.STRING,
            field: 'positionDescription',
            allowNull: false
        },
        positionStartDate: {
            type: DataTypes.DATE,
            field: 'positionStartDate',
            allowNull: false
        },
        positionEndDate: {
            type: DataTypes.DATE,
            field: 'positionEndDate',
            allowNull: false
        },

    },{
        tableName: 'previousPosition'
    });
    
    PreviousPosition.associate = (models) => {
        PreviousPosition.belongsTo(models.User);
    };

    return PreviousPosition
};
