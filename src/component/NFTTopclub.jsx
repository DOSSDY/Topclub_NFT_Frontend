import React, { useEffect, useState } from "react";
import Web3 from "web3";
import axios from "axios";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const MyComponent = () => {
  const [metadata, setMetadata] = useState(null);
  const [uri, setUri] = useState();
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  const [image, setImage] = useState([]);
  const [date, setDate] = useState([]);
  const [creator, setCreator] = useState([]);
  const [attribute, setAttribute] = useState([]);
  const [demoAddr, setDemoAddr] = useState(
    "0x767A57781bD5208162861122DcC4D98525bE9841"
  );

  useEffect(() => {
    const fetchMetadata = async () => {
      // Call Provider
      const web3 = new Web3("https://rpc-cnx.omplatform.com");

      //Wallet Address
      const myaddr = "0x5775d2c032ca6f840ef9583a39d8721259dc2f91";
      const demoAddr = "0x767A57781bD5208162861122DcC4D98525bE9841";

      // Define the contract address and ABI (Application Binary Interface) of the NFT contract
      const contractAddress = "0x026AE9266D65B149A6eD5Ee6532f224E1f1f8325"; //CommonNFT
      const LegendContractAddress =
        "0x86321AadD017a03964e7e83480193ef8831882d8"; //LegendNFT
      const contractABI = [
        {
          constant: false,
          inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "approve",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "mint",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "safeTransferFrom",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "bytes", name: "_data", type: "bytes" },
          ],
          name: "safeTransferFrom",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "bool", name: "approved", type: "bool" },
          ],
          name: "setApprovalForAll",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "transferFrom",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "approved",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "ApprovalForAll",
          type: "event",
        },
        {
          constant: true,
          inputs: [{ internalType: "address", name: "owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "getApproved",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "operator", type: "address" },
          ],
          name: "isApprovedForAll",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "ownerOf",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
          ],
          name: "supportsInterface",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
      ];
      const PPcontractABI = [
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "string",
              name: "_symbol",
              type: "string",
            },
            {
              internalType: "string",
              name: "_initBaseURI",
              type: "string",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "approved",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "ApprovalForAll",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [],
          name: "ReturnKeccak",
          outputs: [
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "baseExtension",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "baseURI",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "cost",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "getApproved",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "operator",
              type: "address",
            },
          ],
          name: "isApprovedForAll",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "isStaked",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "isclaimable",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "listNFTs",
          outputs: [
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "maxMintAmount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "maxSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_mintAmount",
              type: "uint256",
            },
          ],
          name: "mint",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "nftIdsByOwner",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "ownerOf",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bool",
              name: "_state",
              type: "bool",
            },
          ],
          name: "pause",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "paused",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_user",
              type: "address",
            },
          ],
          name: "removeWhitelistUser",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "setApprovalForAll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_newBaseExtension",
              type: "string",
            },
          ],
          name: "setBaseExtension",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_newBaseURI",
              type: "string",
            },
          ],
          name: "setBaseURI",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_newCost",
              type: "uint256",
            },
          ],
          name: "setCost",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_newmaxMintAmount",
              type: "uint256",
            },
          ],
          name: "setmaxMintAmount",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes4",
              name: "interfaceId",
              type: "bytes4",
            },
          ],
          name: "supportsInterface",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "index",
              type: "uint256",
            },
          ],
          name: "tokenByIndex",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "index",
              type: "uint256",
            },
          ],
          name: "tokenOfOwnerByIndex",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "tokenURI",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_owner",
              type: "address",
            },
          ],
          name: "walletOfOwner",
          outputs: [
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_user",
              type: "address",
            },
          ],
          name: "whitelistUser",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "whitelisted",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ];

      // Create an instance of the NFT contract
      const contract = new web3.eth.Contract(
        PPcontractABI,
        LegendContractAddress
      );

      //   Call the tokenURI function of the NFT contract to retrieve the metadata tokenURI(tokenid)
      const URI = await contract.methods.tokenURI(77).call();
      console.log(`The URI or metadata of this contract : ${URI}`);

      //Retrieve the tokenID from index of NFT that owned by address
      const tokenOfOwnerByIndex = await contract.methods
        .tokenOfOwnerByIndex(demoAddr, 0)
        .call();
      console.log(
        `This is the tokenID of the NFT's Index that owned by this address ${tokenOfOwnerByIndex}`
      );

      //Retrieve the balanceOf NFT in the wallet address
      const balanceOfNFT = await contract.methods.balanceOf(demoAddr).call();
      console.log(
        `Total amount of NFT that owned by ${demoAddr} :${balanceOfNFT}`
      );

      //Retrieve the tokenID owned by wallet address inform of Array
      const nfts = []; //Array of tokenID
      for (let i = 0; i < balanceOfNFT; i++) {
        const tokenId = await contract.methods
          .tokenOfOwnerByIndex(demoAddr, i)
          .call();
        nfts.push(tokenId);
      }
      console.log(
        `NFT's TokenID that owned by this address: ${demoAddr} are these ${nfts}`
      );

      // Display the array of URI's of NFT in its contract address
      const URIarr = [];
      for (let i = 0; i < balanceOfNFT; i++) {
        const forLoopURI = await contract.methods.tokenURI(nfts[i]).call();
        URIarr.push(forLoopURI);
      }
      //Use Axios to GET the URI in form

      setMetadata(URI);
      setUri(URIarr);
    };

    fetchMetadata();
  }, []);
  // Fetch NFT data
  const fetchData = async (_path) => {
    const response = await axios({
      method: "get",
      url: _path,
    });
    const nftName = response.data.name;
    const nftDescription = response.data.description;
    const nftImage = response.data.image;
    const nftDate = response.data.date;
    const nftCreator = response.data.creator;
    const nftAttribute = response.data.attributes;
    // set data and push to state's array
    setName((name) => [...name, nftName]);
    setDescription((description) => [...description, nftDescription]);
    setImage((image) => [...image, nftImage]);
    setDate((date) => [...date, nftDate]);
    setCreator((creator) => [...creator, nftCreator]);
    setAttribute((attribute) => [...attribute, nftAttribute]);
  };
  // loop through path of each URI
  useEffect(() => {
    if (uri) {
      uri.forEach((element) => {
        let path = element.split("/");
        fetchData(`/collection/production/json/legendary/${path[7]}`);
      });
    }
  }, [uri]);

  //TRY TO USE TOPCLUB's API
  //Bearer Token
  const token = "WaizPPwxgPgQDEQpmg3Kd4LUpzogq3jQOt26XLqul3TcnMyODmsHMmWg";
  //Configurate the Header of API
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  //Configurate the Body of API
  const bodyParameters = {
    id: 1,
    jsonrpc: "2.0",
    method: "contract_call",
    params: [
      {
        from: "0x5775d2c032ca6f840ef9583a39d8721259dc2f91",
        to: "0x31a7ab71db89149cee2259dddffaf634ed2a25c1",
        abi: [
          {
            name: "transfer",
            inputs: [
              { name: "to", type: "address" },
              { name: "amount", type: "uint256" },
            ],
            outputs: [{ name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        gasPrice: "500 gwei",
        gasLimit: "100000",
        nonce: "0x10",
        send: false,
        call: {
          function: "transfer",
          params: [
            "0x1566cc36e7eafc0c540fe386090cb3ee6f75be3d",
            "0x16345785d8a0000",
          ],
          _example_param_2: [
            "0x5775d2c032ca6f840ef9583a39d8721259dc2f91",
            "0.15 native",
          ],
          _example_param_3: [
            "0x5775d2c032ca6f840ef9583a39d8721259dc2f91",
            "0.15 eth",
          ],
          _example_param_4: [
            "0x5775d2c032ca6f840ef9583a39d8721259dc2f91",
            "100 wei",
          ],
        },
      },
    ],
  };
  //Call sendToken Function
  const sendToken = () => {
    axios
      .post(
        "https://uat-account.central.tech/api/wallet/rpc",
        bodyParameters,
        config
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  sendToken();

  ///////////////Frontend Return
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#FFD700" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              NFT owned by this address : {demoAddr}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      {/* {metadata ? <p>Metadata: {metadata}</p> : <p>Loading metadata...</p>} */}
      <Grid container justifyContent={"center"}>
        {uri ? (
          uri.map((value, index) => {
            return (
              <Card
                sx={{ maxWidth: 300, m: "3rem", bgcolor: "#FFD700" }}
                key={index}
              >
                <CardContent>
                  <CardMedia
                    component="img"
                    height="50%"
                    width="50%"
                    image={image[index]}
                    alt="Paella dish"
                  />
                  <Typography
                    sx={{ fontSize: 14, width: "auto", height: "auto" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {name[index]}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14, width: "auto", height: "auto" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Description: {description[index]}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14, width: "auto", height: "auto" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Creator: {creator[index]}
                  </Typography>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <p>Loading uri...</p>
        )}
      </Grid>
    </div>
  );
};

export default MyComponent;
