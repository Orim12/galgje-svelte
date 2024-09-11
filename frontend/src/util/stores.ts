import type { User } from '@src/payload-types';
import { writable, type Writable } from 'svelte/store';

export const darkmodeHeader = writable(false);
export type UserStore = Writable<User>;
