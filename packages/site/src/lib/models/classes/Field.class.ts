import type { Option } from '$lib/models/interfaces/option.interface';
import { startCase } from '$lib/utils/common';

type FieldType =
	| 'text'
	| 'email'
	| 'number'
	| 'date'
	| 'datetime-local'
	| 'select'
	| 'checkbox'
	| 'radio';

export class Field {
	type: FieldType = 'text';
	private _label = '';
	valid = true;
	errorMessage: string | undefined = '';
	value: any;
	hint = '';
	required = false; // TODO: derive from zod schema

	constructor(public name: string, data?: Partial<Field>) {
		Object.assign(this, data);
	}

	public get label(): string {
		return this._label || startCase(this.name);
	}

	public set label(value: string) {
		this._label = value;
	}
}

export class SelectField extends Field {
	override type = 'select' as const;
	options: Option[] = [];
	constructor(name: string, data?: Partial<SelectField>) {
		super(name, data);
		Object.assign(this, data);
	}
}
