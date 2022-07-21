import { StoreList } from './store-list/store-list.component';
import styles from './stores-page.module.scss';

// todo: remove mock, replace with real api response
import { StoresService } from '../stores-api/stores.service';
import { useQuery } from 'react-query';
import { STORES_QUERY } from '../stores-api/stores.query';

export const StoresPage: React.FC = () => {
    const query = useQuery([STORES_QUERY], StoresService.getAll, {
        refetchOnMount: true,
    });

    return (
        <div className={styles.page}>
            <h1>Book stores</h1>
            {query.isLoading && <span>Loading...</span>}
            {query.data && <StoreList stores={query.data} />}
        </div>
    );
};
