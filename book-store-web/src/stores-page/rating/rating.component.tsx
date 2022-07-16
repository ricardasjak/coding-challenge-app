import { useState } from 'react';
import styles from './rating.module.scss';

const MAX_RATING = 5;

interface RatingProps {
    rating: number;
    onChange: (value: number) => void;
}

export const Rating: React.FC<RatingProps> = ({ rating, onChange }) => {
    const [hover, setHover] = useState(0);
    return (
        <div className={styles.rating}>
            {Array(MAX_RATING)
                .fill(0)
                .map((_, index) => {
                    const newRating = index + 1;
                    return (
                        <div
                            role='button'
                            key={index}
                            className={
                                newRating <= (hover || rating)
                                    ? styles.on
                                    : styles.off
                            }
                            onClick={() => onChange(newRating)}
                            onMouseEnter={() => setHover(newRating)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            <span className='star'>&#9733;</span>
                        </div>
                    );
                })}
        </div>
    );
};
