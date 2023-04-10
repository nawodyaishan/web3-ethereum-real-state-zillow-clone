const {expect} = require('chai');
const {ethers} = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Escrow', () => {
    let buyer, seller
    let realEstate
    let escrow
    beforeEach(`Contract Deployment`, async () => {
        // Setup accounts
        [buyer, seller, inspectorAddress, lender] = await ethers.getSigners()

        // Deploy realState
        const realEstateContract = await ethers.getContractFactory(`RealEstate`)
        realEstate = await realEstateContract.deploy()

        // Mint Fn
        let transaction = await realEstate.connect(seller).mint("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS")
        await transaction.wait()

        // Deploy Escrow
        const Escrow = await ethers.getContractFactory('Escrow')
        escrow = await Escrow.deploy(realEstate.address, seller.address, inspectorAddress.address, lender.address)

        // Approve Property
        transaction = await realEstate.connect(seller).approve(escrow.address, 1)
        await transaction.wait()

        // List Property
        transaction = await escrow.connect(seller).list(1)
        await transaction.wait()
    })


    describe(`Deployment`, () => {
        it('should return nft address', async () => {
            let resultAddress = await escrow.nftAddress()
            expect(resultAddress).to.be.eq(realEstate.address)
        });

        it('should return seller', async () => {
            let resultAddress = await escrow.seller()
            expect(resultAddress).to.be.eq(seller.address)
        });

        it('should return inspector', async () => {
            let resultAddress = await escrow.inspectorAddress()
            expect(resultAddress).to.be.eq(inspectorAddress.address)
        });

        it('should return lender', async () => {
            let resultAddress = await escrow.lender()
            expect(resultAddress).to.be.eq(lender.address)
        });
    })

    describe(`Listings`, () => {
        it('should update the ownership', async () => {
            expect(await realEstate.ownerOf(1)).to.be.eq(escrow.address)
        });

        it('should update is listed', async () => {
            const result = await escrow.isListed(1);
            expect(result).to.be.eq(true);
        });


    })

})
