<template>
	<section class="grid grid-3col">
		<ol class="items-list grid-span-3">
			<li class="flexrow items-header stroke stroke-bottom">
				<div class="item-name">{{ game.i18n.localize('GRIMWILD.Actor.Tabs.Treasure') }}</div>
				<div class="item-controls">
					<template v-if="context.editable">
						<button class="item-control item-create"
							title="Create item"
							data-action="createDoc"
							data-document-class="Item"
							data-type="treasure"
							type="button"
						>
							<i class="fas fa-plus"></i><span>Add</span>
						</button>
					</template>
					<button class="item-control item-compendium" type="button" data-action="openPack" data-pack="grimwild.treasures"><i class="fas fa-atlas"></i>Compendium</button>
				</div>
			</li>
			<li v-for="item in treasures" :key="item._id"
				:class="`item treasure flexcol ${context.activeItems?.[item._id] ? 'active' : ''} stroke stroke-bottom`"
				:data-item-id="item._id"
				data-drag="true"
				draggable="true"
				data-document-class="Item"
			>
				<div class="item-summary flexrow">
					<div class="item-name">
						<div class="item-image">
							<a class="rollable" data-roll-type="item" data-action="roll">
								<img :src="item.img" :title="item.name" width="24" height="24"/>
							</a>
						</div>
						<div data-action="toggleItem" :data-item-id="item._id">{{ item.name }}</div>
					</div>
					<div v-if="isArcana(item)" class="item-trackers flexrow">
						<template v-for="(tracker, trackerKey) in item.system.trackers" :key="trackerKey">
							<div class="tracker flexrow">
								<button v-if="tracker.type === 'pool'"
									class="tracker-roll"
									data-action="rollPool"
									:data-item-id="item.id"
									:data-key="trackerKey"
								><i class="fas fa-dice-d6"></i><strong v-if="tracker.label">{{ tracker.label }}</strong></button>
								<strong v-else-if="tracker.label">{{ tracker.label }}</strong>
								<div class="tracker-value">
									<div v-if="tracker.type === 'pool'" class="tracker-value-pool">
										<input type="number"
											data-action-change="updateItemTracker"
											:data-item-id="item.id"
											:data-tracker-key="trackerKey"
											:value="tracker.pool.diceNum"
											min="0"
											:max="tracker.pool.max > 0 ? tracker.pool.max : null"
										/><span class="pool-suffix">d</span>
									</div>
									<template v-else-if="tracker.type === 'points'">
										<div v-if="tracker.points.showSteps" class="tracker-steps flexrow">
											<input v-for="(num, i) in tracker.points.max" :key="i" type="checkbox"
												data-action="updateItemTracker"
												:data-item-id="item.id"
												:data-tracker-key="trackerKey"
												:data-tracker-step-key="i"
												:data-value="num"
												:data-tracker-value="tracker.points.value"
												:checked="tracker.points.value >= num"
											/>
										</div>
										<div v-else class="tracker-value-numeric">
											<input type="number"
												data-action-change="updateItemTracker"
												:data-item-id="item.id"
												:data-tracker-key="trackerKey"
												:value="tracker.points.value"
												min="0"
												:max="tracker.points.max"
											/> / {{ tracker.points.max }}
										</div>
									</template>
								</div>
							</div>
						</template>
					</div>
					<div class="item-controls">
						<a class="item-control item-edit"
							:title="game.i18n.format('DOCUMENT.Edit', {type: item.type})"
							data-action="viewDoc"
						><i class="fas fa-edit"></i></a>
						<a class="item-control item-delete"
							v-if="context.editable"
							:title="game.i18n.format('DOCUMENT.Delete', {type: item.type})"
							data-action="deleteDoc"
						><i class="fas fa-trash"></i></a>
					</div>
				</div>
				<div v-if="item.system.description" class="item-description-wrapper">
					<div class="item-description flexcol">
						<em>{{ getValue(item) }} · {{ getType(item) }}</em>
						<div v-if="isArcana(item) && item.system.touchstones" class="item-touchstones"><strong>Touchstones:</strong> <em>{{ item.system.touchstones }}</em></div>
						<div v-if="isArcana(item) && item.system.limitations" class="item-limitations">
							<strong>Limitations:</strong>
							<div class="item-limitations-description" v-html="context.editors[`items.${item.id}.system.limitations`].enriched"></div>
						</div>
						<hr/>
						<div class="item-description" v-html="context.editors[`items.${item.id}.system.description`].enriched"></div>
						<div v-if="item.system.notes.description" class="item-notes">
							<strong v-if="item.system.notes.label">{{ item.system.notes.label }}</strong>
							<div class="item-notes-description" v-html="context.editors[`items.${item.id}.system.notes.description`].enriched"></div>
						</div>
					</div>
				</div>
			</li>
		</ol>
	</section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['context']);

const treasures = computed(() => [
	...(props.context.itemTypes.treasure ?? []),
	...(props.context.itemTypes.arcana ?? [])
].sort((a, b) => (a.sort || 0) - (b.sort || 0)));

function isArcana(item) {
	return item.type === 'arcana'
		|| (item.system.treasureType === 'magic' && item.system.isArcana);
}

function getValue(item) {
	const value = item.type === 'arcana' ? item.system.tier : item.system.value;
	return game.i18n.localize(`GRIMWILD.Item.Treasure.FIELDS.value.options.${value}`);
}

function getType(item) {
	const type = item.type === 'arcana' ? 'magic' : item.system.treasureType;
	return game.i18n.localize(`GRIMWILD.Item.Treasure.FIELDS.treasureType.options.${type}`);
}
</script>
