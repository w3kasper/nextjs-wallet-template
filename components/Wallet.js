import React, { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

import dynamic from "next/dynamic";
//https://solana.stackexchange.com/questions/4304/error-hydration-failed-because-the-initial-ui-does-not-match-what-was-rendered
//dynamic fixes the hydration error

// add this
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const Wallet = () => {
  // This will fetch the users' public key (wallet address) from any wallet we support
  const { publicKey } = useWallet();
  const [publicKeyString, setPublicKeyString] = useState([]); //set useState variables

  //set useeffect to "mount" the variable on refresh/reload of item when its updated
  useEffect(() => {
    if (publicKey) {
      setPublicKeyString(publicKey.toBase58());
    } else {
      setPublicKeyString("NOT CONNECTED/NULL");
    }
  }, [publicKey]);
  //this is the public key of the wallet
  console.log(
    "this is the public key of the wallet connected:" +
      publicKeyString.toString()
  );

  return (
    <>
      <div>
        <WalletMultiButtonDynamic />
      </div>
    </>
  );
};

export default Wallet;
