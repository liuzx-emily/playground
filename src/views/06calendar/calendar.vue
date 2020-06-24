<style lang="less">
	.calendar-container {
		.kongzhikuandu {
			width: calc(100% / 7);
		}
		.cell {
      height: 120px;
      overflow: auto;
			&.isThisMonth {}
			&:not(.isThisMonth) {
				color: #aaa;
			}
		}
	}
</style>
<template>
	<section class="calendar-container">
		<!-- <section class="canlendar-head">{{year}}年{{month}}月</section> -->
		<section class="calendar-body">
			<section class="day">
				<span v-for="o in day" class="kongzhikuandu">{{o.label}}</span>
			</section>
			<section class="content">
				<span v-for="o in list" class="kongzhikuandu cell" :class="{isThisMonth:o.isThisMonth}">
					<slot :data="o">
						{{xtools.formattingDate(o.date)}}
					</slot>
				</span>
			</section>
		</section>
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
				day: [
					{ label: '周一', },
					{ label: '周二', },
					{ label: '周三', },
					{ label: '周四', },
					{ label: '周五', },
					{ label: '周六', },
					{ label: '周日', },
				]
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