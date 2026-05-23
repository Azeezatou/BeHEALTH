const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CampaignFactory", function () {
  it("deploys unique escrow contracts per campaign id", async function () {
    const [, beneficiary] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("CampaignFactory");
    const factory = await Factory.deploy();

    await expect(
      factory.deployCampaign("campaign-1", beneficiary.address, ethers.parseEther("1"), 0)
    ).to.emit(factory, "CampaignDeployed");

    await expect(
      factory.deployCampaign("campaign-1", beneficiary.address, ethers.parseEther("1"), 0)
    ).to.be.revertedWith("Already deployed");
  });
});
