import { gql, QueryHookOptions } from '@apollo/client';
import * as ts from 'io-ts';

interface IGetCharactersParams {
	page: number;
}

const GET_CHARACTERS_OPTIONS: QueryHookOptions = {
	variables: { page: 1 } as IGetCharactersParams
};

const GET_CHARACTERS = gql`
	query getCharacters($page: Int) {
		characters(page: $page) {
			info {
				count
				pages
				next
				prev
			}
			results {
				image
				name
				species
				status
			}
		}
	}
`;

const GET_CHARACTERS_SCHEMA = ts.type({
	characters: ts.type({
		info: ts.type({
			count: ts.number,
			pages: ts.number,
			next: ts.union([ts.null, ts.number]),
			prev: ts.union([ts.null, ts.number])
		}),
		results: ts.array(
			ts.type({
				image: ts.string,
				name: ts.string,
				species: ts.string,
				status: ts.string
			})
		)
	})
});

export const GET_CHARACTERS_ARGS = [GET_CHARACTERS, GET_CHARACTERS_OPTIONS, GET_CHARACTERS_SCHEMA] as const; // must always be 3 item array
