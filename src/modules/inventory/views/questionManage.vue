<template>
	<div class="questionManage">
		<el-row>
			<el-col :span="2">
				<div class="grid-content1 bg-purple-dark">
					{{title}}
				</div>
			</el-col>
			<el-col :span="21">
				<div class="grid-content1 bg-purple-dark">
					<el-divider class="divided"></el-divider>
				</div>
			</el-col>
			<el-col :span="1">
				<div class="grid-content1 bg-purple-dark">
					<i class="el-icon-close"></i>
				</div>
			</el-col>
		</el-row>
		<div class="center">
		<el-row>
			<el-col :span="14">
				<div class="grid-content1">
					<el-form ref="form" :model="form" label-width="100px" :rules="rules">
						<el-form-item label="问题类别">
							<el-select v-model="form.questionType" placeholder="请选择问题类别" clearable class="setlength">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="责任人" prop="questionDutyPerson">
							<el-input v-model="form.questionDutyPerson" placeholder="请选择活动区域" clearable></el-input>
						</el-form-item>
						<el-form-item label="所属自然村">
							<el-select v-model="form.region" placeholder="请选择活动区域" clearable class="setlength">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="问题描述" prop="questionDescription">
							<el-input type="textarea" rows="5" v-model="form.questionDescription" placeholder="请输入问题描述" clearable></el-input>
						</el-form-item>
						<el-form-item label="解决建议" prop="questionSuggestion">
							<el-input type="textarea" rows="5" v-model="form.questionSuggestion" placeholder="请输入解决建议" clearable></el-input>
						</el-form-item>
						<el-form-item>
							<el-button @click="goback">返回</el-button>
							<el-button type="primary" @click="submit">保存</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
		</el-row>
		</div>
	</div>
</template>

<script>
	
	import {getQuestionInfo,getQuestionInfoById,saveQuestionInfo} from"../api/index.js"
	export default {
		data() {
			return {
				title:'添加信息',
				form: {
					questionId: '', //乡村振兴问题id
					orgId: '', //所属组织id
					townId: '', //所属乡镇id
					townCode: '', //乡镇code
					administrativeId: '', //所属行政村id
					administrativeCode: '', //所属行政村code
					villageId: '', //所属自然村id
					questionDescription: '', //问题描述
					questionType: '', //问题类型
					questionSuggestion: '', //问题解决建议
					questionDutyPerson: '', //问题责任人
					personId: '', //操作人id
					personName: '', // 操作人名称
					createTime: '', //创建时间
					updateTime: '', //修改时间
				},
				rules: {
					questionDutyPerson: [{
						required: true,
						message: '请输入责任人',
						trigger: 'blur'
					}],
					questionDescription: [{
							required: true,
							message: '请输入问题描述',
							trigger: 'blur'
						},
						{
							min: 5,
							message: '长度大于3个字符',
							trigger: 'blur'
						}
					],
					questionSuggestion: [{
						required: true,
						message: '请输入解决建议',
						trigger: 'blur'
					},
					{
						min: 5,
						message: '长度大于3个字符',
						trigger: 'blur'
					}
					],
				}
			}
		},
		methods: {
			goback() {
				this.$router.push({
					path: 'questionList',
					query: {
						name: 'admin',
						code: 10021
					}
				})
			},
			getQuestionInfoById(id){
				getQuestionInfoById(id).then(res=>{
					console.log(res)
				})
			},
			saveQuestionInfo(){
				saveQuestionInfo(this.form).then(res=>{
					console.log(res)
				})
			},
			submit(){
				this.$refs.form.validate((valid) => {
				        if (valid) {
				          this.saveQuestionInfo()
				        } else {
				          this.$message('请填写完整相关信息')//就像用户提示发生错误的消息
				        }
				  })
			}
		},
		
		mounted() {
			this.getQuestionInfoById()
		}
	}
</script>

<style lang="scss" scoped>
	.questionManage {
		.setlength{
			width:100%;
		}
		.el-row {
			margin-bottom: 20px;

			&:last-child {
				margin-bottom: 0;
			}
		}
		.el-col {
			border-radius: 4px;
		}
 .center{
       		  padding-left: 20%;
       		  margin-top: 0;
       }
	   .divided{
	   			width:104%;
	   			margin-top: 12px;
	   			margin-left: -30px;
	   		}	
	   		.grid-content1 {
	   			height: 50px;
	   			line-height: 50px;
	   			padding-left: 30px;
	   			padding-top: 10px;
	   			font: 20px Arial;
	   		}
		.bg-purple-dark {
			//background: #eeeeee;
		}

		.bg-purple {
			//background: #eeeeee;
		}

		.bg-purple-light {
			//background: #eeeeee;
		}

		.grid-content {
			border-radius: 4px;
			min-height: 50px;
			line-height: 50px;
			padding-left: 100px;

		}


		.row-bg {
			padding: 10px 0;
			background-color: #f9fafc;
		}



	}
</style>
