// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  Transaction,
  SystemProgram,
  PublicKey,
  Connection,
  clusterApiUrl,
} from "@solana/web3.js";

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

      const ix = SystemProgram.transfer({
        fromPubkey: account,
        toPubkey: new PublicKey("DQUhSTCqyMYgFL7f3cA2vBimGWB5B8UTw9C92oV6ipFR"),
        lamports: 1e7,
      });

      transaction.add(ix);

      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
      transaction.feePayer = account;
      const serializedTransaction = transaction.serialize({
        verifySignatures: false,
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
