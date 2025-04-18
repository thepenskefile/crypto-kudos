// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Kudos {
    struct Kudo {
        address from;
        address to;
        string message;
        uint256 timestamp;
        bytes32 transactionHash;
    }

    struct PaginatedKudos {
        Kudo[] kudos;
        uint256 currentPage;
        uint256 pageSize;
        uint256 totalPages;
        uint256 totalItems;
    }

    struct SendKudoParams {
        address to;
        string message;
    }

    struct GetKudosParams {
        uint256 page;
        uint256 pageSize;
    }

    // Mapping from sender address to their sent kudos
    mapping(address => Kudo[]) private kudosSent;
    // Mapping from receiver address to their received kudos
    mapping(address => Kudo[]) private kudosReceived;
    // Total count of kudos for pagination
    uint256 private totalKudos;

    event KudoSent(address indexed from, address indexed to, string message, bytes32 transactionHash);

    function sendKudo(SendKudoParams calldata params) external {
        require(params.to != address(0), "Cannot send to zero address");
        require(params.to != msg.sender, "Cannot send kudos to yourself");
        
        bytes32 txHash = blockhash(block.number - 1);
        
        Kudo memory newKudo = Kudo({
            from: msg.sender,
            to: params.to,
            message: params.message,
            timestamp: block.timestamp,
            transactionHash: txHash
        });

        // Store in both mappings
        kudosSent[msg.sender].push(newKudo);
        kudosReceived[params.to].push(newKudo);
        totalKudos++;

        emit KudoSent(msg.sender, params.to, params.message, txHash);
    }

    function getKudosSent(GetKudosParams calldata params) external view returns (PaginatedKudos memory) {
        require(params.pageSize > 0, "Page size must be greater than 0");
        
        Kudo[] storage sentKudos = kudosSent[msg.sender];
        uint256 totalItems = sentKudos.length;
        uint256 totalPages = (totalItems + params.pageSize - 1) / params.pageSize;
        
        // Adjust page if it's out of bounds
        uint256 page = params.page;
        if (page >= totalPages) {
            page = totalPages > 0 ? totalPages - 1 : 0;
        }
        
        uint256 start = page * params.pageSize;
        uint256 end = start + params.pageSize;
        
        if (end > totalItems) {
            end = totalItems;
        }
        
        uint256 resultSize = end - start;
        Kudo[] memory result = new Kudo[](resultSize);
        
        for (uint256 i = 0; i < resultSize; i++) {
            result[i] = sentKudos[start + i];
        }
        
        return PaginatedKudos({
            kudos: result,
            currentPage: page,
            pageSize: params.pageSize,
            totalPages: totalPages,
            totalItems: totalItems
        });
    }

    function getKudosReceived(GetKudosParams calldata params) external view returns (PaginatedKudos memory) {
        require(params.pageSize > 0, "Page size must be greater than 0");
        
        Kudo[] storage receivedKudos = kudosReceived[msg.sender];
        uint256 totalItems = receivedKudos.length;
        uint256 totalPages = (totalItems + params.pageSize - 1) / params.pageSize;
        
        // Adjust page if it's out of bounds
        uint256 page = params.page;
        if (page >= totalPages) {
            page = totalPages > 0 ? totalPages - 1 : 0;
        }
        
        uint256 start = page * params.pageSize;
        uint256 end = start + params.pageSize;
        
        if (end > totalItems) {
            end = totalItems;
        }
        
        uint256 resultSize = end - start;
        Kudo[] memory result = new Kudo[](resultSize);
        
        for (uint256 i = 0; i < resultSize; i++) {
            result[i] = receivedKudos[start + i];
        }
        
        return PaginatedKudos({
            kudos: result,
            currentPage: page,
            pageSize: params.pageSize,
            totalPages: totalPages,
            totalItems: totalItems
        });
    }

    function getKudosSentCount() external view returns (uint256) {
        return kudosSent[msg.sender].length;
    }

    function getKudosReceivedCount() external view returns (uint256) {
        return kudosReceived[msg.sender].length;
    }
}