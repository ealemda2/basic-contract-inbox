const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3') // Web3 constructor

const provider = ganache.provider()
const web3 = new Web3(provider) // create web3 instance and hook up through ganache provider

const {interface, bytecode} = require('../compile')

const INITIAL_MSG = 'Hi there'

let accounts;
let inbox; // the contract variable

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts()

  // Use one to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there'] })
    .send({ from: accounts[0], gas: '1000000' })

  inbox.setProvider(provider)
})

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address)
  })

  it('has a default message', async () => {
    const message = await inbox.methods.message().call()
    assert.equal(message, INITIAL_MSG)
  })

  it('can edit message', async () => {
    const string = 'change is inevitable'
    await inbox.methods.setMessage(string).send({ from: accounts[0] })
    const message = await inbox.methods.message().call()
    assert.equal(message, string)
  })
})
