const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
  'track drink champion casino above hamster innocent donkey aerobic close fluid pond',
  'https://rinkeby.infura.io/v3/e9119dac50e24e0ebe653e1c4694e824' // 3rd party node in ethereum network
)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from account ', accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!']})
    .send({ gas: '1000000', from: accounts[0] })

  console.log('Contract deployed to ', result.options.address)
}

deploy();
