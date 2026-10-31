import { DicePoolField } from "../helpers/schema.mjs";
import GrimwildItemBase from "./base-item.mjs";

/**
 * Build the fields shared by Arcana items and magical Arcana treasures.
 * @param {object} fields Foundry data field constructors.
 * @returns {object} Shared Arcana field schema.
 */
export function createArcanaFields(fields) {
	const requiredInteger = { required: true, nullable: false, integer: true };
	const optionalString = { required: false, blank: true };

	return {
		touchstones: new fields.StringField(optionalString),
		limitations: new fields.HTMLField(optionalString),
		notes: new fields.SchemaField({
			label: new fields.StringField(optionalString),
			description: new fields.HTMLField({ required: true, blank: true })
		}),
		trackers: new fields.ArrayField(new fields.SchemaField({
			type: new fields.StringField({
				required: true,
				blank: false,
				choices: {
					pool: "Pool",
					points: "Points"
				}
			}),
			label: new fields.StringField(optionalString),
			pool: new DicePoolField(),
			points: new fields.SchemaField({
				showSteps: new fields.BooleanField(),
				value: new fields.NumberField({
					...requiredInteger,
					initial: 1,
					min: 0
				}),
				max: new fields.NumberField({
					initial: 1,
					min: 1
				})
			})
		}), { initial: [] })
	};
}

export default class GrimwildArcana extends GrimwildItemBase {
	static LOCALIZATION_PREFIXES = [
		"GRIMWILD.Item.base",
		"GRIMWILD.Item.Arcana"
	];

	static defineSchema() {
		const fields = foundry.data.fields;
		const schema = super.defineSchema();

		schema.tier = new fields.StringField({
			initial: "minor"
		});

		Object.assign(schema, createArcanaFields(fields));

		return schema;
	}

	prepareDerivedData() {}
}
