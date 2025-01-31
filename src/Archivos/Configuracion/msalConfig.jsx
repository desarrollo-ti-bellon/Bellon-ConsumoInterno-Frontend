import { PublicClientApplication } from "@azure/msal-browser";

const MSAL_CONFIG = {
    auth: {
        clientId: "0b33347c-fd66-4cea-b9aa-209ce898a790",
        authority: "https://login.microsoftonline.com/bellon1.onmicrosoft.com",
        redirectUri: window.location.origin
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
    scopes: ["api://16c9b077-ae12-442b-b1e5-98beca9b6845/App.ConsumoInterno", "User.Read"]
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
