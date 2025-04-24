import { getPublicKey, nip04, generateSecretKey } from "nostr-tools";
function giftWrappedNostrMessages() {
  const sk = generateSecretKey();
  const pk = getPublicKey(sk);
  const sk2 = generateSecretKey();
  const reciepentPk = getPublicKey(sk2);
  const cipherText = nip04.encrypt(sk, reciepentPk, "hello world");
  console.log("Encrypted message:", cipherText);
  const decryptedMessage = nip04.decrypt(sk2, pk, cipherText);
  console.log("Decrypted message:", decryptedMessage);
}
export default giftWrappedNostrMessages;
