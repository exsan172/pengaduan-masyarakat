const config = require("../config")
const pengaduanModels = require("../models/pengaduan.models")

const apiExternalControllers = {
    index : async (req, res, next) => {
        try {

            if(req.body.name && req.body.address && req.body.phone && req.body.reported && req.body.deed && req.file.path) {
                const createReport = await pengaduanModels.create({
                    name            : req.body.name,
                    address         : req.body.address,
                    phone           : req.body.phone,
                    reported        : req.body.reported,
                    work_unit       : req.body.work_unit || "-",
                    deed            : req.body.deed,
                    category        : req.body.category,
                    incident_photo  : req.file.path,
                    seeByadmin      : false,
                    createdAt       : await config.curentTime()
                })
    
                config.response(res, 201, "success", createReport)

            } else{ 
                config.response(res, 400, "please fill required data !")    
            }

        } catch (error) {
            config.response(res, 400, error.message)
        }
    }
}

module.exports = apiExternalControllers