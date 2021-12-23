import React, { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "../../../utility/web3/interact.jsx";

const ERC20Mint = () => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [mintNum, setMintNum] = useState("");
  const [mintAddr, setMintAddr] = useState("");
  useEffect(() => {
    async function fetchData() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);

      addWalletListener();
    }
    fetchData();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
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
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { success, status } = await mintNFT(walletAddress, mintAddr, mintNum);
    setStatus(status);
    if (success) {
      setMintNum("");
      setMintAddr("");
    }
  };

  return (
    <div className="mint_wrap">
      <div className="minter">
        <button id="walletButton" onClick={connectWalletPressed}>
          {walletAddress.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>
        <br /> <h1 id="title"> SION Token Mint </h1>{" "}
        <p> Please press "Mint." </p>{" "}
        <form>
          <input
            type="text"
            placeholder="Please type receiver address"
            onChange={(event) => setMintAddr(event.target.value)}
          />{" "}
          <input
            type="text"
            placeholder="Please type number"
            onChange={(event) => setMintNum(event.target.value)}
          />{" "}
        </form>{" "}
        <button id="mintButton" className="mt-4" onClick={onMintPressed}>
          Mint{" "}
        </button>
        <p
          id="status"
          style={{
            color: "red",
            position: "relative",
            top: "0%",
            marginTop: "30px",
          }}
        >
          {" "}
          {status}{" "}
        </p>
      </div>
    </div>
  );
};

export default ERC20Mint;
