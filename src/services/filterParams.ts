import { ParsedQs } from 'qs';

export default function filterParams(query: ParsedQs) {
    const filteredParams: { [key: string]: string } = {};

    const minPrice = parseInt(query.minPrice as string) || Number.MIN_SAFE_INTEGER;
    const maxPrice = parseInt(query.maxPrice as string) || Number.MAX_SAFE_INTEGER

    Object.keys(query).forEach(key => {
        if (key !== 'minPrice' && key !== 'maxPrice') {
            const value = query[key];

            if (typeof value === 'string') {
                filteredParams[key] = value;
            } else if (Array.isArray(value) && typeof value[0] === 'string') {
                filteredParams[key] = value[0];
            }
        }
    });

    return {filteredParams, minPrice, maxPrice};
}
