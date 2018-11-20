var models = require("./models");
const Sequelize = require('sequelize');


// Get the Model Instances
var Organization = models.Organization;
var Service = models.Service;
var ServiceTags = models.ServiceTags;
var Channel = models.Channel;


var orgName, owner;
orgName = 'SriORM1';
owner = '0xbAaB5cac3C8adA9F04D987AaeB4267a4d3f692f1';


var sender = '0xbAaB5cac3C8adA9F04D987AaeB4267a4d3f692f1'
var recipient = '0xC4f3BFE7D69461B7f363509393D44357c084404c'
var groupId = '0xc4f3bfe7d69461b7f363509393d44357c084404c000000000000000000000000'
var value = 10000000000005000000
var nonce = 0
var expiration = 5394867
var signer = '0xC4f3BFE7D69461B7f363509393D44357c084404c'

//createChannel(50,'0xbAaB5cac3C8adA9F04D987AaeB4267a4d3f692f1','0xC4f3BFE7D69461B7f363509393D44357c084404c','0xc4f3bfe7d69461b7f363509393d44357c084404c000000000000000000000000',1.5,0,5394767,'0xC4f3BFE7D69461B7f363509393D44357c084404c');

// createOrUpdateOrg("SriOrg10","0xbAaB5cac3C8adA9F04D987AaeB4267a4d3f692f1", ["0xbAaB5cac3C8adA9F04D987AaeB4267a4d3f692f1","0xbAaB5cac3C8adA9F04D987AaeB4267a4d3f692f2","0xbAaB5cac3C8adA9F04D987AaeB4267a4d3f692f3"])
//deleteOrg("SriOrg10");

// createOrUpdateService("SriOrg10", "SriOrg10Ser1", "metadataURI1", ["Tag11","Tag12","Tag13"]);
// createOrUpdateService("SriOrg10", "SriOrg10Ser2", "metadataURI1", ["Tag21","Tag22","Tag23"]);
// createOrUpdateService("SriOrg10", "SriOrg10Ser3", "metadataURI1", ["Tag31","Tag32","Tag33"]);
//deleteService("SriOrg10", "SriOrg10Ser1");


function createChannel(channelId, sender, recipient, groupId, value, nonce, expiration, signer){
    // Still check for the existance of the channel in case if we rerun from the starting block number
    
    Channel.findOrCreate({where: {channel_id: channelId}, defaults: {sender: sender, recipient: recipient, groupId: groupId, balance: value, pending: 0, nonce: nonce, expiration: expiration, signer: signer}})
    .spread((channel, created) => {
        console.log("New channel created: " + channel.channel_id + "->" + created);
        if(!created) {
            // In case if the channel already exists update it
            updateChannel(channelId, sender, recipient, groupId, value, nonce, expiration, signer) 
        }
    });

}

function updateChannel(channelId, sender, recipient, groupId, value, nonce, expiration, signer) {
    // Definitely it will be an update until unless there was an error with the createChannel
    Channel.findOne({ where:  {channel_id: channelId} })
    .then(channel => {
        console.log("channel Found: " + channel);
        if(channel) {
            Channel.update({sender: sender, recipient: recipient, groupId: groupId, balance: value, pending: 0, nonce: nonce, expiration: expiration, signer: signer},
                { 
                    where: {channel_id: channelId}
                }
            );
        }
        else{
            // Insert the new record into the Channel Table
            Channel.create({channel_id: channelId, sender: sender, recipient: recipient, groupId: groupId, balance: value, pending: 0, nonce: nonce, expiration: expiration, signer: signer});
        }
    }).catch(function(err) {
        console.log("Error while executing the query -> " + err);
    });

}


function createOrUpdateOrg(orgName, owner, members) {
    console.log("createOrUpdateOrg: " + orgName + "->" + owner);
    Organization.findOrCreate({where: {organization_name: orgName}, defaults: {owner_address: owner}})
    .spread((organization, created) => {
        console.log("New Organization created: " + organization.organization_name + "->" + created)
    });

    console.log("**************************TODO - Need to add members**************************************")
}

