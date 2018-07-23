const assert = require("assert");
const ganache = require("ganache-cli");
// 'Web3' is capitalized because it is a constructor function
// it is used to make instances of the web3 library
const Web3 = require("web3");
// this is an instance of 'Web3'
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;
const INITIAL_MESSAGE = "Hi there";

beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // use one of those accounts to deploy the contract
  // 'Contract' has a capital letter because it is a constructor function
  // see 'new contract setup' bookmark in tutorial
  // note: this 'inbox' is our contract; we can access our functions from it
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    // out contract requires an  'initialMessage' on initialization
    // it's asked for in it's constructor function
    .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
    .send({ from: accounts[0], gas: "1000000" });

  inbox.setProvider(provider);
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_MESSAGE);
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("new message").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "new message");
  });
});

// class Car {
//   park() {
//     return "stopped";
//   }

//   drive() {
//     return "vroom";
//   }
// }

// let car;

// beforeEach(() => {
//   car = new Car();
// });

// describe("Car", () => {
//   it("can park", () => {
//     assert.equal(car.park(), "stopped");
//   });

//   it("can drive", () => {
//     assert.equal(car.drive(), "vroom");
//   });
// });
