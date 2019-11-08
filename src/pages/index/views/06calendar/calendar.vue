<style lang="less">
.calendar-container {
	ul {
		display: flex;
		flex-wrap: wrap;
		margin: 0;
		padding: 0;
		border-right: 1px solid #eee;
		li {
			margin: 0;
			padding: 0;
			width: 14%;
			flex-grow: 1;
			flex-shrink: 0;
			list-style: none;
		}
		li.header {
			background: lightblue;
		}
		li:not(.header) {
			height: 90px;

			border-bottom: 1px solid #eee;
			border-left: 1px solid #eee;
      overflow: auto;
			// &:hover {
			// 	background: #fafafa;
			// }
			&.thismonth {
				color: #777;
			}
			&:not(.thisMonth) {
				color: #ccc;

			}
		}
	}
}
</style>
<template>
	<section class="calendar-container">
		<section class="title">{{year}}年{{month}}月</section>
		<ul>
			<li v-for="(item,index) in list" :key="index" :class="{header:item.isHeader,thisMonth:item.isThisMonth}">
				<template v-if="item.isHeader">{{item.label}}</template>
				<template v-else-if="item.thisMonth">
					<slot :date="item.date"></slot>
				</template>
			</li>
		</ul>
	</section>
</template>
<script>
export default {
	props: ["year", "month"],
	watch: {
		year() {
			this.refreshData();
		},
		month() {
			this.refreshData();
		}
	},
	data() {
		return {
			list: [],
		}
	},
	created() {
		this.refreshData();
	},
	methods: {
		refreshData() {
			let arr = [];

      
			let firstDate = new Date(this.year, this.month - 1, 1);
			let firstDate_day = this.getDay(firstDate);


			let lastDate = new Date(this.year, this.month, 0);

			let lastDate_day = this.getDay(lastDate);


			const oneday = 24 * 60 * 60 * 1000;

			for (let i = 1; i <= 7; i++) {
				arr.push({ day: i, label: "周"+"一二三四五六七"[i - 1], isHeader: true });
			}

			// 
			for (let i = 1; i <= firstDate_day - 1; i++) {
				arr.push({ date: new Date(firstDate.getTime() - (firstDate_day - i) * oneday), });
			}

      // 当前月
			for (let i = firstDate.getTime(); i <= lastDate.getTime(); i += oneday) {
				arr.push({ date: new Date(i), isThisMonth: true, })
			}

			for (let i = lastDate_day + 1; i <= 7; i++) {
				arr.push({ date: new Date(lastDate.getTime() + (i - lastDate_day) * oneday) });
			}
      
			this.list = arr;
      console.log(arr);
		},
		getDay(date) {
			return date.getDay() || 7;
		}
	}
}
</script>