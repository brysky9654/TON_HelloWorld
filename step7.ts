import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV3R2, WalletContractV4 } from "@ton/ton";

async function main() {
    // open wallet v4
    const mnemonic = " vicious fluid crush essay blue crazy luggage lock bid holiday lecture excess december pet planet harsh scrub oval weapon dinner aim scissors rough crime";
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({publicKey:key.publicKey, workchain: 0});
    // const wallet = WalletContractV3R2.create({publicKey:key.publicKey, workchain: 0});

    // print wallet address
    console.log(wallet.address.toString({testOnly: true}));

    // print wallet workchain
    console.log("workchain: ", wallet.address.workChain);
}

main();