const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "hire improve unfair loud quick walnut boat galaxy caught pool taste retire",
  "https://rinkeby.infura.io/v3/6a6afac30d324ca1b881316e87951807"
);

const web3 = new Web3(provider);

// this function is only so we can use async/await
// async/await must be called inside a function

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("deploy from account", accounts[0]);
  // the interface is the ABI
  // the ABI allows us to interact with the etherium network using JS
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x' + bytecode, arguments: ["This is the initial message"] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("contract deployed to: ", result.options.address);
};

deploy();
