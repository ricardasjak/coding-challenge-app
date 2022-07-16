import { StoreList } from './store-list/store-list.component';
import styles from './stores-page.module.scss';

// todo: remove mock, replace with real api response
import { STORES_MOCK } from './stores.mock';

export const StoresPage: React.FC = () => {
    return (
        <div className={styles.page}>
            <h1>Book stores</h1>
            <StoreList stores={STORES_MOCK} />
        </div>
    );
};
