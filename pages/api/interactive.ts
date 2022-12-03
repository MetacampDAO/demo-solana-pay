// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  Transaction,
  SystemProgram,
  PublicKey,
  Connection,
  clusterApiUrl,
  Keypair,
} from "@solana/web3.js";
import bs58 from "bs58";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "GET":
      console.log("GET");
      const label = "Metacamp";
      const icon =
        "https://uploads-ssl.webflow.com/628b99344f25667e77da83cf/62c3a8d3be46ba64d97c2f28_metcamp-256-logo.png";
      res.status(200).send({
        label,
        icon,
      });
      break;

    case "POST":
      const accountField = req.body.account;
      const account = new PublicKey(accountField);
      const connection = new Connection(clusterApiUrl("devnet"));
      // create the transaction
      const transaction = new Transaction();

      const passDecodeKp = bs58.decode(process.env.SECRET_KEY!);
      const passU8IntKp = new Uint8Array(
        passDecodeKp.buffer,
        passDecodeKp.byteOffset,
        passDecodeKp.byteLength / Uint8Array.BYTES_PER_ELEMENT
      );
      const passKp = Keypair.fromSecretKey(passU8IntKp);

      const ix = SystemProgram.transfer({
        fromPubkey: new PublicKey(
          "HZGTNyvgFzpaYxqGiTpcYfbxYArPAAB4ffLSj5B9dv3"
        ),
        toPubkey: account,
        lamports: 5e8,
      });

      transaction.add(ix);

      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
      transaction.feePayer = passKp.publicKey;
      transaction.partialSign(passKp);

      // Serialization
      const serializedTransaction = transaction.serialize({
        // verifySignatures: false,
        requireAllSignatures: false,
      });

      const base64Transaction = serializedTransaction.toString("base64");
      const message = "Welcome to Metacamp";

      res.status(200).send({ transaction: base64Transaction, message });

      break;

    default:
      break;
  }
}
