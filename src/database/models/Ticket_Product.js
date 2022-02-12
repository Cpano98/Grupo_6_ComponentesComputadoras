module.exports = (sequelize, dataTypes) => {
    let alias = 'Ticket_Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        id_ticket: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        id_product: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        qty_product:{
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        tableName: 'ticket_product'
    }
    const Ticket_Product = sequelize.define(alias, cols, config); 

    Ticket_Product.associate = function(modelos){
        Ticket_Product.belongsTo(modelos.Ticket,
            {
                as:'ticket',
                foreignKey:'id_ticket'
            }),
        Ticket_Product.belongsTo(modelos.Product,
            {
                as:'product',
                foreignKey:'id_product'
            })
    }
    return Ticket_Product
};