import { PublicClientApplication } from "@azure/msal-browser";

const MSAL_CONFIG = {
    auth: {
        clientId: "098eff14-5488-4ad7-a4aa-e18793006b13",
        authority: "https://login.microsoftonline.com/bellon1.onmicrosoft.com",
        redirectUri: window.location.origin
        // redirectUri: "https://bellon-liquidacion-frontend-cqgaahcvhecje6d7.eastus2-01.azurewebsites.net/"
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    },
};

const LOGIN_REQUEST = {
    scopes: ["openid", "offline_access"]
};

const TOKEN_REQUEST = {
    scopes: ["api://49159368-e34c-4c12-948f-9b2ab6c8c9fa/App.Liquidacion", "User.Read"]
};

const GRAPH_CONFIG = {
    graphUsersEndpoint: "https://graph.microsoft.com/v1.0/users"
};

const PUBLIC_CLIENT_APPLICATION = new PublicClientApplication(MSAL_CONFIG);
async function initializeMsal() {
    await PUBLIC_CLIENT_APPLICATION.initialize();
}
initializeMsal();

export {
    GRAPH_CONFIG, LOGIN_REQUEST, MSAL_CONFIG, PUBLIC_CLIENT_APPLICATION, TOKEN_REQUEST
};
