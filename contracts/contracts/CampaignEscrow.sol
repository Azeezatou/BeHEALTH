// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CampaignEscrow {
    string public campaignId;
    address payable public beneficiary;
    uint256 public goalAmount;
    uint256 public deadline;
    address public platform;
    uint256 public constant FEE_BPS = 250;

    uint256 public totalRaised;
    bool public released;
    bool public refundEnabled;

    mapping(address => uint256) public donations;
    address[] public donors;

    event DonationReceived(string indexed campaignId, address indexed donor, uint256 amount);
    event FundsReleased(string indexed campaignId, address indexed beneficiary, uint256 amount);
    event RefundClaimed(string indexed campaignId, address indexed donor, uint256 amount);
    event RefundEnabled(string indexed campaignId);

    modifier onlyPlatform() {
        require(msg.sender == platform, "Not authorised");
        _;
    }

    constructor(
        string memory _campaignId,
        address payable _beneficiary,
        uint256 _goalAmount,
        uint256 _deadline,
        address _platform
    ) {
        campaignId = _campaignId;
        beneficiary = _beneficiary;
        goalAmount = _goalAmount;
        deadline = _deadline;
        platform = _platform;
    }

    function donate() public payable {
        require(!released && !refundEnabled, "Campaign closed");
        require(msg.value > 0, "Zero value");
        if (donations[msg.sender] == 0) {
            donors.push(msg.sender);
        }
        donations[msg.sender] += msg.value;
        totalRaised += msg.value;
        emit DonationReceived(campaignId, msg.sender, msg.value);
    }

    function releaseFunds() external onlyPlatform {
        require(!released, "Already released");
        require(!refundEnabled, "Refund active");
        require(totalRaised >= goalAmount, "Goal not met");
        released = true;
        uint256 fee = (totalRaised * FEE_BPS) / 10000;
        uint256 payout = totalRaised - fee;
        (bool sentFee,) = payable(platform).call{value: fee}("");
        (bool sentMain,) = beneficiary.call{value: payout}("");
        require(sentFee && sentMain, "Transfer failed");
        emit FundsReleased(campaignId, beneficiary, payout);
    }

    function enableRefund() external onlyPlatform {
        require(!released, "Already released");
        refundEnabled = true;
        emit RefundEnabled(campaignId);
    }

    function claimRefund() external {
        require(refundEnabled, "Refunds not enabled");
        uint256 amount = donations[msg.sender];
        require(amount > 0, "Nothing to refund");
        donations[msg.sender] = 0;
        (bool sent,) = payable(msg.sender).call{value: amount}("");
        require(sent, "Refund failed");
        emit RefundClaimed(campaignId, msg.sender, amount);
    }

    function getDonorCount() external view returns (uint256) {
        return donors.length;
    }

    receive() external payable {
        donate();
    }
}
