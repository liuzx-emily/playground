<style scoped></style>
<template>
	<section v-loading.fullscreen.lock="loading">
		<el-dialog title="修改个人信息" :visible.sync="dialogVisible" width="400px" :modal-append-to-body='false' :close-on-click-modal="false">
			<el-form ref="form" label-width="80px" :model="dialogData" :rules="rules">
				<el-form-item label="旧密码" prop="oldpassword">
					<el-input v-model="dialogData.oldpassword" type="password"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="password">
					<el-input v-model="dialogData.password" type="password"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="password_repeat">
					<el-input v-model="dialogData.password_repeat" type="password"></el-input>
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
import original_data from './data/dialogChangePasswordData.js';
export default {
	data() {
		var validatePass = (rule, value, callback) => {
			if (this.dialogData.password_repeat !== "") {
				this.$refs.form.validateField("password_repeat");
			}
			callback();
		};
		var validatePass2 = (rule, value, callback) => {
			if (value !== this.dialogData.password) {
				callback(new Error("两次输入密码不一致!"));
			} else {
				callback();
			}
		};
		return {
			loading: false,
			dialogVisible: false,
			dialogData: this._.cloneDeep(original_data),
			rules: {
				oldpassword: [
					{ required: true, message: "不能为空", trigger: ["blur", "change"] },
				],
				password: [
					{ required: true, message: "不能为空", trigger: ["blur", "change"] },
					{ min: 4, max: 12, message: "长度在 4 到 12 个字符", trigger: ["blur", "change"] },
					{ validator: validatePass, trigger: ["blur", "change"] }
				],
				password_repeat: [
					{ required: true, message: "不能为空", trigger: ["blur", "change"] },
					{ min: 4, max: 12, message: "长度在 4 到 12 个字符", trigger: ["blur", "change"] },
					{ validator: validatePass2, trigger: ["blur", "change"] }
				]
			}
		}
	},
	methods: {
		openDial() {
			this.loading = true;
			this.dialogData = this._.cloneDeep(original_data);
			this.dialogVisible = true;
			this.$nextTick(() => {
				this.$refs.form.clearValidate();
				this.loading = false;
			});
		},
		saveDial() {
			this.$refs.form.validate(valid => {
				if (valid) {
					this.loading = true;
					let param = {};
					param.id = this.$store.state.userId;
					param.old = this.dialogData.oldpassword;
					param.new = this.dialogData.password;
					this.xaxios({
						method: 'post',
						data: param,
						url: "/api/user/changePassword.do"
					}).then(res => {
						if (res.code == 1) {
							this.$message({
								message: '操作成功！',
								type: 'success'
							});
							this.dialogVisible = false;
						} else {
							this.$message({
								message: res.message,
								type: 'error'
							});
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