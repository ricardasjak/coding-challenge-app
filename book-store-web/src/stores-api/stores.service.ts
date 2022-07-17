import { StoreModel } from '../stores-page/stores.model';
import { StoresResponse } from '../api/stores.model';
import { StoresUtil } from './stores.util';

const END_POINTS = {
    stores: 'http://localhost:3000/stores',
};

export const StoresService = {
    getAll: async (): Promise<StoreModel[]> => {
        const resp = await fetch(END_POINTS.stores);
        const storesResponse = (await resp.json()) as StoresResponse;
        return StoresUtil.makeStoreModels(storesResponse);
    },
};
