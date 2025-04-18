// AUTO-GENERATED ABI FILE
export const kudosDeployment = {
  "address": "0x0165878a594ca255338adfa4d48449f69242eb8f",
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "message",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "transactionHash",
          "type": "bytes32"
        }
      ],
      "name": "KudoSent",
      "type": "event"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "page",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "pageSize",
              "type": "uint256"
            }
          ],
          "internalType": "struct Kudos.GetKudosParams",
          "name": "params",
          "type": "tuple"
        }
      ],
      "name": "getKudosReceived",
      "outputs": [
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "message",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes32",
                  "name": "transactionHash",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct Kudos.Kudo[]",
              "name": "kudos",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "currentPage",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "pageSize",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalPages",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalItems",
              "type": "uint256"
            }
          ],
          "internalType": "struct Kudos.PaginatedKudos",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getKudosReceivedCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "page",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "pageSize",
              "type": "uint256"
            }
          ],
          "internalType": "struct Kudos.GetKudosParams",
          "name": "params",
          "type": "tuple"
        }
      ],
      "name": "getKudosSent",
      "outputs": [
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "message",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes32",
                  "name": "transactionHash",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct Kudos.Kudo[]",
              "name": "kudos",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "currentPage",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "pageSize",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalPages",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalItems",
              "type": "uint256"
            }
          ],
          "internalType": "struct Kudos.PaginatedKudos",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getKudosSentCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "message",
              "type": "string"
            }
          ],
          "internalType": "struct Kudos.SendKudoParams",
          "name": "params",
          "type": "tuple"
        }
      ],
      "name": "sendKudo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "network": "localhost"
} as const;
