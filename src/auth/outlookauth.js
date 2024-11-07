import { ConfidentialClientApplication } from '@azure/msal-node';
import { config } from '../config/comfig';

export class OutlookAuth {
  constructor() {
    this.msalClient = new ConfidentialClientApplication({
      auth: {
        clientId: config.outlook.clientId,
        clientSecret: config.outlook.clientSecret,
        authority: 'https://login.microsoftonline.com/common',
      },
    });
  }

  getAuthUrl() {
    return this.msalClient.getAuthCodeUrl({
      scopes: ['Mail.ReadWrite'],
      redirectUri: config.outlook.redirectUri,
    });
  }

  async getTokens(code) {
    return await this.msalClient.acquireTokenByCode({
      code,
      scopes: ['Mail.ReadWrite'],
      redirectUri: config.outlook.redirectUri,
    });
  }
}
