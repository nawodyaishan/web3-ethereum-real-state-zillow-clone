const {expect} = require('chai');
const {ethers} = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Escrow', () => {
    it('should saves nft address', async function () {
        const realEstateContract = await ethers.getContractFactory(`RealEstate`)
        realEstate = await realEstateContract.deploy()
        console.log(realEstate.address)

    });

})
