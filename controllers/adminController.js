const controller = {
    admin: (req, res) => {
        return res.render("./admin/adminPanel.ejs");
    },
    agregar: (req, res) => {
        return res.render("./admin/agregarProducto.ejs");
    },
    lista: (req, res) => {
        return res.render("./admin/listaProductoscCRUD.ejs");
    },
    editar: (req, res) => {
        return res.render("./admin/editarProducto.ejs");
    }


}

module.exports = controller