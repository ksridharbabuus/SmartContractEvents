// Add the web3 node module
var Web3 = require('web3');

// Get the Model Instances
var Organization = models.Organization;
var Service = models.Service;
var ServiceTags = models.ServiceTags;
var Channel = models.Channel;


function main() {

	// Change it MainNet URL for Production Use wss://mainnet.infura.io/ws
	var web3Provider = 'wss://ropsten.infura.io/ws'; 			
	
	// 'https://ropsten.infura.io/API-TOKEN-HERE'
	// In case of local host use it as - 'ws://localhost:8545'

	// Specify web3 provider for the Web3 too look for ethereum nodes
	var web3 = new Web3(new Web3.providers.WebsocketProvider(web3Provider));
    
    web3.eth.net.getId((err, netId) => {
		console.log(netId);

		// Subscribe to MPE Events
		subscribeMPEEvents(web3);
		
		// Subscribe to Registry Events
		subscribeRegistryEvents(web3);

    });

}


function subscribeRegistryEvents(web3)
{
	// Contract Address to check for the events.
    var contractAddrForRegistry = "0x28c674ebe1ac14cf9e338aea1281483fd5d75060";  // Address from Ropsten Deployment

    // Event Listeners will start from this block - Give the Contract Creation Blocknumber as Parameter instead of Zero
    var startingBlock = 4428888;

    // Specify the contract ABI
    var abiRegistry = [{"constant":false,"inputs":[{"name":"orgName","type":"bytes32"},{"name":"newMembers","type":"address[]"}],"name":"addOrganizationMembers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"orgName","type":"bytes32"},{"name":"serviceName","type":"bytes32"},{"name":"tags","type":"bytes32[]"}],"name":"addTagsToServiceRegistration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"orgName","type":"bytes32"},{"name":"repositoryName","type":"bytes32"},{"name":"tags","type":"bytes32[]"}],"name":"addTagsToTypeRepositoryRegistration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"orgName","type":"bytes32"},{"name":"newOwner","type":"address"}],"name":"changeOrganizationOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"orgName","type":"bytes32"},{"name":"members","type":"address[]"}],"name":"createOrganization","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"orgName","type":"bytes32"},{"name":"serviceName","type":"bytes32"},{"name":"metadataURI","type":"bytes"},{"name":"tags","type":"bytes32[]"}],"name":"createServiceRegistration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"orgName","type":"bytes32"},{"name":"repositoryName","type":"bytes32"},{"name":"repositoryURI","type":"bytes"},{"name":"tags","type":"bytes32[]"}],"name":"createTypeRepositoryRegistration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"orgName","type":"bytes32"}],"name":"deleteOrganization","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"orgName","type":"bytes32"},{"name":"serviceName","type":"bytes32"}],"name":"deleteServiceRegistration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"orgName","type":"bytes32"},{"name":"repositoryName","type":"bytes32"}],"name":"deleteTypeRepositoryRegistration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"orgName","type":"bytes32"},{"name":"existingMembers","type":"address[]"}],"name":"removeOrganizationMembers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"orgName","type":"bytes32"},{"name":"serviceName","type":"bytes32"},{"name":"tags","type":"bytes32[]"}],"name":"removeTagsFromServiceRegistration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"orgName","type":"bytes32"},{"name":"repositoryName","type":"bytes32"},{"name":"tags","type":"bytes32[]"}],"name":"removeTagsFromTypeRepositoryRegistration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"orgName","type":"bytes32"},{"name":"serviceName","type":"bytes32"},{"name":"metadataURI","type":"bytes"}],"name":"updateServiceRegistration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"orgName","type":"bytes32"},{"name":"repositoryName","type":"bytes32"},{"name":"repositoryURI","type":"bytes"}],"name":"updateTypeRepositoryRegistration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"orgName","type":"bytes32"}],"name":"OrganizationCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"orgName","type":"bytes32"}],"name":"OrganizationModified","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"orgName","type":"bytes32"}],"name":"OrganizationDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"orgName","type":"bytes32"},{"indexed":true,"name":"serviceName","type":"bytes32"},{"indexed":false,"name":"metadataURI","type":"bytes"}],"name":"ServiceCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"orgName","type":"bytes32"},{"indexed":true,"name":"serviceName","type":"bytes32"},{"indexed":false,"name":"metadataURI","type":"bytes"}],"name":"ServiceMetadataModified","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"orgName","type":"bytes32"},{"indexed":true,"name":"serviceName","type":"bytes32"}],"name":"ServiceTagsModified","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"orgName","type":"bytes32"},{"indexed":true,"name":"serviceName","type":"bytes32"}],"name":"ServiceDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"orgName","type":"bytes32"},{"indexed":true,"name":"typeRepositoryName","type":"bytes32"}],"name":"TypeRepositoryCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"orgName","type":"bytes32"},{"indexed":true,"name":"typeRepositoryName","type":"bytes32"}],"name":"TypeRepositoryModified","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"orgName","type":"bytes32"},{"indexed":true,"name":"typeRepositoryName","type":"bytes32"}],"name":"TypeRepositoryDeleted","type":"event"},{"constant":true,"inputs":[{"name":"orgName","type":"bytes32"}],"name":"getOrganizationByName","outputs":[{"name":"found","type":"bool"},{"name":"name","type":"bytes32"},{"name":"owner","type":"address"},{"name":"members","type":"address[]"},{"name":"serviceNames","type":"bytes32[]"},{"name":"repositoryNames","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"orgName","type":"bytes32"},{"name":"serviceName","type":"bytes32"}],"name":"getServiceRegistrationByName","outputs":[{"name":"found","type":"bool"},{"name":"name","type":"bytes32"},{"name":"metadataURI","type":"bytes"},{"name":"tags","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"orgName","type":"bytes32"},{"name":"repositoryName","type":"bytes32"}],"name":"getTypeRepositoryByName","outputs":[{"name":"found","type":"bool"},{"name":"name","type":"bytes32"},{"name":"repositoryURI","type":"bytes"},{"name":"tags","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"listOrganizations","outputs":[{"name":"orgNames","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"orgName","type":"bytes32"}],"name":"listServicesForOrganization","outputs":[{"name":"found","type":"bool"},{"name":"serviceNames","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tag","type":"bytes32"}],"name":"listServicesForTag","outputs":[{"name":"orgNames","type":"bytes32[]"},{"name":"serviceNames","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"listServiceTags","outputs":[{"name":"tags","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"orgName","type":"bytes32"}],"name":"listTypeRepositoriesForOrganization","outputs":[{"name":"found","type":"bool"},{"name":"repositoryNames","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tag","type":"bytes32"}],"name":"listTypeRepositoriesForTag","outputs":[{"name":"orgNames","type":"bytes32[]"},{"name":"repositoryNames","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"listTypeRepositoryTags","outputs":[{"name":"tags","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"}]

    // Create the contract instance from the given ABI & Contract Address
    var instanceContractRegistry = new web3.eth.Contract(abiRegistry, contractAddrForRegistry);

    // In case of specific events & filters
    //var evt =instanceContractRegistry.ChannelOpen({sender: senderAddress}, {fromBlock: startingBlock, toBlock: 'latest'});

	// Search the contract events for the hash in the event logs and show matching events.
    
    // For the Bug in Web3js Beta 36 - Fix to read events only when we have indexed parameters to events...
    web3.eth.abi.decodeParameters = function(outputs, bytes) {
        if (bytes === '0x') bytes = '0x00'
        return web3.eth.abi.__proto__.decodeParameters(outputs, bytes)
    }

	var evt = instanceContractRegistry.events.allEvents({fromBlock: 4394767, toBlock: 'latest'}, function(err, result) {

        //console.log(result);        
		if (err) {
			console.log("Error while watching for contract events => " + err); // Log the error in common log storage. May be need a notification
		}
		else {

                var orgNameHex, serviceNameHex, typeRepoNameHex;
                var orgName, serviceName, typeRepoName;

                var event = result.event;
                orgNameHex = result.returnValues.orgName;
                orgName = web3.utils.hexToString(orgNameHex);

                switch (event) {

                    // Organization related Events
                    case "OrganizationCreated":             // Intentianally not kept break as the following case to execute
                    case "OrganizationModified":
                        // CreateOrUpdate the Organization - OrgName and Members
                        //console.log("event2: " + event + "->" + orgNameHex + "->" + orgName);

                        // Get the Members for the given Org from BlockChain
                        instanceContractRegistry.methods.getOrganizationByName(orgNameHex).call((err, result) => {
                            if(err){
                                console.log("Error in extracting the org details: " + orgName);
                            }
                            else {
                                // console.log("Org Result...");
                                // console.log(result);
                                createOrUpdateOrg(orgName, result.owner, result.members);
                            }
                        });
                        
                        break;
                    case "OrganizationDeleted":

                        // Delete the Organization including the heirarchy
                        //console.log("event3: " + event);
                        deleteOrg(orgName);

                        break;

                    // Service Related Events
                    case "ServiceCreated":
                    case "ServiceMetadataModified":
                    case "ServiceTagsModified":

                        // CreateOrUpdate the Service in the Orgnization

                        serviceNameHex = result.returnValues.serviceName;
                        serviceName = web3.utils.hexToString(serviceNameHex);
                        metadataURI = web3.utils.hexToString(result.returnValues.metadataURI);

                        //console.log("event4: " + event + "->" + orgNameHex + "->" + orgName + "->" + serviceNameHex + "->" + serviceName);

                        // Get the latest service data from Blockchain
                        instanceContractRegistry.methods.getServiceRegistrationByName(orgNameHex, serviceNameHex).call((err, result) => {

                            var tags = [];

                            if(err) {
                                console.log("Error in extracting the service details: " + orgName + "->" + serviceName)
                            }
                            else {
                                //console.log(result);
                                tags = result.tags;
                                // Convert hex to string for every tag
                                for(var i=0; i<tags.length; i++) {
                                    tags[i] = web3.utils.hexToString(tags[i]);
                                }

                                createOrUpdateService(orgName, serviceName, metadataURI, tags);
                                
                            }

                        });

                        break;
                    case "ServiceDeleted":
                        // Delete the Service inside the Organization including the service heirarchy - Tags

                        serviceNameHex = result.returnValues.serviceName;
                        serviceName = web3.utils.hexToString(serviceNameHex);
                        //console.log("event5: " + event + "->" + orgNameHex + "->" + orgName + "->" + serviceNameHex + "->" + serviceName);

                        deleteService(orgName, serviceName);
                        break;

                    // Type Repo Related Events
                    case "TypeRepositoryCreated":
                    case "TypeRepositoryModified":
                        // CreateOrUpdate the TypeRepo in the Orgnization
                        typeRepoNameHex = result.returnValues.typeRepositoryName;
                        typeRepoName = web3.utils.hexToString(typeRepoNameHex);
                        repositoryURI = web3.utils.hexToString(result.returnValues.repositoryURI);

                        // Get the latest service data from Blockchain
                        instanceContractRegistry.methods.getTypeRepositoryByName(orgNameHex, typeRepoNameHex).call((err, result) => {

                            var tags = [];

                            if(err) {
                                console.log("Error in extracting the Type Repo details: " + orgName + "->" + typeRepoName)
                            }
                            else {
                                //console.log(result);
                                tags = result.tags;
                                // Convert hex to string for every tag
                                for(var i=0; i<tags.length; i++) {
                                    tags[i] = web3.utils.hexToString(tags[i]);
                                }

                                createOrUpdateTypeRepo(orgName, typeRepoName, repositoryURI, tags);
                                
                            }

                        });

                        break;
                    case "TypeRepositoryDelete":
                        // Delete the Type Repo in the Organization including the heirarchy - Tags
                        
                        typeRepoNameHex = result.returnValues.typeRepositoryName;
                        typeRepoName = web3.utils.hexToString(typeRepoNameHex);
                        //console.log("event5: " + event + "->" + orgNameHex + "->" + orgName + "->" + typeRepoNameHex + "->" + typeRepoName);

                        deleteTypeRepo(orgName, typeRepoName);
                        break;

                    default:
                        // Do nothing

                } // end switch

        } //end else
        
	}); // End All Events Subscription

} // End Fun

function subscribeMPEEvents(web3) {

    // Token Decimals
    var decimals = 8;

    // Contract Address to check for the events.
    var contractAddrForMPE = "0x48902673a046094d37e3fcae8187a30a201efb16";//"0x7e06cecbac16e33692dee141d73dbbb807a09b4c";  // Address from Ropsten Deployment

    // Event Listeners will start from this block - Give the Contract Creation Blocknumber as Parameter instead of Zero
    var startingBlock = 4394767;

    // Specify the contract ABI
    var abiMPE = [{"constant":false,"inputs":[{"name":"channelId","type":"uint256"},{"name":"newExpiration","type":"uint256"},{"name":"amount","type":"uint256"}],"name":"channelExtendAndAddFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"},{"name":"expiration","type":"uint256"},{"name":"groupId","type":"bytes32"},{"name":"signer","type":"address"}],"name":"depositAndOpenChannel","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"withdraw","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"channelId","type":"uint256"},{"name":"newExpiration","type":"uint256"}],"name":"channelExtend","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"deposit","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"channelId","type":"uint256"}],"name":"channelClaimTimeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"channelId","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"},{"name":"isSendback","type":"bool"}],"name":"channelClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"channelIds","type":"uint256[]"},{"name":"amounts","type":"uint256[]"},{"name":"isSendbacks","type":"bool[]"},{"name":"v","type":"uint8[]"},{"name":"r","type":"bytes32[]"},{"name":"s","type":"bytes32[]"}],"name":"multiChannelClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"channelId","type":"uint256"},{"name":"amount","type":"uint256"}],"name":"channelAddFunds","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"channels","outputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"groupId","type":"bytes32"},{"name":"value","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"expiration","type":"uint256"},{"name":"signer","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"},{"name":"expiration","type":"uint256"},{"name":"groupId","type":"bytes32"},{"name":"signer","type":"address"}],"name":"openChannel","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nextChannelId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_token","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"channelId","type":"uint256"},{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"recipient","type":"address"},{"indexed":true,"name":"groupId","type":"bytes32"},{"indexed":false,"name":"signer","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"expiration","type":"uint256"}],"name":"ChannelOpen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"channelId","type":"uint256"},{"indexed":true,"name":"recipient","type":"address"},{"indexed":false,"name":"claimAmount","type":"uint256"},{"indexed":false,"name":"sendBackAmount","type":"uint256"},{"indexed":false,"name":"keepAmpount","type":"uint256"}],"name":"ChannelClaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"channelId","type":"uint256"},{"indexed":false,"name":"claimAmount","type":"uint256"}],"name":"ChannelSenderClaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"channelId","type":"uint256"},{"indexed":false,"name":"newExpiration","type":"uint256"}],"name":"ChannelExtend","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"channelId","type":"uint256"},{"indexed":false,"name":"additionalFunds","type":"uint256"}],"name":"ChannelAddFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"receiver","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"TransferFunds","type":"event"}]

    // Create the contract instance from the given ABI & Contract Address
    var instanceContractMPE = new web3.eth.Contract(abiMPE, contractAddrForMPE);

    // In case of specific events & filters
    //var evt =instanceContractMPE.ChannelOpen({sender: senderAddress}, {fromBlock: startingBlock, toBlock: 'latest'});

    // Search the contract events for the hash in the event logs and show matching events.
    var evt = instanceContractMPE.events.allEvents({fromBlock: 4394767, toBlock: 'latest'}, function(err, result) {


console.log(result);        
        if (err) {
            console.log("Error while watching for contract events => " + err)
        }
        else
        {
            // Get the event name
            var event = result.event;
console.log("event: " + event)
            if(event == "ChannelOpen")
            {
                // Insert a record into the persistent storage
                var channelId = result.returnValues.channelId;
                var sender = result.returnValues.sender;
                var recipient = result.returnValues.recipient; 
                var groupId = result.returnValues.groupId;
                
                var amount = result.returnValues.amount;
                amount = (web3.utils.fromWei(amount)) * (10**(18-decimals));
                var nonce = 0; // For new channel
                var expiration = result.returnValues.expiration;
                var signer = result.returnValues.signer;

                console.log("channelId : " + channelId);

                // Call function to insert into the storage
                createChannel(channelId, sender, recipient, groupId, amount, nonce, expiration, signer);

            }
            else if(event != "TransferFunds" && (event == "ChannelClaim" || event == "ChannelSenderClaim" || event  == "ChannelExtend" || event == "ChannelAddFunds")) {
                // Update the details by reading the values from Blockchain
                var channelId = result.returnValues.channelId;

                console.log("channelId for Update : " + channelId);

                // Get the channle details
                instanceContractMPE.methods.channels(channelId).call((err, channel) => {

                    if (err) {
                        console.log("Error while fetching channel " + channelId + " details => " + err); // See if we can log the error into log files
                        return;
                    }

                    var sender = channel[0];
                    var recipient = channel[1];
                    var groupId = channel[2];
                    var value = channel[3];
                    value = (web3.utils.fromWei(value)) * (10**(18-decimals)); 
                    var nonce = channel[4];
                    var expiration = channel[5];
                    var signer = channel[6];

                    console.log("sender: " + sender);

                    // Call the function to update with the latest channel details
                    updateChannel(channelId, sender, recipient, groupId, value, nonce, expiration, signer);

                });
            }
        }
    });

}


// **************************** Database Operation ******************************



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


// *************************** Yet to implement for Type Repos *********************


function createOrUpdateTypeRepo(orgName, typeRepoName, repositoryURI, tags) {
    console.log("createOrUpdateTypeRepo: " + orgName + "-" + typeRepoName + "-" + repositoryURI);
    for(var i=0; i< tags.length; i++)
    {
        console.log("tags -> " + tags[i]);
    }

    // Get the IPFS Hash using repositoryURI
}

function deleteTypeRepo(orgName, typeRepoName) {
    console.log("deleteTypeRepo: " + orgName + "-" + typeRepoName);
}

// Call main function to initiate the call
main();

// Use utilities like forever to run this code forever as we have the subscription for the events