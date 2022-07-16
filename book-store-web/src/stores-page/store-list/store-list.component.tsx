import { StoreModel } from '../stores.model';
import { StoreCard } from '../store-card/store-card.component';

import styles from './store-list.module.scss';

interface StoreListProps {
    stores: StoreModel[];
}

export const StoreList: React.FC<StoreListProps> = ({ stores }) => {
    return (
        <div className={styles.list}>
            {stores.map((store) => (
                <StoreCard key={store.id} store={store} />
            ))}
        </div>
    );
};
