"use strict";

const CRMController = require("../controllers/CRMController");

const prefix = "/api/crm"

module.exports = (app) => {

    app.post(`${prefix}`, CRMController.findAll);

}