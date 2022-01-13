/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config()
require('@nomiclabs/hardhat-ethers')

const { API_URL, PRIVATE_KEY } = process.env

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

module.exports = {
  solidity: '0.8.9',
  defaultNetwork: 'polygon_mumbai',
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      gas: 2100000,
      gasPrice: 8000000000
    }
  },
  mocha: {
    timeout: 100000
  }
}
