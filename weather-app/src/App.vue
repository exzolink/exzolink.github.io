<template>
	<div id="app">
		<mainComponent></mainComponent>
	</div>
</template>

<script>
import mainComponent from './components/mainComponent.vue';

export default {
	name: "App",
	components: {
		mainComponent,
	}
};
</script>

<style lang="scss">
*,
*:before,
*:after {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	outline: none;
	user-select: none;
}

body {
	font-size: 16px;
	font-family: -apple-system, BlinkMacSystemFont, "Roboto", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

html {
	scrollbar-width: none;

	&::-webkit-scrollbar {
		width: 0;
	}
}
</style>
