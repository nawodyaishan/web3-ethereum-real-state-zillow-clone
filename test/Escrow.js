const {expect} = require('chai');
const {ethers} = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Escrow', () => {

    let buyer, seller
    let realEstate
    it('should saves nft address', async function () {
        // Setup accounts
        [buyer, seller, inspector, lender] = await ethers.getSigners()

        // Deploy realState
        const realEstateContract = await ethers.getContractFactory(`RealEstate`)
        realEstate = await realEstateContract.deploy()
        console.log(realEstate.address)

        // Mint Fn
        let transaction = await realEstate.connect(seller).mint("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS")
        await transaction.wait()
    });

})
