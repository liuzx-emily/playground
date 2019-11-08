<style scoped></style>
<template>
	<section v-loading.fullscreen.lock="loading">
		<el-dialog title="修改个人信息" :visible.sync="dialogVisible" width="500px" :modal-append-to-body='false' :close-on-click-modal="false">
			<el-form ref="form" label-width="70px" :model="dialogData" :rules="rules">
				<el-form-item label="帐号">
					<el-input v-model="dialogData.username" disabled></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="name">
					<el-input v-model="dialogData.name"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="phone">
					<el-input v-model="dialogData.phone"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="dialogData.email"></el-input>
				</el-form-item>
				<el-form-item label="头像">
					<uploadOneImg :fimgUrl.sync="dialogData.profilePhoto" :canBeDeleted="false" width="50px" height="50px"></uploadOneImg>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveDial">确 定</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<script>
import original_data from './data/dialogEditInfoData.js';
export default {
	props: {
		refreshFunc: {},
	},
	data() {
		return {
			loading: false,
			dialogVisible: false,
			dialogData: this._.cloneDeep(original_data),
			rules: {
				name: [
					{ required: true, message: "不能为空", trigger: ['blur', 'change'] },
					{ min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: ['blur', 'change'] },
				],
				phone: [
					{ validator: this.xElementRules.cellphone, trigger: ['blur', 'change'] }
				],
				email: [
					{ type: "email", message: "请输入正确的邮箱地址", trigger: ['blur', 'change'] }
				],
			}
		}
	},
	methods: {
		openDial() {
			this.loading = true;
			this.xaxios({
				url: "/api/user/detail.do",
				params: { id: this.$store.state.userId, }
			}).then(res => {
				for (let key in original_data) {
					this.dialogData[key] = res.data[key]
				}
				this.dialogVisible = true;
				this.$nextTick(() => {
					this.$refs.form.clearValidate();
					this.loading = false;
				});
			});
		},
		saveDial() {
			this.$refs.form.validate(valid => {
				if (valid) {
					let param = this._.cloneDeep(this.dialogData);
					param.id = this.$store.state.userId;
					this.loading = true;
					this.xaxios({
						method: 'post',
						url: "/api/user/edit.do",
						data: param,
					}).then(res => {
						if (res.code == 1) {
							this.$message({
								message: '操作成功！',
								type: 'success'
							});
							this.dialogVisible = false;
							this.refreshFunc && this.refreshFunc();
						}
						this.loading = false;
					});
				} else {
					return false;
				}
			});
		},
	}
};
</script>