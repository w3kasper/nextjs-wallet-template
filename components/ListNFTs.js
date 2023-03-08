import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

const connection = new Connection("https://api.metaplex.solana.com/");
const mx = Metaplex.make(connection);

const ListNFTs = () => {
  const { publicKey } = useWallet();
  const [address, setAddress] = useState(""); //address of public key to check nfts with

  //if public key exists setaddress to it on refresh/reload of publicKey when its updated
  useEffect(() => {
    publicKey ? setAddress(publicKey.toBase58()) : "NULL";
  }, [publicKey]);

  const [nftList, setNftList] = useState(null); //used to look at list

  ///Fetch nfts from connected wallet
  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const list = await mx
          .nfts()
          .findAllByOwner({ owner: new PublicKey(address) });
        setNftList(list);

        //list through short
        const listItems = list.map((nftlist) => {
          console.log(nftlist.name);
        });
      } catch (e) {
        //console.log(e);
      }
    };
    // call the function
    fetchNFTs();
  }, [address]);

  return <div>Check console.log for listing of wallets NFT's</div>;
};

export default ListNFTs;
