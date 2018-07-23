const path = require('path');
const fs = require('fs');
const solc = require('solc');

// get the path to our contract what will work on either windows or linux OS
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
// get the contract code
const source = fs.readFileSync(inboxPath, 'utf8');

// when we compile we'll get the actual raw 'bytecode' that we will deploy
// to the etherium network, as well as our interface
// the 'interface' is what allows us to interact with our contracts using JS
module.exports = solc.compile(source, 1).contracts[':Inbox'];