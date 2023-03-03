import React, { useEffect, useState } from "react";
import { IPFS, create } from "ipfs-core";
//import { Web3Storage } from "web3.storage";

import { ipfsOptions } from "config";
import { WithChildren } from "types/utils";
import { mergeUint8Arrays } from "utils/util";

interface Context {
  addFile(file: any): ReturnType<IPFS["add"]>;
  getFile(cid: string): Promise<Uint8Array | undefined>;
  // addFileOnWeb3(file: any): any;
  // getFileFromWeb3(cid: string): any;
}

export const Ctx = React.createContext<Context | undefined>(undefined);

const ContextProvider = (props: WithChildren) => {
  const [$node, set$node] = useState<Promise<IPFS> | undefined>(undefined);
  // const client = new Web3Storage({
  //   token:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNBZjFDOTZiRUNiMzgxODZDNTk1MjFkNTA2ZjMzNzgxMzVjMjYwNDIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzc1NjQ4NzI2ODIsIm5hbWUiOiJXRUIzX1RPS0VOIn0.7MYCo5Q1OBLUqbECuFQUzqwSu5eGam2V2b9rZEVDtgA",
  // });
  const initializeNode = () => create(ipfsOptions);
  const getNode = () => $node || initializeNode();

  useEffect(() => {
    set$node(initializeNode);
  }, []);

  const addFile = (buffer: any): ReturnType<IPFS["add"]> => {
    return getNode().then((node) => node.add(buffer));
  };

  // const getFileFromWeb3 = async (cid: string) => {
  //   try {
  //     console.log("retrive function called!");
  //     // const startTime = new Date();
  //     // console.log("start time : ", startTime);
  //     const response = await client.get(cid);
  //     console.log("response : ", response);
  //     // console.log(
  //     //   `Got a response! [${response.status}] ${response.statusText}`
  //     // );
  //     // if (!response.ok) {
  //     //   throw new Error(`failed to get ${cid}`);
  //     // }
  //     const files = await response.files(); // Web3File[]
  //     console.log("file : ", files);
  //     for (const file of files) {
  //       console.log(`${file.cid} ${file.name} ${file.size}`);
  //     }
  //     return `https://${file.cid}.ipfs.w3s.link/${file.name} `;
  //   } catch (error) {
  //     console.log("error ", error);
  //   }
  // };

  // const addFileOnWeb3 = async (buffer: any) => {
  //   try {
  //     console.log("addFile on web3 called");
  //     const cid = await client.put(buffer);
  //     return cid;
  //   } catch (error) {
  //     console.log("Error : ", error);
  //   }
  // };

  const getFile = (cid: string) => {
    return getNode().then(async (node) => {
      const files = [];
      for await (const file of node.get(cid)) {
        files.push(file);
      }
      return mergeUint8Arrays(files);
    });
  };

  return (
    <Ctx.Provider value={{ addFile, getFile }}>{props.children}</Ctx.Provider>
  );
};

function useContext() {
  const context = React.useContext(Ctx);
  if (!context) {
    throw new Error(`useIpfs must be used inside IpfsProvider`);
  }
  return context;
}

export { ContextProvider as IpfsProvider, useContext as useIpfs };
