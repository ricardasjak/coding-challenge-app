import { useEffect, useState } from 'react';
import styles from './rating.module.scss';

const MAX_RATING = 5;

interface RatingProps {
    rating: number;
    onChange: (value: number) => void;
}

export const Rating: React.FC<RatingProps> = ({ rating, onChange }) => {
    const [hover, setHover] = useState(0);

    useEffect(() => {
        // reset hover state, if rating is changed externally
        setHover(0);
    }, [rating]);

    return (
        <div className={styles.rating} aria-label='rating'>
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
                            aria-label={`${newRating} ${
                                newRating > 1 ? 'stars' : 'star'
                            }`}
                        >
                            <span>&#9733;</span>
                        </div>
                    );
                })}
        </div>
    );
};
