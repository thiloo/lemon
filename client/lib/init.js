// if (typeof web3 !== 'undefined') {
//   // Use Mist/MetaMask's provider
//   web3 = new Web3(web3.currentProvider);
// } else {
//   console.log('No web3? You should consider trying MetaMask!')
//   // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
//   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// }


// for development purposes uses MetaMask to connect to an external node use code below

web3 = new Web3();

// if(typeof web3 === 'undefined')
//     web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
