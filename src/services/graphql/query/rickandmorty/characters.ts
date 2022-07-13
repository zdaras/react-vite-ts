import { gql } from '@apollo/client';
import * as ts from 'io-ts';

import { IOpts } from '@/services/graphql/graphql-types';

interface IGetCharactersParams {
	page: number;
	filter: {
		name: string;
		status: string;
		species: string;
		gender: string;
	};
}

const GET_CHARACTERS_OPTIONS: IOpts = {
	initialData: { characters: { info: { prev: null, next: null }, results: [] } },
	variables: { page: 1 } as IGetCharactersParams
};

const GET_CHARACTERS = gql`
	query getCharacters($page: Int, $filter: FilterCharacter) {
		characters(page: $page, filter: $filter) {
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
