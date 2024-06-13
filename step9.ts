import { getHttpEndpoint } from "@orbs-network/ton-access";
import { mnemonicToWalletKey } from "@ton/crypto";
import { internal, TonClient, WalletContractV4 } from "@ton/ton";

async function main() {
    // open wallet v4
    const mnemonic = "vicious fluid crush essay blue crazy luggage lock bid holiday lecture excess december pet planet harsh scrub oval weapon dinner aim scissors rough crime";
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({publicKey: key.publicKey, workchain: 0});

    // initialize ton rpc client on testnet
    const endpoint = await getHttpEndpoint({network: "testnet"});
    const client = new TonClient({endpoint});

    // make sure wallet is deployed
    if(!await client.isContractDeployed(wallet.address)) {
        return console.log("Wallet is not deployed");
    }

    // send 0.05 TON to other wallet
    const walletContract = client.open(wallet);
    const seqno = await walletContract.getSeqno();
    await walletContract.sendTransfer({
        secretKey: key.secretKey,
        seqno: seqno,
        messages: [
            internal({
                to: "0QDQ8GFOecXevL-okN42PqiImDBn-W_vEpSW3ujeFPIZuxHJ",
                value: "0.05",
                body: "Hello",
                bounce: false,
            })
        ]
    });

    // wait until confirmed
    let currentSeqno = seqno;
    while (currentSeqno == seqno) {
        console.log("Waiting for the transaction to confirm...");
        await sleep(300);
        currentSeqno = await walletContract.getSeqno();
    }
}

main();

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
