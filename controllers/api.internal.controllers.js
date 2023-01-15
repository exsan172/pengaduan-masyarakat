const moment = require("moment-timezone")
const bcrypt = require("bcrypt")
const config = require("../config")
const pengaduanModels = require("../models/pengaduan.models")
const userModels = require("../models/user.models")
const salt = bcrypt.genSaltSync(10)

const apiInternalControllers = {
    totalDashboard : async (req, res, next) => {
        try {
            const pengaduan = await pengaduanModels.count()
            const akun = await userModels.count()

            config.response(res, 200, "success", {
                pengaduan : pengaduan,
                akun : akun
            })
        } catch (error) {
            config.response(res, 400, error.message)
        }
    },

    registerUser : async (req, res, next) => {
        try {
            if(req.body.role !== "owner" && req.body.role !== "admin") {
                return config.response(res, 400, "failed, role must be owner or admin!")
            }

            const findUser = await userModels.findOne({ username: req.body.email })
            if(findUser !== null) {
                return config.response(res, 400, "failed, email already used!")
            }

            const hashPassword = bcrypt.hashSync(req.body.password, salt)
            const register = await userModels.create({
                name : req.body.name,
                username : req.body.email,
                password : hashPassword,
                role : req.body.role,
                createdAt : await config.curentTime()
            })
            return config.response(res, 200, "success", register)

        } catch (error) {
            config.response(res, 400, error.message)
        }
    },

    listUser : async (req, res, next) => {
        try {
            const user = await userModels.find().sort({ createdAt:-1 })
            return config.response(res, 200, "success", user)

        } catch (error) {
            config.response(res, 400, error.message)
        }
    },

    updateUser : async (req, res, next) => {
        try {
            const user = await userModels.updateOne({ _id:req.body.id }, {
                name  : req.body.name,
                username : req.body.email,
                role  : req.body.role
            })
            return config.response(res, 200, "success", user)

        } catch (error) {
            config.response(res, 400, error.message)
        }
    },

    deleteUser : async (req, res, next) => {
        try {
            const user = await userModels.deleteOne({ _id:req.params.id })
            return config.response(res, 200, "success", user)

        } catch (error) {
            config.response(res, 400, error.message)
        }
    },

    listPengaduan : async (req, res, next) => {
        try {
            const pengaduan = await pengaduanModels.find({}, "_id reported deed seeByadmin createdAt category").sort({ createdAt: -1 })
            return config.response(res, 200, "success", pengaduan)

        } catch (error) {
            config.response(res, 400, error.message)
        }
    },

    detailPengaduan : async (req, res, next) => {
        try {
            await pengaduanModels.updateOne({ _id:req.params.id }, { seeByadmin: true })
            const pengaduan = await pengaduanModels.findOne({ _id:req.params.id })
            return config.response(res, 200, "success", pengaduan)

        } catch (error) {
            config.response(res, 400, error.message)
        }
    },

    deletePengaduan : async (req, res, next) => {
        try {
            const pengaduan = await pengaduanModels.deleteOne({ _id:req.params.id })
            return config.response(res, 200, "success", pengaduan)

        } catch (error) {
            config.response(res, 400, error.message)
        }
    },

}

module.exports = apiInternalControllers