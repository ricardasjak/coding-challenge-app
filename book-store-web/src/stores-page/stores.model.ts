export interface StoreModel {
    id: string;
    name: string;
    storeImage: string;
    rating: 1 | 2 | 3 | 4 | 5;
    books: BookModel[];
    countryCode: string;
    establishmentDate: string;
    website: string;
}

export interface BookModel {
    id: string;
    title: string;
    author: string;
}
