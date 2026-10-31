import GrimwildItemBase from "./base-item.mjs";
import { createArcanaFields } from "./item-arcana.mjs";

export default class GrimwildTreasure extends GrimwildItemBase {
	static LOCALIZATION_PREFIXES = [
		"GRIMWILD.Item.base",
		"GRIMWILD.Item.Treasure"
	];

	static defineSchema() {
		const fields = foundry.data.fields;
		const schema = super.defineSchema();

		schema.value = new fields.StringField({
			required: true,
			blank: false,
			choices: {
				minor: "Minor",
				major: "Major",
				mythic: "Mythic"
			},
			initial: "minor"
		});

		schema.treasureType = new fields.StringField({
			required: true,
			blank: false,
			choices: {
				tangible: "Tangible",
				intangible: "Intangible",
				magic: "Magic"
			},
			initial: "tangible"
		});

		schema.isArcana = new fields.BooleanField({ initial: false });

		Object.assign(schema, createArcanaFields(fields));

		return schema;
	}
}
