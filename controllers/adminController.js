const controller = {
    admin: (req, res) => { 
        return res.render("./admin/adminPanel.ejs");
    }
}

module.exports = controller