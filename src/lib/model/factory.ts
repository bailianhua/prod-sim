import { persisted } from 'svelte-persisted-store'
import { items } from '$lib/items.json';

export interface slot {
    item: string;
    amount: number | null;
    quantity: number | null;
}
export interface FactoryInterface {
    name: string;
    slots: slot[];
}

export interface material {
    name: string;
    quantity: number;
}

let factories: FactoryInterface[] = [];	

export const overAllmaterials = [
    {
        name: 'Lumber',
        quantity: 0
    },
    {
        name: 'Plank',
        quantity: 0
    },
    {
        name: 'Stone',
        quantity: 0
    },
    {
        name: 'Iron ore',
        quantity: 0
    },
    {
        name: 'Wood',
        quantity: 0
    }
];

export function calculate() {
    overAllmaterials.forEach((material) => {
        material.quantity = 0
    })
    for (const factory of factories) {
        for (const slot of factory.slots) {
            for (const item of items) {
                if (item.name === slot.item && slot.amount && slot.quantity) {
                    const material = overAllmaterials.find((material) => material.name === item.name);
                    if (material) {
                        material.quantity += Math.ceil(slot.amount * slot.quantity);
                        for (const dep of item.dependent) {
                            const deductMaterial = overAllmaterials.find(
                                (material) => material.name === dep.material
                            )
                            if (deductMaterial) {
                                deductMaterial.quantity -= dep.amount * slot.quantity * slot.amount
                            }
                        }
                    }
                }
            }
        }
    }
}

export function calculateMaterialsNeeded(factoryName : string) {
    const factory = factories.find((factory) => factory.name === factoryName);
    console.log(factory);
}

export const factoryStore = persisted('factoryStore', [] as FactoryInterface[])
export function clearFactoryStore() {
    factoryStore.set([])
}

export function addFactory(name:string) {
    factoryStore.update((value) => {
        return [...value, { name: name, slots: [] }];
    });
    calculate();
}
export function getFactories() {
    return factories
}

export function getOverAllmaterials() {
    return overAllmaterials
}

export function removeFactory(name: string) {
    factoryStore.update((value) => value.filter((factory) => factory.name !== name))
}

factoryStore.subscribe((value) => {
    factories = value;
});
