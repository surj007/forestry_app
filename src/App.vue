<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default{
	name: 'APP',
	created() {
		this.$store.dispatch('getFileInfo', this);
	}
}
</script>
