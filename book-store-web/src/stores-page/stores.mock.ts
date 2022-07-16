import { StoreModel } from './stores.model';

export const STORES_MOCK: StoreModel[] = [
    {
        id: '1',
        name: 'MicroBooks',
        website: 'https://www.micro-books-store.com',
        rating: 4,
        storeImage:
            'https://i.pinimg.com/736x/51/a2/47/51a247e0d1785b89b70a17a1c8f31ac5--melbourne-australia-second-hand.jpg',
        establishmentDate: '1995-02-09T00:00:00+0000',
        countryCode: 'US',
        books: [
            {
                id: '1',
                author: 'Douglas Crockford',
                title: 'JavaScript: The Good Parts',
            },
            {
                id: '2',
                author: 'David Flanagan',
                title: 'JavaScript: The Definitive Guid',
            },
        ],
    },
    {
        id: '2',
        name: 'SquirroBooks',
        website: 'https://www.squirro.com',
        rating: 5,
        storeImage: 'https://i.ytimg.com/vi/g-5A1EJ4KMg/maxresdefault.jpg',
        establishmentDate: '2011-01-17T00:00:00+0000',
        countryCode: 'DE',
        books: [],
    },
    {
        id: '3',
        name: 'CryptoBook',
        website: 'https://www.crypto-book-store.com',
        rating: 3,
        storeImage:
            'https://www.crypto-news-flash.com/wp-content/uploads/2020/11/Bitcoin-Store.png',
        establishmentDate: '1971-10-10T00:00:00+0000',
        countryCode: 'CH',
        books: [],
    },
];
