export const connector = (state = {}, action) => {
   //console.log(`State: ${state}`);
   //console.log(`Action: ${action}`);
    switch (action.type) {
        case 'CONNECTOR_LOADED':
            return {
                ...state,
                connector: action.connector
            };
        //case 'CONNECTOR_UNLOADED':
        //    return {
        //        state: {}
        //    }
        case 'ACCOUNT_LOADED':
            return {
                ...state,
                account: action.account,
                chainId: action.chainId,
                peerMeta: action.peerMeta,
                isConnected: true
            };
        default:
            return state;
    }
}