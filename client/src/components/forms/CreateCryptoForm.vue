<template>
	<form @submit.prevent="createCrypto" class="text-left">
		<div class="form-group">
			<label for="name" class="col-form-label">
				Name:
				<br />(Used in "Market Value" link. Please choose an actual crypto's full name (e.g., Bitcoin) and not its ticker symbol (e.g., BTC).
			</label>
			<input
				type="text"
				v-model="newCrypto.name"
				class="form-control"
				id="name"
				placeholder="Not Case Sensitive"
				required
			/>
		</div>
		<div class="form-group">
			<label for="description" class="col-form-label">Description:</label>
			<input
				type="text"
				v-model="newCrypto.description"
				class="form-control"
				id="description"
				placeholder="Optional"
			/>
		</div>
		<div class="form-group">
			<label for="img" class="col-form-label">Image URL (Web Address):</label>
			<input type="text" v-model="newCrypto.img" class="form-control" id="img" placeholder="Optional" />
		</div>
		<div class="form-group">
			<label for="notes" class="col-form-label">Notes:</label>
			<input
				type="text"
				v-model="newCrypto.notes"
				class="form-control"
				id="notes"
				placeholder="Optional"
			/>
		</div>
		<button type="submit" class="btn btn-primary">Submit</button>
		<button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
	</form>
</template>

<script>
export default {
	name: "createCryptoForm",
	data() {
		return {
			newCrypto: {
				name: "",
				description: "",
				img: "",
				notes: "",
				posTxCount: 0,
				localValAv: 0,
				totalOwned: 0
			}
		};
	},
	methods: {
		createCrypto() {
			this.$store.dispatch("createCrypto", this.newCrypto);
			this.newCrypto = {
				name: "",
				description: "",
				img: "",
				notes: "",
				posTxCount: 0,
				localValAv: 0,
				totalOwned: 0
			};
		}
	}
};
</script>