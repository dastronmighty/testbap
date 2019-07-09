"use strict";

const config = require('../../config/server.config');

/**
 * CONNECT TO DYNAMICS SERVICE TO GET TOKENS FOR API AUTH
 * ALL THIS STUFF IS NECESSARY AND SHOWN IN THE dynamics-web-api npm PAGE
 * IF STUFF BREAKS GO AND CHECK THE DOCS THERE TO MAKE SURE INIT AUTH HASN'T CHANGED
 */

const DynamicsWebApi = require("dynamics-web-api");
const AuthenticationContext = require("adal-node").AuthenticationContext;
const authorityUrl = config.CRMAuthURL;
const resource = config.CRMResource;

const clientId = config.CRMClientID;
const username = config.CRMUser;
const password = config.CRMPass;

const adalContext = new AuthenticationContext(authorityUrl);

function acquireToken(dynamicsWebApiCallback) {
    function adalCallback(error, token) {
        if (!error) {
            dynamicsWebApiCallback(token);
        } else {
            console.log("Token has not been retrieved. Error: " + error.stack);
        }
    }

    adalContext.acquireTokenWithUsernamePassword(
        resource,
        username,
        password,
        clientId,
        adalCallback
    );
}

const dynamicsWebApi = new DynamicsWebApi({
    webApiUrl: config.CRMWebAPIURL,
    onTokenRefresh: acquireToken
});

/**
 * END OF DYNAMICS AUTH STUFF
 */

module.exports = {
    findAll: (request, response) => {
        if (request.body.password === "password") {
            const requestBody = {
                collection: "leads",
                select: ["leadsourcecode", "new_referralcode", "statuscode", "createdon", "_accountid_value"],
                orderby: ["createdon desc"],
                filter: `new_referralcode eq '${request.body.code}'`,
                top: "1000",
                ifnonematch: "*"
            };
            dynamicsWebApi
                .retrieveMultipleRequest(requestBody)
                .then((data) => {
                    response.status(200).json(data)
                })
                .catch((error) => {
                    response.status(500).json(error);
                });
        } else {
            console.log("password was wrong");
            response.status(401).json({
                message: "access denied"
            })
        }

    }
}