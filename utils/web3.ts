import Web3 from "web3";


export const web3 = () => {
    if (!window?.ethereum) return alert('Please install Metamask')
    window.ethereum.request({ method: "eth_requestAccounts" });
    return new Web3(window.ethereum);
}

export const getAddress = async () => {
    try{
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        console.log('accounts', accounts)
        return Web3.utils.toChecksumAddress(accounts[0]);

    } catch(e){
        console.log(e)
    }
}
