import { Fragment } from 'react';
import { BookModel, StoreModel } from '../stores.model';

import styles from './store-card.module.scss';

interface StoreCardProps {
    store: StoreModel;
}

export const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
    return (
        <div className={styles.card}>
            <img
                className={styles.image}
                src={store.storeImage}
                alt={store.name}
            ></img>

            <div className={styles.header}>
                <h2>{store.name}</h2>
                <div>{store.rating}</div>
            </div>

            <StoreCardBooks books={store.books} />

            <div className={styles.footer}>
                <div>
                    <span>{store.establishmentDate.substring(0, 10)}</span>
                    &nbsp;-&nbsp;
                    <a href={store.website} target={'_blank'} rel='noreferrer'>
                        {store.website}
                    </a>
                </div>
                <span>{store.countryCode}</span>
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
