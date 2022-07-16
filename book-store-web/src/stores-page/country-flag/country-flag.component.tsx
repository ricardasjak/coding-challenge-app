import { useState } from 'react';

interface CountryFlagProps {
    code: string;
}

// todo: consider self hosted svg solution
/**
 * accepts country codes, documention https://flagpedia.net/download/api
 * @param code - country code
 */
export const CountryFlag: React.FC<CountryFlagProps> = ({ code }) => {
    const src = `https://flagcdn.com/24x18/${code.toLowerCase()}.png`;
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return null;
    }

    return (
        <img
            src={src}
            width='24'
            height='18'
            alt='Country flag'
            onError={() => setHasError(true)}
        />
    );
};
