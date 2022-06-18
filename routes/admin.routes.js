const express = require('express');
const router = express.Router();
const adminControllers = require("../controllers/admin.controllers")

router.get('/', [
  adminControllers.login
]);

router.post('/', [
  adminControllers.loginPost
]);

router.get('/dashboard', [
  adminControllers.dashboard
]);

router.get('/pengaduan', [
  adminControllers.pengaduan
]);

router.get('/akun', [
  adminControllers.akun
]);

router.get('/logout', [
  adminControllers.logout
]);

module.exports = router;
