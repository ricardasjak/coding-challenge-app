import { StoreModel } from '../stores-page/stores.model';
import { ApiRequest, StorePatchRequest, StoresResponse } from './stores.model';
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
    updateRating: async (storeId: string, rating: number): Promise<unknown> => {
        const request: ApiRequest<StorePatchRequest> = {
            data: {
                id: storeId,
                type: 'stores',
                attributes: {
                    rating,
                },
            },
        };
        const resp = await fetch(`${END_POINTS.stores}/${storeId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/vnd.api+json',
            },
            body: JSON.stringify(request),
        });
        return (await resp.json()) as unknown;
    },
};
