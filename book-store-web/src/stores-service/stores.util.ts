import {
    AuthorEntity,
    BookEntity,
    CountryAttributes,
    StoresResponse,
} from './stores.model';
import { StoreModel } from '../stores-page/stores.model';

export const StoresUtil = {
    makeStoreModels: (resp: StoresResponse): StoreModel[] => {
        const { data, included } = resp;
        return data.map(({ id, relationships, attributes }) => {
            const countryId = relationships.countries.data.id;
            return {
                id,
                ...attributes,
                countryCode: (
                    included.find(
                        ({ type, id }) =>
                            type === 'countries' && id === countryId,
                    )?.attributes as CountryAttributes
                ).code,
                books: relationships.books
                    ? relationships.books.data.map((book) => {
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          const bookEntity = included.find(
                              ({ type, id }) =>
                                  type === book.type && id === book.id,
                          )! as BookEntity;

                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          const authorEntity = included.find(
                              ({ type, id }) =>
                                  type ===
                                      bookEntity.relationships.author.data
                                          .type &&
                                  id ===
                                      bookEntity.relationships.author.data.id,
                          )! as AuthorEntity;

                          return {
                              id: book.id,
                              ...bookEntity.attributes,
                              author: authorEntity.attributes.fullName,
                          };
                      })
                    : [],
            };
        });
    },
};
