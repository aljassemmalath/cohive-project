import { apiClient } from '../api/client';

export const userService = {
  async getUsers() {
    return [];
  },

  async getUserById(_id: string) {
    return null;
  },

  baseUrl: apiClient.baseUrl,
};
