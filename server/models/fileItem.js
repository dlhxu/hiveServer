module.exports = (sequelize, DataTypes) => {
    const FileItem = sequelize.define('FileItem', {
        fileId: {
            type: DataTypes.INTEGER,
            field: 'fileID',
            primaryKey: true,
            autoIncrement: true
        },
        fileType: {
            type: DataTypes.STRING,
            field: 'fileType',
            allowNull: false
        },
        file: {
            type: DataTypes.STRING,
            field: 'file',
            allowNull: false
        }
    },{
        tableName: 'fileItem'
    });

    return FileItem
};