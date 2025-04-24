import {
  CashuWallet,
  CashuMint,
  MintQuoteState,
  getEncodedTokenV4,
} from "@cashu/cashu-ts";
const mintUrl = "http://localhost:3338";
const mint = new CashuMint(mintUrl);

const wallet = new CashuWallet(mint);

async function p2pkCashuToken() {
  await wallet.loadMint();
  const mintQuote = await wallet.createMintQuote(64);
  const mintQuoteChecked = await wallet.checkMintQuote(mintQuote.quote);
  if (mintQuoteChecked.state == MintQuoteState.PAID) {
    const proofs = await wallet.mintProofs(64, mintQuote.quote);
    console.log("Mint proofs generated:", proofs);
    const { keep, send } = await wallet.send(32, proofs);
    const token = getEncodedTokenV4({
      mint: mintUrl,
      proofs: send,
    });
    console.log(token);
    const wallet2 = new CashuWallet(mint);
    const receiveProofs = await wallet2.receive(token);
    console.log("Received proofs:", receiveProofs);
  }
}
export default p2pkCashuToken;
