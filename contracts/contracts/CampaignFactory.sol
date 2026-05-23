// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CampaignEscrow.sol";

contract CampaignFactory {
    address public owner;
    mapping(string => address) public campaignContracts;

    event CampaignDeployed(string indexed campaignId, address escrowAddress, address beneficiary);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorised");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function deployCampaign(
        string calldata campaignId,
        address payable beneficiary,
        uint256 goalAmount,
        uint256 deadline
    ) external onlyOwner returns (address) {
        require(campaignContracts[campaignId] == address(0), "Already deployed");
        CampaignEscrow escrow = new CampaignEscrow(
            campaignId,
            beneficiary,
            goalAmount,
            deadline,
            owner
        );
        campaignContracts[campaignId] = address(escrow);
        emit CampaignDeployed(campaignId, address(escrow), beneficiary);
        return address(escrow);
    }
}
