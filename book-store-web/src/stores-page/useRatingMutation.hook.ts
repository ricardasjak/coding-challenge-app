import { useMutation, useQueryClient } from 'react-query';
import { StoresService } from '../stores-service/stores.service';
import { STORES_QUERY } from '../stores-service/stores.query';
import { StoreModel } from './stores.model';

export const useRatingMutation = (store: StoreModel) => {
    const queryClient = useQueryClient();
    return useMutation(
        (newRating: number) => StoresService.updateRating(store.id, newRating),
        {
            onMutate: async (value) => {
                // Cancel current queries
                await queryClient.cancelQueries([STORES_QUERY]);

                // Use optimistic update
                queryClient.setQueryData([STORES_QUERY], (old = []) => {
                    const newData = [...(old as StoreModel[])]; // types handling is not super nice in react query
                    const foundStore = newData.find(
                        ({ id }) => id === store.id,
                    );
                    if (foundStore) {
                        foundStore.rating = value;
                    }
                    return newData;
                });
            },
            onSuccess: (result, variables, context) => {
                // optimistic update is good enough, however this can be improved
                console.log('success', { result, variables, context });
            },
            onError: async (error, variables, context) => {
                console.log('error', { error, variables, context });
                alert('Rating cannot be changed. Some error occurred');
                await queryClient.refetchQueries([STORES_QUERY]);
            },
        },
    );
};
