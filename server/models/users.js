module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userId: {
            type: DataTypes.INTEGER,
            field: 'userID',
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            field: 'firstName',
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'lastName',
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            field: 'email',
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            field: 'password',
            allowNull: false
        }

    },{
        tableName: 'users'
    });
    
    User.associate = (models) => {
         User.belongsTo(models.UserFile);
    };
    
    User.associate = (models) => {
         User.belongsTo(models.Skill);
    };
    
    User.associate = (models) => {
         User.belongsTo(models.UserEducation);
    };
    
    User.associate = (models) => {
         User.belongsTo(models.PreviousPosition);
    };
    
    return User
};
