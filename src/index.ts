import giftWrappedNostrMessages from "./nostr";
import p2pkCashuToken from "./cashu";
import hodelInvoice from "./hodel";
async function main() {
  giftWrappedNostrMessages();
  await p2pkCashuToken();
  await hodelInvoice();
}
main();
