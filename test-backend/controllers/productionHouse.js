const { ProductionHouse } = require("../models/index")

class ProductionHouseController {

    static getAllPh(req, res) {
        ProductionHouse.findAll({
            order : [["name_prodHouse", "ASC"]]
        })
            .then(ph => {
                res.render("productionHouse", { ph })
            })
            .catch(err => {
                res.send(err)
            })
    }

    

}
module.exports = ProductionHouseController