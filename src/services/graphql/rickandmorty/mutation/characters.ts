import { gql, MutationHookOptions } from '@apollo/client';
import * as ts from 'io-ts';

import { GET_CHARACTERS } from '../query';

interface IAddCharacterParams {
	name?: string;
	gender?: string;
}

const ADD_CHARACTER_SCHEMA = ts.type({
	image: ts.string,
	name: ts.string,
	species: ts.string,
	status: ts.string
});

const ADD_CHARACTER_OPTIONS: MutationHookOptions<any, IAddCharacterParams> = {
	refetchQueries: [{ query: GET_CHARACTERS }]
};

const ADD_CHARACTER = gql`
	mutation addCharacter($params: addCharacterParams) {
		addCharacter(params: $params) {
			image
			name
			species
			status
		}
	}
`;

export const ADD_CHARACTER_ARGS = [ADD_CHARACTER, ADD_CHARACTER_OPTIONS, ADD_CHARACTER_SCHEMA] as const; // must always be 3 item array
