export const URL = 'http://20.187.70.255:8091/api/v1';
export const token = window.localStorage.getItem("token-lingo-admin");
export const headers = { Authorization: `Bearer ${token}` };