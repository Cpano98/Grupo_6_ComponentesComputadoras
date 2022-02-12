module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT(800),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(10,0),
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        image: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        category: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        pieces: {
            type: dataTypes.INT,
            allowNull: false
        },
        sku:{
            type: dataTypes.STRING(15),
            allowNull:false
        }

    };
    let config = {
        timestamps: false,
    }
    const Product = sequelize.define(alias, cols, config); 

    
    Product.associate = function(modelos){
        Product.hasMany(modelos.Ticket_Product,
            {
                as:'ticket_product',
                foreignKey:'id_product'
            })
    }
    
    return Product
};