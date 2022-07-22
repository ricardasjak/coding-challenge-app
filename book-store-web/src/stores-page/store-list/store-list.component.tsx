import { StoreModel } from '../stores.model';
import { StoreCard } from '../store-card/store-card.component';

import styles from './store-list.module.scss';

interface StoreListProps {
    stores: StoreModel[];
}

export const StoreList: React.FC<StoreListProps> = ({ stores }) => {
    return (
        <ul className={styles.list}>
            {stores.map((store) => (
                <li key={store.id}>
                    <StoreCard store={store} />
                </li>
            ))}
        </ul>
    );
};
