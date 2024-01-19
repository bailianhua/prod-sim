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
const excludedItems = ['Stone', 'Iron Ore', 'Lumber'];

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
                        material.quantity += Math.ceil(slot.amount);
                        for (const dep of item.dependent) {
                            const deductMaterial = overAllmaterials.find(
                                (material) => material.name === dep.material
                            )
                            if (deductMaterial) {
                                deductMaterial.quantity -= dep.amount * slot.amount
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
    const itemsMatching = items.filter((item) => {
        if (factory && factory.slots) {
            for (const slot of factory.slots) {
                if (slot.item === item.name) {
                    return true;
                }   
            }
        }
        return false;
    });
        const itemSlots = factory?.slots.map((slot) => slot.item) ?? [];
        const itemCounts: { [key: string]: { count: number, totalAmount: number } } = itemSlots.reduce((counts: { [key: string]: { count: number, totalAmount: number } }, item, index) => {
            const slotAmount = factory?.slots[index]?.amount || 0;
            if (!counts[item]) {
                counts[item] = { count: 1, totalAmount: slotAmount };
            } else {
                counts[item].count += 1;
                counts[item].totalAmount += slotAmount;
            }
            return counts;
        }, {});
    itemsMatching.forEach((element) => {
        element.dependent.forEach((dep) => {
            if(excludedItems.includes(dep.material)) return
            const slotAmount = itemCounts[element.name];
            const slotNeeded = Math.ceil(dep.ratio * slotAmount.count * dep.amount); 
            for (let i = 0; i < slotNeeded; i++) {
                addItem(factoryName, { item: dep.material, amount: Math.ceil(slotAmount.totalAmount * dep.amount / slotNeeded), quantity: dep.rate  })
            }
        })
    });
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

export function addItem(factoryName : string, item : slot) {
    factoryStore.update((value) => {
        // Check if the factory already exists in the store
        const existingFactory = value.find((factory) => factory.name === factoryName);

        if (existingFactory) {
            // If the factory exists, add the new slot to its slots array
            const updatedFactory = {
                ...existingFactory,
                slots: [
                    ...existingFactory.slots,
                    { item: item.item, amount: item.amount, quantity: item.quantity }
                ]
            };

            // Replace the existing factory with the updated factory in the array
            return value.map((factory) => (factory.name === factoryName ? updatedFactory : factory));
        } else {
            // If the factory doesn't exist, create a new factory object and add it to the array
            const newFactory = {
                name: factoryName,
                slots: [{ item: item.item, amount: item.amount, quantity: item.quantity }]
            };

            return [...value, newFactory];
        }
    });
}
factoryStore.subscribe((value) => {
    factories = value;
});
