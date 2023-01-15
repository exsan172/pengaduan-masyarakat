const bcrypt = require("bcrypt")
const moment = require("moment-timezone")
const userModels = require("../models/user.models")

const adminControllers = {
    login : async (req, res, next) => {
        try {
            req.session.msg !== undefined ? req.session.msg : req.session.msg=null
            res.render("pages/login.pages.ejs", {
                title:"login",
                msg : req.session.msg
            })
        } catch (error) {
            res.redirect("/")
        }
    },

    loginPost : async (req, res, next) => {
        try {

            const findUsername = await userModels.findOne({ username : req.body.username })
            if(findUsername !== null) {
                
                if(bcrypt.compareSync(req.body.password, findUsername.password)) {
                    req.session.isLogin = {
                        name : findUsername.name,
                        status : true,
                        role : findUsername.role
                    }
                    res.redirect("/dashboard")
                } else {
                    req.session.msg="salah"
                    res.redirect("/")
                }

            } else {
                req.session.msg="salah"
                res.redirect("/")
            }
        } catch (error) {
            res.redirect("/")
        }
    },

    dashboard : async (req, res, next) => {
        try {
            res.render("pages/dashboard.pages.ejs", {
                title:"Dashboard",
                nameUser : req.session.isLogin.name,
                role : req.session.isLogin.role
            })
        } catch (error) {
            res.redirect("/")
        }
    },

    pengaduan : async (req, res, next) => {
        try {
            res.render("pages/report.pages.ejs", {
                title:"Pengaduan",
                nameUser : req.session.isLogin.name,
                role : req.session.isLogin.role,
                moment : moment
            })
        } catch (error) {
            res.redirect("/")
        }
    },

    akun : async (req, res, next) => {
        try {
            res.render("pages/account.pages.ejs", {
                title:"Akun",
                nameUser : req.session.isLogin.name,
                role : req.session.isLogin.role
            })
        } catch (error) {
            res.redirect("/")
        }
    },

    logout : async (req, res, next) => {
        req.session.destroy
        res.redirect("/")
    }
}

module.exports = adminControllers