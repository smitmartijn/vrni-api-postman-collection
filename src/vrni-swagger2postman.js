
// Last updated: 24-01-2019 by Martijn Smit <msmit@vmware.com> or @smitmartijn
//
// This nodejs script takes the vRNI API Swagger specification and turns it into a 
// Postman Collection (https://getpostman.com) for API development in Postman.
// 
// Installing dependancies:
// $ npm i swagger2-postman-generator
// 
// Example usage:
// $ node vrni-swagger2postman.js https://vrni-platform/doc-api/local/swagger/vrni-api-spec-4.0.0.json vRNI-API-Postman-Collection.json vRNI-API-Postman-Environment.json

// ignore invalid SSL certificate
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// make sure we have the proper arguments
if(process.argv.length < 5) {
    console.log("Usage: node vrni-swagger2postman.js <URL-to-vRNI-Swagger-Spec> <Postman-Collection-Output-File> <Postman-Environment-Output-File>");
    return;
}

// save arguments
var vRNISwaggerSpecURL = process.argv[2];
var postmanOutputFile = process.argv[3];
var postmanEnvOutputFile = process.argv[4];

// require dependancies
var S2P = require("swagger2-postman-generator");
var fs = require("fs");

// download the swagger spec and save it into a swagger2-postman-generator object
var collectionObj = S2P.convertSwagger().fromUrl(vRNISwaggerSpecURL);

// generate a Collection JSON structure and write it to file
collectionObj.toPostmanCollectionFile(postmanOutputFile, {
    requestPostProcessor: (postmanRequest, swaggerSpec) => {
        
        // include the Authorization header for all API endpoints except POST /auth/token
        if (!(postmanRequest.url.includes("/auth/token") && postmanRequest.method == 'POST')) {
            postmanRequest.headers += "Authorization: NetworkInsight {{AuthenticationToken}}\n";
        }

        // log our progress
        var httpUrl = postmanRequest.url.replace("{{scheme}}://{{host}}:{{port}}/api/ni", "");
        console.log("Method: " + postmanRequest.method + " - URL: " + httpUrl);
    }
})

// Postman environment options. Add a few variables specific to vRNI
var envOptions =  {
    environment: {
        name: "vRealize Network Insight Environment",
        customVariables: [{ 
            key: "scheme",
            value: "https",
            enabled: true,
            type: "text" 
        },{ 
            key: "host",
            value: "your-vrni-platform-fdqn-or-ip",
            enabled: true,
            type: "text" 
        },{ 
            key: "port",
            value: "443",
            enabled: true,
            type: "text" 
        },{ 
            key: "AuthenticationToken",
            value: "replace-this-with-your-auth-token",
            enabled: true,
            type: "text" 
        }]
    }
};

// write environment options file
collectionObj.toPostmanEnvironmentFile(postmanEnvOutputFile, envOptions);


