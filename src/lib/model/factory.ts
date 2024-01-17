import { persisted } from 'svelte-persisted-store'

export interface slot {
    item: string;
    amount: number | null;
}
export interface FactoryInterface {
    name: string;
    slots: slot[];
}

export const factoryStore = persisted('factoryStore', [] as FactoryInterface[])
export function clearFactoryStore() {
    factoryStore.set([])
}