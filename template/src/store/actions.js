//import 'react-native-get-random-values';
//import '@ethersproject/shims';

//import { ethers } from 'ethers';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

export const loadConnector = (dispatch) => {
    const connector = useWalletConnect();
    dispatch({type: 'CONNECTOR_LOADED', connector});
    return connector;
}

export const connectWallet = async (connector, dispatch) => {
    try {
        if (!connector.connected) {
          await connector.connect();
        } 
        dispatch({type: 'WALLET_CONNECTED'});
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const disconnectWallet = async (connector, dispatch) => {
    await connector.killSession();
    dispatch({type: 'CONNECTOR_UNLOADED'});
    return true;
}

export const loadAccount = async (connector, dispatch) => {
    const account = connector.accounts[0];
    const chainId = connector.chainId;
    const peerMeta = connector.peerMeta;
    dispatch({type: 'ACCOUNT_LOADED', account, chainId, peerMeta});
}
