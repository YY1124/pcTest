<template>
	<div class="itemManage">
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
					<el-form ref="info" :model="info" label-width="130px" :rules="rules">
						<el-form-item label="项目名称" prop="projectName">
							<el-input v-model="info.projectName" placeholder="请输入项目名称" clearable></el-input>
						</el-form-item>
						<el-form-item label="项目类型" prop="projectType">
							<el-select v-model="info.projectType" placeholder="请选择项目类型" clearable class="setlength">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="责任人" prop="personName">
							<el-input v-model="info.personName" placeholder="请输入责任人" clearable></el-input>
						</el-form-item>
						<el-form-item label="所属自然村" prop="villageId">
							<el-select v-model="info.villageId" placeholder="请选择所属自然村" clearable class="setlength">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="建设规模" prop="projectScale">
							<el-input v-model="info.projectScale" placeholder="请输入建设规模" clearable
								class="input-with-select">
								<el-select v-model="info.projectScaleUnit" slot="append" placeholder="请选择单位" clearable
									class="input-with-select1">
									<el-option label="餐厅名" value="1"></el-option>
									<el-option label="订单号" value="2"></el-option>
									<el-option label="用户电话" value="3"></el-option>
								</el-select>
							</el-input>
						</el-form-item>
						<el-form-item label="总投资(万)" prop="projectTotalAmount">
							<el-input v-model="info.projectTotalAmount" placeholder="总投资金额" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="周期" prop="projectDurations">
							<el-input v-model="info.projectDurations" placeholder="请输入周期" clearable></el-input>
						</el-form-item>
						<el-form-item label="群众自筹(万)" prop="projectMassesAmount">
							<el-input v-model="info.projectMassesAmount" placeholder="请输入群众自筹金额" clearable></el-input>
						</el-form-item>
						<el-form-item label="进度" prop="projectProcess">
							<el-slider v-model="info.projectProcess" show-input>
							</el-slider>
						</el-form-item>
						<el-form-item label="上级资金扶持(万)" prop="projectSupportAmount">
							<el-input v-model="info.projectSupportAmount" placeholder="请输入上级扶持自筹金额" clearable>
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-checkbox-group v-model="info.projectPlan">
								<el-checkbox label="十四五规划项目" name="type" :value="info.projectPlan"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>
						<el-form-item>
							<el-button @click="goback">返回</el-button>
							<el-button type="primary" @click="onSubmit">保存</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
		</el-row>
	</div>
	</div>
</template>

<script>
	
	import {getItemInfo,getItemInfoById,saveItemInfo} from"../api/index.js"
	export default {
		data() {
			return {
				title:'新增信息',
				total:'',
				select:'',
				value:'',
				info: {
					projectId: '', //乡村振兴人才id 
					orgId: '', //所属组织id
					townId: '', //所属乡镇id
					townCode: '', //乡镇code
					villageId: '', //所属自然村id
					projectName: '', //项目名称
					projectType: '', //项目类型
					projectPlan: '', //是否属于十四五规划项目 0 是 1 否
					projectScale: '', //项目规模
					projectScaleUnit: '', //项目规模单位
					projectTotalAmount: '', //项目总投资金额
					projectSupportAmount: '', //项目政府投资金额
					projectMassesAmount: '', //项目群众自筹金额
					administrativeId: '', //所属行政村id
					administrativeCode: '', //所属行政村code
					projectProcess: "", //项目进度
					projectDurations: '', //项目建设周期
					personId: '', //操作人id
					personName: '', //操作人名称
				},
				rules: {
					projectName: [{
							required: true,
							message: '请输入项目名称',
							trigger: 'blur'
						},
						{
							min: 3,
							message: '长度大于3个字符',
							trigger: 'blur'
						}
					],
					projectType: [{
						required: true,
						message: '请选择项目类型',
						trigger: 'blur'
					}],
					personName: [{
							required: true,
							message: '请输入责任人',
							trigger: 'blur'
						},
					],
					projectScale: [{
							required: true,
							message: '请输入项目规模',
							trigger: 'blur'
						},
						{
							type: 'number',
							min:0,
							message: '必须是大于0的数字',
							trigger: 'change'
						}
					],
					projectTotalAmount: [{
						required: true,
						message: '请输入乡镇名称',
						trigger: 'blur'
					}],
					projectDurations: [{
							required: true,
							message: '请输入周期',
							trigger: 'blur'
						},
						{
							type: 'number',
							min:0,
							message: '必须是大于0的数字',
							trigger: 'change'
						}
					],
					projectMassesAmount: [{
						required: true,
						message: '请输入群众自筹金额',
						trigger: 'blur'
					},
					{
						type: 'number',
						min:0,
						message: '必须是大于0的数字',
						trigger: 'change'
					}
					],
					projectProcess: [{
							required: true,
							message: '请选择项目进度',
							trigger: 'blur'
						},
						{
							min: 3,
							message: '长度大于3个字符',
							trigger: 'blur'
						}
					],
					projectSupportAmount: [{
						required: true,
						message: '请输入上级扶持金额',
						trigger: 'blur'
					},
					{
						type: 'number',
						min:0,
						message: '必须是大于0的数字',
						trigger: 'change'
					}
					],
				}
			}
		},
		watch: {
           'info.projectSupportAmount':function(){
			   console.log("shujubianhua")
			  return  this.info.projectTotalAmount=parseInt(this.info.projectSupportAmount) + parseInt(this.info.projectMassesAmount)
		   },
		   'info.projectMassesAmount':function(){
		   	  return this.info.projectTotalAmount=parseInt(this.info.projectSupportAmount) + parseInt(this.info.projectMassesAmount)
		   }
		},
		methods: {
			goback() {
				this.$router.push({
					path: 'itemList',
					query: {
						name: 'admin',
						code: 10021
					}
				})
			},
			getItemInfoById(id){
				getItemInfoById(id).then(res=>{
					console.log(res)
				})
			},
			saveGoodsInfo(){
				saveItemInfo(this.info).then(res=>{
					console.log(res)
				})
			},
			onSubmit(){
				this.$refs.info.validate((valid) => {
				        if (valid) {
				          this.saveGoodsInfo()
				        } else {
				          this.$message('请填写完整相关信息')//就像用户提示发生错误的消息
				        }
				    })
			}
		},
		mounted() {
			this.getItemInfoById()
		}
	}
</script>

<style lang="scss" scoped>
	.itemManage {
		.input-with-select1 {

			width: 120px;
		}
		.setlength{
			width: 100%;
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
			padding-left: 120px;

		}
		.row-bg {
			padding: 10px 0;
			background-color: #f9fafc;
		}
		.content3 {
			margin-left: 115px;
		}
	}
</style>