function deleteOrg(orgName) {
    console.log("deleteOrg: " + orgName);
    Organization.destroy({
        where: {organization_name:  orgName}
    }).then(() => {
        Service.destroy({
            where: {organization_name: orgName}
        });
    }); // Need to get into one transaction - TODO

    // Delete the Respective Services as well
    //deleteAllServices(orgName);
}


function createOrUpdateService(orgName, serviceName, metadataURI, tags) {
    console.log("createOrUpdateService: " + orgName + "-" + serviceName + "-" + metadataURI);

    var tagsjson = [];
    
    Service.findOrCreate({where: {organization_name: orgName, service_name: serviceName}, defaults: {ipfs_hash: metadataURI, service_path: '', is_curated: 0}})
    .spread((service, created) => {
        console.log("New Service created: " + service.organization_name + "->" + service.service_name + "->" + created)
        if(!created)
        {
            Service.update({ipfs_hash: metadataURI},
                { 
                    where: {organization_name: orgName, service_name: serviceName}
                }
            );

            // Delete all tags
            ServiceTags.destroy({
                where: {service_id:  service.row_id}
            });
        }

        tags.forEach(element => {
            tagsjson.push({ service_id: service.row_id, tag_name:  element });
        });

        if(tagsjson.length > 0) {
            ServiceTags.bulkCreate(tagsjson)
            .then(st => { console.log("service tags updated successfully"); })
            .catch(err => { console.log("error " + err )});
        }

    });

    // Get the IPFS Hash using metaDataURI

}

function deleteService(orgName, serviceName) {
    console.log("deleteService: " + orgName + "-" + serviceName);

    Service.findOne({where: {organization_name: orgName, service_name: serviceName}})
    .then(service => {
        Service.destroy({
            where: {row_id: service.row_id}
        });

        // Following script not required as Cascade Delete is applied on the table 
        // ServiceTags.destroy({
        //     where: {service_id: service.row_id}
        // });
    });

}

function deleteAllServices(orgName) {
    console.log("deleteService: " + orgName);
    Service.destroy({
        where: {organization_name: orgName}
    });
}





//**************************Sample Codes  ***********************************************************/

// Organization.findOrCreate({where: {organization_name: orgName}, defaults: {owner_address: owner}})
// .spread((organization, created) => {
//     console.log("New Organization created: " + organization.organization_name + "->" + created)
// });


// var orgs = ["SriORM1","SriORM2", "SriORM3", "SriORM4"];
// var orgjson = [];
// orgs.forEach(element => {
//     orgjson.push({  organization_name:  element });
// });

// console.log(JSON.stringify(orgjson));

// Organization.bulkCreate(orgjson)
// .then(org => { console.log("updated successfully"); })
// .catch(err => { console.log("error " + err )});


// Organization.destroy({
//     where: {organization_name: ["SriORM1","SriORM2", "SriORM3", "SriORM4"]}
// });



// Organization.destroy({
//     where: {organization_name:  orgName}
// });

// Organization.findOne({ where: { organization_name:  orgName} })
// .then(organization => { 
//     console.log(organization.organization_name);
//     Organization.destroy({
//         where: {organization_name:  orgName}
//     });

// });

// Organization.findOne({ where: { organization_name:  orgName} })
// .then(organization => {
//     console.log("Organization Found: " + organization);
//     if(organization) {
//         console.log("owner -> " + organization.owner_address);
//         Organization.update({
//             owner_address: owner
//             },
//             { 
//                 where: { organization_name: orgName,  owner_address: owner} 
//             }
//         );
//     }
//     else{
//         // Insert the new record into the Organization Table
//         Organization.create({
//             organization_name: orgName,
//             owner_address: owner
//         });
//     }
// }).catch(function(err) {
//     console.log("Error while executing the query -> " + err);
// });

//Organization.build({organization_name: 'SriOrg1', owner_address: '0xbAaB5cac3C8adA9F04D987AaeB4267a4d3f692f1'});
// BulkCreate


// Delete All
// const Op = Sequelize.Op;
// ServiceTags.destroy({where: {service_id: {[Op.gt]: 0} }});