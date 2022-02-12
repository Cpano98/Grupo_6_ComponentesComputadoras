module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        username: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        pass: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        role: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        img: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        tableName: 'user'
    }
    const User = sequelize.define(alias, cols, config); 

    //Realizando  relaciones en el modelo
    
    User.associate = function(modelos){
        User.hasMany(modelos.Ticket,
            {
                as:'ticket',
                foreignKey:'id_user'
            })
    }
    
    return User
};