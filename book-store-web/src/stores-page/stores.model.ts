export interface StoreModel {
    id: string;
    name: string;
    storeImage: string;
    rating: number;
    books: BookModel[];
    countryCode: string;
    establishmentDate: string;
    website: string;
}

export interface BookModel {
    id: string;
    name: string;
    author: string;
    copiesSold: number;
}
