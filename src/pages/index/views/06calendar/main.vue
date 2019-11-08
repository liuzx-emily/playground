<template>
	<section>
		<input v-model="year" type="number">
		<input v-model="month" type="number">
		{{year}}年{{month}}月
		<calendar :year="year" :month="month">
			<template v-slot="scope">
				{{xtools.formattingDate(scope.date)}}
				<div v-if="scope.date.getDay() == 1">周一</div>
				<div v-if="scope.date.getDay() == 2">周二，啊啊啊啊啊啊</div>
				<div v-if="scope.date.getDay() == 5">周五了！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！</div>
			</template>
		</calendar>
	</section>
</template>
<script>
import calendar from './calendar'
export default {
	components: { calendar },
	data() {
		return {
			year: 2015,
			month: 2,
			list: [
				{ date: 11111 }
			]
		}
	},
	methods: {
		isMonday(date) {
			return date.getDay() == 1;
		},
	}
}
</script>