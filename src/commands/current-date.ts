import { injectable } from 'inversify';
import { execSync } from 'child_process';

import { Command } from '../types';

@injectable()
export default class CurrentDate implements Command {
	run() {
		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth() + 1; // January is 0
		const day = today.getDate();
		const hours = today.getHours();
		const minutes = today.getMinutes();
		const seconds = today.getSeconds();
		const googleSheetString = `=DATE(${ year }, ${ month }, ${ day })+TIME(${ hours }, ${ minutes }, ${ seconds })`;
		execSync(
			`echo '${ googleSheetString }' | xclip -selection clipboard`
		);
	}
}
