import React, { useMemo, useState } from "react";
// import { JWKInterface } from "arweave/web/lib/wallet";
import Arweave from "arweave";
import { Web } from "@_koi/sdk/web";
import {
  WalletHelper,
  clearSecureContent,
  hasEncryptedData as _hasEncryptedData,
  retrieveAndDecryptContent,
  retrieveSelfDestructPin,
  saveSelfDestructPin,
  temporarySavePin,
  wipeTemporarySavedPin,
  getTemporarySavedPin,
  setPinSet,
  isPinSet,
} from "services";
import { useSteps } from "chakra-ui-steps";

import { ERROR_IDS } from "utils/constants";
import { WithChildren } from "types/utils";
// import * as SolWeb3 from "@solana/web3.js";
// import bip39 from "bip39";

// const Solana = new SolWeb3.Connection(SolWeb3.clusterApiUrl("devnet"));

// const generateSolanaAddress = async () => {
//   let mnemonic = bip39.generateMnemonic();
//   console.log(mnemonic);
//   const seed = await bip39.mnemonicToSeed(mnemonic);
//   console.log(seed);
//   let a = new Uint8Array(seed.toJSON().data.slice(0, 32));
//   console.log(a);
//   var kp = SolWeb3.Keypair.fromSeed(a);
//   console.log(kp);
//   console.log(kp.publicKey.toBase58());
// };

interface Context {
  mnemonics: any;
  isLoading: boolean;
  activeStep: number;

  nextStep: () => void;
  hasEncryptedData(): Promise<boolean>;
  generateAndSave(pin: string): Promise<void>;
  importAndSave(pin: string, mnemonics: string): Promise<void>;
  tempSavePin(pin: string): Promise<string>;
  getTempSavedPin(): Promise<string | null>;
  wipeTempSavedPin(): Promise<void>;
  setupPin(pin: string): Promise<void>;
  isPinSetup(): Promise<boolean>;
  changePin(oldPin: string, newPin: string): Promise<void>;
  isUnlocked(): Promise<boolean>;
  unlock(pin: string): Promise<void>;
  lock(): void;
  setSelfDestructPin(destructPin: string): Promise<void>;
  checkAndTriggerSelfDestruct(pin: string): Promise<boolean>;
  getArweavePublicAddress(): string;
  signMessage(message: string): Promise<string>;
}

const Ctx = React.createContext<Context | undefined>(undefined);

export const ContextProvider = ({ children }: WithChildren) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const wallet = useMemo<Web>(() => new Web(), []);
  const [$jwk, set$jwk] = useState<Promise<any> | undefined>(undefined);
  const [mnemonics, setMnemonics] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Func Helpers
   */
  const hasEncryptedData = (): Promise<boolean> => {
    return _hasEncryptedData();
  };

  const generateAndSave = (pin: string): Promise<void> => {
    var startTime = performance.now();
    setIsLoading(true);
    console.log("generateAndSave : ", wallet);
    const $walletGenerate = WalletHelper.generateAndSave(pin, wallet);
    const $newJwk = $walletGenerate.then(({ jwk }) => jwk);
    set$jwk($newJwk);

    $walletGenerate.then(({ mnemonics }) => {
      setMnemonics(mnemonics);
    });

    return $newJwk
      .then(() => {})
      .finally(() => {
        setIsLoading(false);
        var endTime = performance.now();
        console.log(
          `Call to doSomething took ${endTime - startTime} milliseconds`
        );
      });
  };

  const importAndSave = (pin: string, mnemonics: string): Promise<void> => {
    setIsLoading(true);
    const $walletImport = WalletHelper.importAndSave(pin, mnemonics, wallet);
    set$jwk($walletImport);

    setMnemonics(mnemonics);

    return $walletImport
      .then(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const tempSavePin = (pin: string): Promise<string> => {
    return temporarySavePin(pin);
  };

  const wipeTempSavedPin = (): Promise<void> => {
    return wipeTemporarySavedPin();
  };

  const getTempSavedPin = (): Promise<string | null> => {
    return getTemporarySavedPin();
  };

  const setupPin = (): Promise<void> => {
    return setPinSet();
  };

  const isPinSetup = (): Promise<boolean> => {
    return isPinSet();
  };

  const changePin = (oldPin: string, newPin: string): Promise<void> => {
    return WalletHelper.changePin(oldPin, newPin);
  };

  const isUnlocked = async (): Promise<boolean> => {
    return Boolean((await hasEncryptedData()) || $jwk);
  };

  const unlock = (pin: string): Promise<any> => {
    setIsLoading(true);
    const $walletLoad = new Promise((resolve, reject) => {
      retrieveAndDecryptContent(pin)
        .then((dataModel: any) => {
          WalletHelper.importWallet(dataModel.jwk, wallet).then(() => {
            resolve(dataModel);
          });
        })
        .catch(reject);
    });
    set$jwk($walletLoad.then((data: any) => data.jwk));
    $walletLoad.then((data: any) => {
      setMnemonics(data.mnemonics);
    });
    setIsLoading(false);

    return $walletLoad;
  };

  const lock = (): void => {
    set$jwk(undefined);
    setMnemonics(undefined);
  };

  const setSelfDestructPin = (destructPin: string): Promise<void> => {
    return saveSelfDestructPin(destructPin);
  };

  const getArweavePublicAddress = (): string => {
    return wallet.address!;
  };

  const signMessage = (message: string): Promise<string> => {
    const strBuffer = new TextEncoder().encode(message);
    if (!$jwk) {
      throw new Error(ERROR_IDS.WALLET_LOCKED);
    }
    return $jwk.then((jwk) =>
      Arweave.crypto
        .sign(jwk, strBuffer, {
          saltLength: 32,
        })
        .then((signedBuffer) => new TextDecoder().decode(signedBuffer))
    );
  };

  const checkAndTriggerSelfDestruct = (pin: string): Promise<boolean> => {
    return retrieveSelfDestructPin()
      .then((destructPin) => destructPin === pin)
      .then(async (shouldTrigger) => {
        if (shouldTrigger) {
          await clearSecureContent();
        }
        return shouldTrigger;
      });
  };

  return (
    <Ctx.Provider
      value={{
        mnemonics,
        isLoading,
        nextStep,
        activeStep,
        hasEncryptedData,
        generateAndSave,
        importAndSave,
        tempSavePin,
        getTempSavedPin,
        wipeTempSavedPin,
        setupPin,
        isPinSetup,
        changePin,
        isUnlocked,
        unlock,
        lock,
        setSelfDestructPin,
        checkAndTriggerSelfDestruct,
        getArweavePublicAddress,
        signMessage,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

function useContext() {
  const context = React.useContext(Ctx);
  if (!context) {
    throw new Error(`useWallet must be used inside WalletProvider`);
  }
  return context;
}

export { ContextProvider as WalletProvider, useContext as useWallet };
