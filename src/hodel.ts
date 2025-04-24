const lnService = require("ln-service");
const cryptolib = require("crypto");
import fs from "fs";
const { createHodlInvoice, authenticatedLndGrpc } = lnService;
const lndCert = fs.readFileSync("./tls.cert");
const macaroon = fs.readFileSync("./admin.macaroon").toString("hex");
const preimage = cryptolib.randomBytes(32);
const { lnd } = authenticatedLndGrpc({
  cert: lndCert.toString(),
  macaroon,
  socket: "localhost:10009",
});

const id = cryptolib.createHash("sha256").update(preimage).digest("hex");
async function hodelInvoice() {
  const invoice = await createHodlInvoice({
    lnd,
    tokens: 1000,
    id: id,
    description: "HODL invoice test",
  });
  return invoice;
}
export default hodelInvoice;
