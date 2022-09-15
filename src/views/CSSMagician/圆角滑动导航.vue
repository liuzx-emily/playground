<style lang="scss" scoped>
	nav {
		--nav-width: 480px;
		--nav-tab-width: calc(var(--nav-width) / 4 - 15px);
		--nav-active-tab-width: calc(var(--nav-tab-width) + 60px);
		--current-active: 1;
		// 
		display: flex;
		justify-content: space-between;
		width: var(--nav-width);
		background: lightcoral;
		border: 10px solid lightcoral;
		border-radius: 10px 10px 80px 80px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		a {
			position: relative;
			z-index: 2;
			flex-basis: var(--nav-tab-width);
			padding: 20px 0;
			display: flex;
			flex-direction: column;
			border-radius: 10px;
			text-align: center;
			color: white;
			i.fa {
				text-align: center;
				font-size: 26px;
				position: relative;
				top: 10px;
				transition: top 0.5s;
			}
			span {
				transform: scale(0);
				opacity: 0;
				transition: 0.5s;
				margin-top: 5px;
				font-size: 14px;
			}
		}
		a.active {
			flex-basis: var(--nav-active-tab-width);
			transition: flex-basis 0.5s;
			color: lightcoral;
			i.fa {
				top: 0;
			}
			span {
				transform: scale(1);
				opacity: 1;
			}
		}
	}
	nav::before {
		position: absolute;
		z-index: 1;
		content: "";
		background: white;
		left: calc((var(--current-active) - 1)* var(--nav-tab-width));
		transition: left 0.5s;
		top: 0;
		bottom: 0;
		border-radius: 10px;
		width: var(--nav-active-tab-width);
	}
</style>
<template>
	<section>
		<!-- 为了两侧的圆角效果 
      1 把活跃的白色背景加在父元素上，父元素用了和背景同色的超宽border 
      2 用css变量（不用也行，就是用js算一下left，再去设置，一样哒~~~）
    -->
		<nav :style="{'--current-active':currentActive}">
			<a v-for="(item,index) in list" :key="index" :class="{active:item.active}" @click="handleClick(index)">
				<i class="fa" :class="'fa-'+item.icon"></i>
				<span>{{item.label}}</span>
			</a>
		</nav>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				list: [
					{ label: "Home", icon: "home", active: true },
					{ label: "Explore", icon: "compass", active: false },
					{ label: "Notification", icon: "bell", active: false },
					{ label: "Profile", icon: "user", active: false },
				]
			}
		},
		computed: {
			currentActive() {
				let curr = -1;
				for (let i = 0; i <= this.list.length - 1; i++) {
					if (this.list[i].active) {
						curr = i + 1;
					}
				}
				return curr;
			}
		},
		methods: {
			handleClick(i) {
				this.list.forEach((item, index) => {
					item.active = index === i;
				});
			}
		}
	}
</script>