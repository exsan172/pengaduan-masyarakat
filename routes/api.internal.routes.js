const express = require('express');
const router = express.Router();
const apiInternalControllers = require("../controllers/api.internal.controllers")

router.get('/count-dashboard', [
    apiInternalControllers.totalDashboard
]);

router.post('/register', [
    apiInternalControllers.registerUser
]);

router.put('/update-user', [
    apiInternalControllers.updateUser
]);

router.delete('/delete-user/:id', [
    apiInternalControllers.deleteUser
]);

router.get('/list-user', [
    apiInternalControllers.listUser
]);

router.get('/list-pengaduan', [
    apiInternalControllers.listPengaduan
]);

router.get('/detail-pengaduan/:id', [
    apiInternalControllers.detailPengaduan
]);

router.delete('/delete-pengaduan/:id', [
    apiInternalControllers.deletePengaduan
]);

module.exports = router;
