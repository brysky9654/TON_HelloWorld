import { getHttpEndpoint } from "@orbs-network/ton-access";
import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4, TonClient, fromNano } from "@ton/ton";

async function main() {
    // open wallet v4
    const mnemonic = " vicious fluid crush essay blue crazy luggage lock bid holiday lecture excess december pet planet harsh scrub oval weapon dinner aim scissors rough crime"
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({publicKey: key.publicKey, workchain: 0});

    // initialize ton rpc client on testnet
    const endpoint = await getHttpEndpoint({network: "testnet"});
    const client = new TonClient({endpoint});

    // query balance from chain
    const balance = await client.getBalance(wallet.address);
    console.log("balance: ", fromNano(balance));

    // query seqno from chain
    const walletContract = client.open(wallet);
    const seqno = await walletContract.getSeqno();
    console.log("seqno: ", seqno);
}

main();