// import ipfsApi from 'ipfs-api';
import ipfs from 'ipfs-js'
import jsonfile from 'jsonfile';
import fs from 'fs';
import Future from 'fibers/future';

// const ipfs = ipfsApi('/ip4/127.0.0.1/tcp/5001');
ipfs.setProvider(require('ipfs-api')('localhost', '5001'));

Meteor.methods({
    'ipfs.saveJson'(id, obj) {
        const future = new Future();
        const { title, description, quantity, units, additionalFields } = obj;
        let json = { title, description, quantity, units };
        
        additionalFields.forEach(field => {
            json[field.title] = field.content;
        });
        // ipfs.addJson(json, (err, hash) => console.log(err, hash));
        const file = `../../../../../server/temp/${id}.json`;
        // create a json File locally
        jsonfile.writeFile(file, json, (err) => {
            if(!err) {
                // store JSON File on ipfs
                ipfs.api.util.addFromFs(file, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    // return the ipfs hash
                    future.return(result[0]);
                    // remove the local file
                    fs.unlink(file);
                });
            }
        });
        return future.wait();
    },
    'ipfs.getJson'(hash) {
        const future = new Future();
        // retrieve file from ipfs and pass back as JSON object
        ipfs.catJson(hash, (err, file) => {
            if(!err) future.return(file);
        });
        return future.wait();
    }
});
