export const msalConfig = {
  auth: {
    clientId: "f9ab0a06-4349-48b5-860a-e381b80ae30c",
    authority: "https://login.microsoftonline.com/consumers", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: "https://gray-flower-0a2d93e00.1.azurestaticapps.net",
    postLogoutRedirectUri: "https://gray-flower-0a2d93e00.1.azurestaticapps.net",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};