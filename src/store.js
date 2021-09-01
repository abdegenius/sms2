import { writable } from "svelte/store";

export const SET_ZONE = writable(0);
export const SET_SCHOOLS = writable([]);
export const CURRENT_SCHOOL = writable([]);
export const SET_USER_TYPE = writable(null);
export const STORAGE_TOKEN = writable(null);
