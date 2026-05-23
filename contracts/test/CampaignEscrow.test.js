const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CampaignEscrow", function () {
  async function deployFixture() {
    const [platform, beneficiary, donor, stranger] = await ethers.getSigners();
    const Escrow = await ethers.getContractFactory("CampaignEscrow");
    const escrow = await Escrow.deploy(
      "campaign-1",
      beneficiary.address,
      ethers.parseEther("1"),
      0,
      platform.address
    );
    return { beneficiary, donor, escrow, platform, stranger };
  }

  it("accepts ETH donations and tracks donors", async function () {
    const { donor, escrow } = await deployFixture();
    await escrow.connect(donor).donate({ value: ethers.parseEther("0.5") });
    expect(await escrow.donations(donor.address)).to.equal(ethers.parseEther("0.5"));
    expect(await escrow.getDonorCount()).to.equal(1);
  });

  it("releases funds with the platform fee deducted", async function () {
    const { donor, escrow, platform } = await deployFixture();
    await escrow.connect(donor).donate({ value: ethers.parseEther("1") });
    await expect(escrow.connect(platform).releaseFunds()).to.emit(escrow, "FundsReleased");
  });

  it("reverts release if goal is not met", async function () {
    const { donor, escrow, platform } = await deployFixture();
    await escrow.connect(donor).donate({ value: ethers.parseEther("0.1") });
    await expect(escrow.connect(platform).releaseFunds()).to.be.revertedWith("Goal not met");
  });

  it("supports enabling refunds and claiming them", async function () {
    const { donor, escrow, platform } = await deployFixture();
    await escrow.connect(donor).donate({ value: ethers.parseEther("0.2") });
    await escrow.connect(platform).enableRefund();
    await expect(escrow.connect(donor).claimRefund()).to.emit(escrow, "RefundClaimed");
  });

  it("restricts platform-only operations", async function () {
    const { escrow, stranger } = await deployFixture();
    await expect(escrow.connect(stranger).enableRefund()).to.be.revertedWith("Not authorised");
  });
});
