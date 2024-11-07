export const api = {
  async getAccounts() {
    const response = await fetch('/api/accounts');
    return response.json();
  },

  async getProcessedEmails() {
    const response = await fetch('/api/emails/processed');
    return response.json();
  },

  async disconnectAccount(type) {
    const response = await fetch(`/api/accounts/${type}/disconnect`, {
      method: 'POST',
    });
    return response.json();
  },
};