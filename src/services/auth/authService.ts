import { apiClient } from '../api/client';

export const authService = {
  async login(_email: string, _password: string) {
    return null;
  },

  async logout() {
    return null;
  },

  async getSession() {
    return null;
  },

  baseUrl: apiClient.baseUrl,
};
