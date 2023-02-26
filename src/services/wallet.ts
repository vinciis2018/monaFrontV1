import { Web } from "@_koi/sdk/web";
import { JWKInterface } from "arweave/web/lib/wallet";

import {
  encryptContentAndSave,
  retrieveAndDecryptContent,
} from "./secureContent";
import { ERROR_IDS } from "utils/constants";
// import * as SolWeb3 from "@solana/web3.js";
// import bip39 from "bip39";
interface walletWithMnemonics {
  jwk: JWKInterface;
  mnemonics: string;
}

// const Solana = new SolWeb3.Connection(SolWeb3.clusterApiUrl("devnet"));

// const generateSolanaAddress = async () => {
//   let mnemonics = bip39.generateMnemonic();
//   console.log(mnemonics);
//   const seed = await bip39.mnemonicToSeed(mnemonic);
//   console.log(seed);
//   let a = new Uint8Array(seed.toJSON().data.slice(0, 32));
//   console.log(a);
//   var kp = SolWeb3.Keypair.fromSeed(a);
//   console.log(kp);
//   console.log(kp.publicKey.toBase58());
//   return {
//      jwk: a,
//      mnemonics: mnemonics
//      walletAddress: kp.publicKey.toBase58()
//   }
// };

export class WalletHelper {
  static generateWallet(wallet: Web): Promise<walletWithMnemonics> {
    return wallet.generateWallet(true).then(() => {
      return {
        jwk: wallet.wallet!,
        mnemonics: wallet.mnemonic!,
      };
    });
    // let mnemonics = bip39.generateMnemonic();
    // console.log(mnemonics);
    // // const seed = await bip39.mnemonicToSeed(mnemonics);
    // bip39.mnemonicToSeed(mnemonics).then((res) => {
    //   console.log(res);
    //   // let a = new Uint8Array(res.toJSON().data.slice(0, 32));
    //   // var kp = SolWeb3.Keypair.fromSeed(a);
    //   // console.log(kp.publicKey.toBase58());
    //   // return {
    //   //   jwk: a,
    //   //   mnemonics: mnemonics,
    //   // };
    // });
  }

  static importWallet(
    mnemonicsOrJwk: string | JWKInterface,
    wallet: Web
  ): Promise<JWKInterface> {
    return wallet
      .loadWallet(mnemonicsOrJwk)
      .then(() => wallet.wallet!)
      .catch((e) => {
        throw new Error(`${ERROR_IDS.WALLET_IMPORT}:${e}`);
      });
  }

  static generateAndSave(
    pin: string,
    wallet: Web
  ): Promise<walletWithMnemonics> {
    return this.generateWallet(wallet).then(({ jwk, mnemonics }) =>
      encryptContentAndSave({ jwk, mnemonics }, pin).then(() => ({
        jwk,
        mnemonics,
      }))
    );
  }

  static importAndSave(
    pin: string,
    mnemonics: string,
    wallet: Web
  ): Promise<JWKInterface> {
    return this.importWallet(mnemonics, wallet).then((jwk) =>
      encryptContentAndSave({ jwk, mnemonics }, pin).then(() => jwk)
    );
  }

  static changePin(oldPin: string, newPin: string): Promise<void> {
    return retrieveAndDecryptContent(oldPin).then((data) =>
      encryptContentAndSave(data, newPin)
    );
  }
}
