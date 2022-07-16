import { Fragment, useCallback } from 'react';
import { BookModel, StoreModel } from '../stores.model';

import styles from './store-card.module.scss';
import { Rating } from '../rating/rating.component';
import { CountryFlag } from '../country-flag/country-flag.component';
import { DateUtil } from '../../utils/date.util';

interface StoreCardProps {
    store: StoreModel;
}

export const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
    const handleRatingChange = useCallback((rating: number) => {
        // todo: connect to API
        console.log('new rating set', rating);
    }, []);

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img
                    className={styles.image}
                    src={store.storeImage}
                    alt={store.name}
                ></img>
            </div>

            <div className={styles.header}>
                <h2>{store.name}</h2>
                <div>
                    <Rating
                        rating={store.rating}
                        onChange={handleRatingChange}
                    />
                </div>
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
    return (
        <div className={styles.booksGrid}>
            <h3 className={styles.booksHeader}>Best-selling books</h3>
            {books.length > 0 ? (
                books.map((b) => (
                    <Fragment key={b.id}>
                        <span>{b.title}</span>
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
