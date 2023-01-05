import 'reflect-metadata';
import { execSync } from 'child_process';
import { Container } from 'inversify';

import CurrentDate from './commands/current-date';
import { Command } from './types';

const TYPES = {
	CurrentDate: 'CurrentDate',
};

function setupContainer() {
	const container = new Container( { defaultScope: 'Singleton' } );
	container.bind< CurrentDate >( TYPES.CurrentDate ).to( CurrentDate );
	return container;
}

async function main() {
	const container = setupContainer();

	const commands = {
		'Copy current date to clipboard in Google Sheets format':
			TYPES.CurrentDate,
	};

	const descriptions = Object.keys( commands );
	let chosenDescription: string | null = null;
	try {
		chosenDescription = execSync( 'dmenu -l 10 -i', {
			input: descriptions.join( '\n' ),
			encoding: 'utf8',
		} );
	} catch ( e ) {
		process.exit( 0 );
	}

	chosenDescription = chosenDescription.replace( '\n', '' );

	const command = container.get< Command >( commands[ chosenDescription ] );
	command.run();
}

main();
