interface Entity {
    type: 'stores' | 'countries' | 'books' | 'authors';
    id: string;
}

export interface StoreAttributes {
    name: string;
    storeImage: string;
    rating: number;
    countryCode: string;
    establishmentDate: string;
    website: string;
}

export interface BookAttributes {
    name: string;
    copiesSold: number;
}

export interface AuthorAttributes {
    fullName: string;
}

export interface CountryAttributes {
    code: string;
}

export interface StoreEntity extends Entity {
    type: 'stores';
    attributes: StoreAttributes;
    relationships: {
        countries: { data: Entity };
        books?: { data: Array<Entity> };
    };
}

export interface CountryEntity extends Entity {
    type: 'countries';
    attributes: CountryAttributes;
}

export interface BookEntity extends Entity {
    type: 'books';
    attributes: BookAttributes;
    relationships: {
        author: { data: Entity };
    };
}

export interface AuthorEntity extends Entity {
    type: 'authors';
    attributes: AuthorAttributes;
}

export interface ApiResponse<T> {
    jsonapi: { version: string };
    meta: { total: number };
    data: Array<T>;
    included: Array<CountryEntity | BookEntity | AuthorEntity>;
}

export type StoresResponse = ApiResponse<StoreEntity>;
