import { Fragment, useMemo } from 'react';
import { BookModel, StoreModel } from '../stores.model';

import styles from './store-card.module.scss';
import { Rating } from '../rating/rating.component';
import { CountryFlag } from '../country-flag/country-flag.component';
import { DateUtil } from '../../utils/date.util';
import { StoresService } from '../../stores-service/stores.service';
import { useMutation, useQueryClient } from 'react-query';
import { STORES_QUERY } from '../../stores-service/stores.query';

interface StoreCardProps {
    store: StoreModel;
}

export const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(
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

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img
                    className={styles.image}
                    src={store.storeImage}
                    alt={store.name}
                />
            </div>

            <div className={styles.header}>
                <h2>{store.name}</h2>
                <Rating rating={store.rating} onChange={mutation.mutate} />
            </div>

            <StoreCardBooks books={store.books} />

            <div className={styles.footer}>
                <div>
                    <span>{DateUtil.formatDate(store.establishmentDate)}</span>
                    &nbsp;-&nbsp;
                    <a href={store.website} target={'_blank'} rel='noreferrer'>
                        {store.website}
                    </a>
                </div>
                <CountryFlag code={store.countryCode} />
            </div>
        </div>
    );
};

const StoreCardBooks: React.FC<{ books: BookModel[] }> = ({ books }) => {
    const sortedBooks = useMemo(
        () => books.sort((a, b) => b.copiesSold - a.copiesSold).slice(0, 2),
        [books],
    );

    return (
        <div className={styles.booksGrid}>
            <h3 className={styles.booksHeader}>Best-selling books</h3>
            {sortedBooks.length > 0 ? (
                sortedBooks.map((b) => (
                    <Fragment key={b.id}>
                        <span>{b.name}</span>
                        <span>{b.author}</span>
                    </Fragment>
                ))
            ) : (
                <>
                    <span>No data available</span>
                    <span />
                </>
            )}
        </div>
    );
};
