<template>
	<!-- 说明：
        在 a.limitless-menu-li-name 上通过style加padding，是为了背景颜色覆盖一整行。
        如果在 li 上加padding，那么它的子级的背景颜色就不是一整行了。 
    -->
	<ul class="limitless-menu-ul">
		<li v-for="(item,index) in formattedData" class="limitless-menu-li" :key="index">
			<section class="name_and_controlBtn">
				<!-- type==1 是导航 -->
				<template v-if="item.type==1">
					<a class="limitless-menu-li-name" @click="item.showChild = !item.showChild" :style="paddingStyle"> {{item.name}} </a>
				</template>
				<!-- 是页面 -->
				<template v-else>
					<router-link class="limitless-menu-li-name" :to="item.code" :style="paddingStyle"> {{item.name}} </router-link>
				</template>
				<span class="controlBtn" v-if="item.hasChild" @click="item.showChild = !item.showChild">
					<i class="fa fa-angle-up" v-if="item.showChild"></i>
					<i class="fa fa-angle-down" v-else></i>
				</span>
			</section>
			<submenu v-if="item.hasChild" :data="item.child" :level="level+1" v-show="item.showChild"></submenu>
		</li>
	</ul>
</template>
<script>
import _ from 'lodash';
export default {
	// 自己调用自己，所以必须得写name！！！！
	name: 'submenu',
	props: {
		data: Array,
		level: Number
	},
	computed: {
		paddingStyle() {
			return {
				'paddingLeft': this.level * 20 + 'px'
			};
		},
	},
	data() {
		return {
			formattedData: this.formattingData(),
		}
	},
	watch: {
		data() {
			this.formattedData = this.formattingData();
		}
	},
	mounted() { },
	methods: {
		// 格式化数据，添加属性showChild，计算属性hasChild
		formattingData() {
			// let data = this.data;
			// 必须要先深拷贝一下，不然就会出错，原因未知？？？？？
			let data = _.cloneDeep(this.data);
			let formattedData = _.map(data, (item) => {
				if (item.child && item.child.length > 0) {
					item.hasChild = true;
				} else {
					item.hasChild = false;
				}
				item.showChild = true;
				return item;
			});
			return formattedData;
		}
	}
};
</script>