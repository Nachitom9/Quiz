import React, { useState } from "react";


export default function ConnectionButton (){
    
    const [buttonText, setButtonText] = useState('Connect Wallet')
    const [account, setAccount] = useState(null)
    
    const connectWallet = () => {
        if(window.ethereum && window.ethereum.isMetaMask){
        window.ethereum.request({method: 'eth_requestAccounts'})
        .then(result =>{
            setAccount(result[0])
            setButtonText(null)
        })
        .catch(error => {
            setButtonText(error.message)
        })
    }  else {
        setButtonText('Metamask No Instalado')
    }
}

    return (
    <button onClick={connectWallet}>{buttonText}{account}</button>
    )

}