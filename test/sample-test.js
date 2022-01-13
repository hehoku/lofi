const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Lofi', function () {
  // test get lofi list after deploy
  it('should get lofi list', async function () {
    const Lofi = await ethers.getContractFactory('Lofi')
    const lofi = await Lofi.deploy()
    await lofi.newLofi('hi')
    let lofiList = await lofi.getAllLofis()
    expect(lofiList[0].lofiUrl).to.equal('hi')
    console.log(lofiList[0])
    expect(lofiList[0].upvoteCount.toNumber()).to.equal(0)
  })

  it('should change upvoteCount after upvoted', async function () {
    const Lofi = await ethers.getContractFactory('Lofi')
    const lofi = await Lofi.deploy()
    await lofi.newLofi('hi')
    let lofiList = await lofi.getAllLofis()
    expect(lofiList[0].upvoteCount.toNumber()).to.equal(0)
    await lofi.upvote(0)
    lofiList = await lofi.getAllLofis()
    console.log(lofiList)
    expect(lofiList[0].upvoteCount.toNumber()).to.equal(1)
  })

  // test send tip to lofi submitter
  it('should send tip to lofi submitter', async function () {
    const lofi = await ethers.getContractFactory('Lofi')
    const lofiInstance = await lofi.deploy()
    await lofiInstance.newLofi('hi')
    let lofiList = await lofiInstance.getAllLofis()
    expect(lofiList[0].upvoteCount.toNumber()).to.equal(0)
    await lofiInstance.tip(0)
  })
})
