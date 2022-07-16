export type DateIso = string;

export interface StoreModel {
    id: string;
    name: string;
    storeImage: string;
    rating: 1 | 2 | 3 | 4 | 5;
    books: BookModel[];
    countryCode: string;
    establishmentDate: DateIso;
    website: string;
}

export interface BookModel {
    id: string;
    title: string;
    author: string;
}
