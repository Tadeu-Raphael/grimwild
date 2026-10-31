<template>
	<fieldset>
		<legend>{{ game.i18n.localize('GRIMWILD.UI.details') }}</legend>
		<div class="form-group stacked">
			<div class="form-group">
				<label>{{ context.systemFields.value.label }}</label>
				<select name="system.value" v-model="context.system.value">
					<option value="minor">{{ game.i18n.localize('GRIMWILD.Item.Treasure.FIELDS.value.options.minor') }}</option>
					<option value="major">{{ game.i18n.localize('GRIMWILD.Item.Treasure.FIELDS.value.options.major') }}</option>
					<option value="mythic">{{ game.i18n.localize('GRIMWILD.Item.Treasure.FIELDS.value.options.mythic') }}</option>
				</select>
			</div>
			<div class="form-group">
				<label>{{ context.systemFields.treasureType.label }}</label>
				<select name="system.treasureType" v-model="context.system.treasureType">
					<option value="tangible">{{ game.i18n.localize('GRIMWILD.Item.Treasure.FIELDS.treasureType.options.tangible') }}</option>
					<option value="intangible">{{ game.i18n.localize('GRIMWILD.Item.Treasure.FIELDS.treasureType.options.intangible') }}</option>
					<option value="magic">{{ game.i18n.localize('GRIMWILD.Item.Treasure.FIELDS.treasureType.options.magic') }}</option>
				</select>
			</div>
			<div v-if="context.system.treasureType === 'magic'" class="form-group">
				<label>
					<input type="checkbox" name="system.isArcana" v-model="context.system.isArcana"/>
					{{ context.systemFields.isArcana.label }}
				</label>
			</div>
		</div>
		<fieldset v-if="context.system.treasureType === 'magic' && context.system.isArcana">
			<legend>{{ game.i18n.localize('GRIMWILD.Item.Treasure.arcanaDetails') }}</legend>
			<div class="form-group stacked">
				<div class="form-group">
					<label>{{ context.systemFields.touchstones.label }}</label>
					<input type="text" name="system.touchstones" v-model="context.system.touchstones"/>
				</div>
				<div class="form-group stacked">
					<label>{{ context.systemFields.limitations.label }}</label>
					<Prosemirror :editable="context.editable" :field="context.editors['system.limitations']"/>
				</div>
			</div>
		</fieldset>
	</fieldset>
</template>

<script setup>
import { Prosemirror } from '@/components';

defineProps(['context']);
</script>
