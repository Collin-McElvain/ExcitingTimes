<template>
  <div class='clock-column'>
      <p class='clock-timer'>{{time}}</p>
      <p class='clock-label'>{{valueName}}</p>
  </div>
</template>

<script>
import Vue from 'vue';

const counter = Vue.component('counter', {
  props: ['time', 'valueName'],
  methods: {

  },
});

export default counter;
</script>

<style>
.clock-column {
	margin-right: auto;
	text-align: center;
	position: relative;

	&::after {
		content: ':';
		display: block;
		height: .25rem;
		width: .25rem;
		font-size: 36px;
		font-weight: 200;
		color: #131313;
		position: absolute;
		top: 60px;
		right: -35px;
	}
	&:last-child {
		&::after {
			display: none;
		}
	}
}

.clock-column:last-child {
	margin-right: 0;
}

.clock-label {
	padding-top: 10px;
	text-transform: uppercase;
	color: #131313;
	font-size: 14px;
	text-align: center;
	border-top: 1px solid rgba(19, 19, 19, 0.5);
}

.clock-timer {
	color: #131313;
	font-size: 36px;
	line-height: 1;
}
</style>