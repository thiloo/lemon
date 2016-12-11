import ipfsApi from 'ipfs-api';
import jsonfile from 'jsonfile';
import fs from 'fs';
import Future from 'fibers/future';

const ipfs = ipfsApi('/ip4/127.0.0.1/tcp/5001');

Meteor.methods({
    'ipfs.saveJson'(id, obj) {
        const future = new Future();
        const { title, description, value, units, additionalFields } = obj;
        let json = { title, description, value, units };

        additionalFields.forEach(field => {
            json[field.title] = field.content;
        });

        const file = `../../../../../server/temp/${id}.json`;
        // create a json File locally
        jsonfile.writeFile(file, json, (err) => {
            if(!err) {
                // store JSON File on ipfs
                ipfs.util.addFromFs(file, (err, result) => {
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
    }
});
