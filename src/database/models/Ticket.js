module.exports = (sequelize, dataTypes) => {
    let alias = 'Ticket';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        id_user: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        active: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        tableName: 'ticket'
    }
    const Ticket = sequelize.define(alias, cols, config); 

    Ticket.associate = function(modelos){
        Ticket.belongsTo(modelos.User,
            {
                as:'user',
                foreignKey:'id_user'
            }),
        Ticket.hasMany(modelos.Ticket_Product,
            {
                as:'ticket_product',
                foreignKey:'id_ticket'
            })
    }
    return Ticket
};