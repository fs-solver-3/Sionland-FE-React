import React from "react";
import { BigNumber } from "bignumber.js";
const contractABI = require("./contract-abi.json");
const sionTokenContractAddr = "0x364Dd53daC7f3F9dAC00C0609311Ca8c1B2258e5";
const Web3Instance = require("web3");
const ETH_DECIMALS = 18;

export const connectWallet = async () => {
  console.log("window ehtereum-----", window.ethereum);
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://metamask.io/download.html`}
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://metamask.io/download.html`}
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const mintNFT = async (address, mintAddr, mintNum) => {
  if (mintAddr.trim() === "") {
    return {
      success: false,
      status: "❗Please make sure if address field is filled before minting.",
    };
  }
  if (mintNum.trim() === "") {
    return {
      success: false,
      status: "❗Please make sure if mint nubmer field is filled before minting.",
    };
  }
  const web3 = new Web3Instance(window.web3.currentProvider);
  const sionTokenContract = new web3.eth.Contract(
    contractABI.abi,
    sionTokenContractAddr
  );
  let mintAmount;
  let mintWei;
  let numAmount = parseFloat(mintNum);
  if (!isNaN(numAmount)){
    // mintAmount = unitsInTokenAmount(numAmount, ETH_DECIMALS);
    mintWei = web3.utils.toWei(mintNum, "ether");
  }
  else {
    return {
      success: false,
      status: "❗Please make sure if nubmer is correct.",
    };
  }
  console.log(address);
  console.log(mintAddr);
  // console.log(mintAmount);
  console.log(mintWei);
  try {
    await sionTokenContract.methods.mintSionTokens(mintAddr, mintWei).send({
      from: address,
    });
  } catch (e) {
    console.log(e);
    return {
      success: false,
      status: "❗Error on buyLands",
    };
  }
  return {
		success: true,
		status:
			"✅  Finished mint"
	};
};

export const tokenAmountInUnitsToBigNumber = (amount, decimals) => {
  const decimalsPerToken = new BigNumber(10).pow(decimals);
  return amount.div(decimalsPerToken);
};
export const tokenAmountInUnits = (amount, decimals, toFixedDecimals = 3) => {
  return tokenAmountInUnitsToBigNumber(amount, decimals).toFixed(
    toFixedDecimals
  );
};

export const unitsInTokenAmount = (units, decimals) => {
  const decimalsPerToken = new BigNumber(10).pow(decimals);

  return new BigNumber(units).multipliedBy(decimalsPerToken);
};
