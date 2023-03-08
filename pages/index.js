import React from "react";
import Wallet from "../components/Wallet";
import ListNFTs from "../components/ListNFTs";

export default function Home() {
  return (
    <div>
      <Wallet />
      <ListNFTs />
    </div>
  );
}
