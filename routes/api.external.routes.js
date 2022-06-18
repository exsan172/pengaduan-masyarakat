const express = require('express');
const router = express.Router();
const apiExternalControllers = require("../controllers/api.external.controllers")
const upload = require("../middleware/multer.middleware")

router.post('/input-pengaduan', upload.single("incident_photo"), [
  apiExternalControllers.index
]);

module.exports = router;
