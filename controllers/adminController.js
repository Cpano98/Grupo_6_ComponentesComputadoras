const controller = {
    admin: (req, res) => {
        return res.render("./admin/adminPanel.ejs");
    },
    agregar: (req, res) => {
        return res.render("./admin/agregarProducto.ejs");
    }

}

module.exports = controller