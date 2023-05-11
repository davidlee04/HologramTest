import "./App.css";
import React, { useState } from "react";
import Web3 from "web3";
import { Alchemy, Network } from "alchemy-sdk";
import NFTCard from "./components/NFTCard.jsx";

const config = {
    apiKey: "oj3HEIzyiXxRP3VxIkyw6ytYYwg5pwxA",
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

function App() {
    let web3;
    let address;
    let testAddress = "0x5e765C6A318502FF2F6eF0D951e84F8dAE7FA3c9";
    const [nftList, setNFTList] = useState([]);
    const connectWalletHandler = async () => {
        if (
            typeof window !== "undefined" &&
            typeof window.ethereum !== "undefined"
        ) {
            try {
                await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                web3 = new Web3(window.ethereum);
                web3.eth.requestAccounts().then(loadAddress);
            } catch (e) {
                console.log(e.message);
            }
        } else {
            alert("MetaMask not installed");
        }
    };
    const loadAddress = (walletAddress) => {
        address = walletAddress[0];
    };
    const loadNFTHandler = async () => {
        const nfts = await alchemy.nft.getNftsForOwner(testAddress);
        // console.log(nfts.ownedNfts[0]);
        let cardList = [];
        // nfts.ownedNfts.forEach((nft) => {
        //     let url = nft.media[0].gateway;
        //     cardList.push(<NFTCard imgURL={url} name={nft.title}></NFTCard>);
        // });
        for (let i = 0; i < nfts.totalCount; i++) {
            if (nfts.ownedNfts[i] === undefined) {
                continue;
            }
            if (nfts.ownedNfts[i].media[0] === undefined) {
                continue;
            }
            if (nfts.ownedNfts[i].media[0].gateway === undefined) {
                continue;
            }
            // console.log(i);
            // console.log(nfts.ownedNfts[i]);
            // console.log(nfts.ownedNfts[i].media[0]);
            cardList.push(
                <NFTCard
                    key={i}
                    imgURL={nfts.ownedNfts[i].media[0].gateway}
                    name={nfts.ownedNfts[i].title}
                ></NFTCard>
            );
        }
        setNFTList(cardList);
    };
    return (
        <div className="App">
            <h1>Welcome</h1>
            <button onClick={connectWalletHandler}>Connect Wallet</button>
            <button onClick={loadNFTHandler}>Load NFTs</button>
            <div class="wrapper">{nftList}</div>
        </div>
    );
}

export default App;
