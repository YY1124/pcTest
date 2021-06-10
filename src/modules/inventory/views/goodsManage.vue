<template>
	<div class="goodsManage">
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
			<el-col :span="16">
				<div class="grid-content1">
					<el-form ref="form" :model="form" label-width="130px" :rules="rules">
						<el-form-item label="自然村名称" prop="name" style="margin-bottom: 30px;">
							<el-input v-model="form.name" placeholder="请输入"></el-input>
						</el-form-item>
						<el-row>
							<el-col :span="12">
								<div class="up">
									<el-form-item label="保留集体用地(亩)" prop="goodsLand">
										<el-input v-model="form.goodsLand" placeholder="请输入"></el-input>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="up">
									<el-form-item label="保留集体地(亩)" prop="goodsWoods">
										<el-input v-model="form.goodsWoods" placeholder="请输入"></el-input>
									</el-form-item>
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<div class="up">
									<el-form-item label="保留集体荒山(亩)" prop="goodsWasteland">
										<el-input v-model="form.goodsWasteland" placeholder="请输入"></el-input>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="up">
									<el-form-item label="山地(亩)" prop="GoodsHighland">
										<el-input v-model="form.GoodsHighland" placeholder="请输入"></el-input>
									</el-form-item>
								</div>
							</el-col>
						</el-row>
						<el-row>
						<div class="up">
						<el-form-item label="平原/坝子(亩)" class="up" prop="goodsPlain">
							<el-input v-model="form.goodsPlain" placeholder="请输入"></el-input>
						</el-form-item>
						</div>
						</el-row>
						<el-row>
							<el-col :span="12">
								<div class="up">
									<el-form-item label="理事会数量" prop="goodsCouncil">
										<el-input v-model="form.goodsCouncil" placeholder="请输入"></el-input>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="up">
									<el-form-item label="同心联数量" prop="goodsConcentric">
										<el-input v-model="form.goodsConcentric" placeholder="请输入"></el-input>
									</el-form-item>
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<div class="up">
									<el-form-item label="产业协会数量" prop="goodsIndustry">
										<el-input v-model="form.goodsIndustry" placeholder="请输入"></el-input>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="up">
									<el-form-item label="种植大户数量" prop="goodsPlant">
										<el-input v-model="form.goodsPlant" placeholder="请输入"></el-input>
									</el-form-item>
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<div class="up">
									<el-form-item label="龙头企业数量" prop="goodsEnterprise">
										<el-input v-model="form.goodsEnterprise" placeholder="请输入"></el-input>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="up">
									<el-form-item label="合作社数量" prop="goodsCooperative">
										<el-input v-model="form.goodsCooperative" placeholder="请输入"></el-input>
									</el-form-item>
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<div class="up">
									<el-form-item label="家庭农场数量" prop="goodsFamily">
										<el-input v-model="form.goodsFamily" placeholder="请输入"></el-input>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="up">
									<el-form-item label="养殖大户数量" prop="goodsCultivation">
										<el-input v-model="form.goodsCultivation" placeholder="请输入"></el-input>
									</el-form-item>
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<div class="up">
									<el-form-item label="现有规模产业">
										<div class="con-top">
											<el-row>
											 <el-col :span="19">
												 <el-input v-model="input" placeholder="请输入内容"></el-input>
											 </el-col>
											  <el-col :span="4">
												  <el-button class="con-top-right" icon="el-icon-circle-plus-outline" type="primary" @click="update">新增信息</el-button>
											  </el-col>
											</el-row>
										</div>
										<div>
				<el-table :data="tableData" style="width: 100%;margin-top: 10px;"  class="customer-no-border-table">
												<el-table-column prop="scaleName" label="名称">
												</el-table-column>
												<el-table-column prop="scaleAmount" label="规模(亩/头/只)">
												</el-table-column>
												<el-table-column prop="scaleMoney" label="产值(元)">
												</el-table-column>
											</el-table>
										</div>
									</el-form-item>
								</div>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<div class="con">
								</div>
							</el-col>
						</el-row>
					</el-form>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-button @click="goback()" class="content3">返回</el-button>
				<el-button  type="primary" @click="submit()">保存</el-button>
		</el-row>
		<div class="top" v-show="show">
			<div class="top-content-box">
				<el-row>
					<el-col :span="24">
						<div class="top-content">
							<div class="top-content-title">添加信息</div>
						</div>
					</el-col>
				</el-row>
				<div>
					<el-form ref="form" :model="form" label-width="120px" :rules="rules" style="width:300px;margin-left:30px;" >
						<el-form-item label="名称" prop="scaleName">
							<el-input v-model="info.scaleName" placeholder="请输入名称"></el-input>
						</el-form-item>
						<el-form-item label="规模(亩/头/只)" prop="scaleAmount">
							<el-input v-model="info.scaleAmount" placeholder="请输入规模"></el-input>
						</el-form-item>
						<el-form-item label="产值(元)" prop="scaleMoney">
							<el-input v-model="info.scaleMoney" placeholder="请输入产值"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button @click="cancel">取消</el-button>
							<el-button type="primary" @click="submit">新增信息</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
		
		
	</div>
  </div>
</template>

<script>
	
	import {getGoodsInfo,getGoodsInfoById,saveGoodsInfo} from"../api/index.js"
	export default {
		data() {
			return {
				title:'添加信息',
				input:'',
				current:'',
				address:'',
				form: {
					goodsId: '', //乡村振兴人才id
					orgId: '', //所属组织id
					townsId: '', //所属乡镇id
					townsCode: '', //乡镇code
					administrativeId: '', // 所属行政村id
					administrativeCode: '', // 所属行政村code
					villageId: '', // 所属自然村id
					goodsLand: '', //保留集体用地
					goodsWoods: '', //保留集体林地
					goodsWasteland: '', //保留集体荒地
					GoodsHighland: '', //山地
					goodsPlain: '', // 平原
					goodsBarrage: '', //坝子
					goodsCouncil: '', //乡村振兴理事会数量
					goodsConcentric: '', //乡村振兴同心连数量
					goodsIndustry: '', //乡村振兴产业协会数量
					goodsPlant: '', //乡村振兴种植大户数量
					goodsCultivation: '', //乡村振兴养殖大户数量
					goodsFamily: '', //乡村振兴家庭农村数量
					goodsCooperative: '', //乡村振兴合作社数量
					goodsEnterprise: '', //乡村振兴龙头企业数量
					personId: '', //操作人id
					personName: '', //操作人名称
					createTime: '', //创建时间
					updateTime: '', //修改时间
				},
				info: {
					scaleId: '', //物资规模id
					goodsId: '', // 物资id
					scaleName: '', //物资规模名称
					scaleAmount: '', //物资规模数量
					scaleAmountUnit: '', //  物资规模数量单位
					scaleMoney: '', // 物资规模产值金额
					createTime: '', //创建时间
					updateTime: '', //修改时间
				},
				info1: {
					goodsTravelId: '', //战略物旅游资源id
					goodsId: '', // 物资id
					goodsTravelName: '', //物资旅游资源名称
					goodsTravelDescription: '', //物资旅游资源描述
					goodsTravelPhotos: '', //  物资旅游资源照片
					createTime: '', //创建时间
					updateTime: '', //修改时间
				},
				info2: {
					goodsWaterId: '', //物资水资源
					goodsId: '', // 物资id
					goodsWaterName: '', //水资源名称
					goodsWaterScale: '', //水资源点规模大小(单位：方)
					createTime: '', //创建时间
					updateTime: '', //修改时间
				},
				tableData: [],
				show: false,
				rules: {
					goodsLand: [{
							required: true,
							message: '请输入保留集体用地亩数',
							trigger: 'blur'
						},
						{
							type: 'number',
							min:0,
							message: '必须是大于0的数字',
							trigger: 'change'
						}
					],
					goodsWoods: [{
						required: true,
						message: '请输入集体用地亩数',
						trigger: 'blur'
					},
					{
						type: 'number',
						min:0,
						message: '必须是大于0的数字',
						trigger: 'change'
					}
					],
					goodsWasteland: [{
							required: true,
							message: '请输入保留集体荒地亩数',
							trigger: 'blur'
						},
						{
							type: 'number',
							min:0,
							message: '必须是大于0的数字',
							trigger: 'change'
						}
					],
					GoodsHighland: [{
						required: true,
						message: '请输入山地亩数',
						trigger: 'blur'
					},
					{
						type: 'number',
						min:0,
						message: '必须是大于0的数字',
						trigger: 'change'
					}
					],
					goodsPlain: [{
							required: true,
							message: '请输入平原/坝子亩数',
							trigger: 'blur'
						},
						{
							type: 'number',
							min:0,
							message: '必须是大于0的数字',
							trigger: 'change'
						}
					],
					goodsFamily: [{
						required: true,
						message: '请输入家庭农场数量',
						trigger: 'blur'
					},
					{
						type: 'number',
						min:0,
						message: '必须是大于0的数字',
						trigger: 'change'
					}
					],
					goodsCultivation: [{
							required: true,
							message: '请输入养殖大户数量',
							trigger: 'blur'
						},
						{
							type: 'number',
							min:0,
							message: '必须是大于0的数字',
							trigger: 'change'
						}
					],
					goodsCouncil: [{
						required: true,
						message: '请输入理事会数量',
						trigger: 'blur'
					},
					{
						type: 'number',
						min:0,
						message: '必须是大于0的数字',
						trigger: 'change'
					}
					],
					goodsConcentric: [{
							required: true,
							message: '请输入同心联数量',
							trigger: 'blur'
						},
						{
							type: 'number',
							min:0,
							message: '必须是大于0的数字',
							trigger: 'change'
						}
					],
					goodsIndustry: [{
						required: true,
						message: '请输入产业协会数量',
						trigger: 'blur'
					},
					{
						type: 'number',
						min:0,
						message: '必须是大于0的数字',
						trigger: 'change'
					}
					],
					goodsPlant: [{
							required: true,
							message: '请输入种植大户数量',
							trigger: 'blur'
						},
						{
							type: 'number',
							min:0,
							message: '必须是大于0的数字',
							trigger: 'change'
						}
					],
					goodsEnterprise: [{
						required: true,
						message: '请输入龙头企业数量',
						trigger: 'blur'
					},
					{
						type: 'number',
						min:0,
						message: '必须是大于0的数字',
						trigger: 'change'
					}
					],
					goodsCooperative: [{
							required: true,
							message: '请输入编号',
							trigger: 'blur'
						},
						{
							type: 'number',
							min:0,
							message: '必须是大于0的数字',
							trigger: 'change'
						}
					],
					scaleName: [{
							required: true,
							message: '请输入名称',
							trigger: 'blur'
						},
					],
					scaleAmount: [{
						required: true,
						message: '请输入规模',
						trigger: 'blur'
					},
					{
						type: 'number',
						min:0,
						message: '必须是大于0的数字',
						trigger: 'change'
					}
					],
					scaleMoney: [{
							required: true,
							message: '请输入产值',
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
		methods: {
			getGoodsInfoById(id){
				getGoodsInfoById(id).then(res=>{
					
				})
			},
			saveGoodsInfo(){
				saveGoodsInfo(this.form).then(res=>{
					console.log(res)
				})
			},
			save() {
				this.show = true
			},
			submit(){
				this.$refs.form.validate((valid) => {
				        if (valid) {
				          this.save()
				        } else {
				          this.$message('请填写完整相关信息')//就像用户提示发生错误的消息
				        }
				    })
			},
			cancel() {
				this.show = false
			},
			goback() {
				this.$router.push({
					path: 'goodsList',
					query: {
						code: 102
					}
				})
			}
		},
		mounted() {
			this.getGoodsInfoById()
		}
	}
</script>

<style lang="scss" scoped>
	.goodsManage {
		.el-row {
			margin-bottom: 20px;
			&:last-child {
				margin-bottom: 0;
			}
		}
		.grid-content1 {
			height: 50px;
			line-height: 50px;
			padding-left: 30px;
			padding-top: 10px;
			font: 20px Arial;
		}
		.center{
				  padding-left: 20%;
				  margin-top: 0px;
		}
		.divided{
						width:104%;
						margin-top: 12px;
						margin-left: -30px;
					}	
		.content3 {
			margin-left: 150px;
			margin-top: -50px;
		}
		.el-col {
			border-radius: 4px;
		}
		.bg-purple-dark {
			//background: #eeeeee;
		}
		.bg-purple {
			//background: #eeeeee;
		}
		.bg-purple-light {
			
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
		.up {
			margin-top: -15px;
		}
		.con-box {
			margin-left: 120px;
			.con {
				width: 100%;
				min-height: 100px;
				font-size: 14px;
				.con-top {
					height: 40px;
					line-height: 40px;
					.con-top-right {
						float: right;
						margin-right: 20px;
						margin-top: 5px;
					}
				}
			}
			.con1 {
				width: 100%;
				min-height: 100px;
				font-size: 14px;
				.con1-top {
					height: 40px;
					line-height: 40px;
					.con1-top-right {
						float: right;
						margin-right: 20px;
						margin-top: 5px;
					}
				}
				.table {
					max-height: 100px;
					font-size: 13px;
					background-color: #D08770;
				}

			}

			.con2 {
				width: 100%;
				min-height: 100px;
				font-size: 14px;

				.con2-top {
					height: 40px;
					line-height: 40px;

              
					.con2-top-right {
						float: right;
						margin-right: 20px;
						margin-top: 5px;
					}

				}
			}
		}
         .con-top-right{
			 margin-left: 20px;
		 }
		.top {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 20;
			background: rgba(0, 0, 0, .2);

			.top-content-box {
				height: 350px;
				width: 500px;
				background: rgba($color: #FFFFFF, $alpha: 1.0);
				margin: 8% auto;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

				.top-content {
					width: 100%;
					height: 60px;
					line-height: 60px;
					margin-top: 10px;
					padding-left: 50px;

					.top-content-title:before {
						content: " ";
						width: 6px;
						position: relative;
						top: 3px;
						height: 18px;
						margin-right: 5px;
						background-color: #F56C6C;
						display: inline-block;
					}
				}
			}
		}
	}
</style>
<style>
	.customer-no-border-table th{
	     border:none;
	   }
	.customer-no-border-table td,.customer-no-border-table th.is-leaf {
	  border:none;
	}
	 /*表格最外边框*/
	.customer-no-border-table .el-table--border, .el-table--group{
	     border: none;
	   }
	  /*头部边框*/
	   .customer-no-border-table thead tr th.is-leaf{
	     border: 0px solid #EBEEF5;
	     border-right: none;
	   }
	.customer-no-border-table thead tr th:nth-last-of-type(2){
	  border-right: 0px solid #EBEEF5;
	}
	 /*表格最外层边框-底部边框*/
	.customer-no-border-table .el-table--border::after,.customer-no-border-table .el-table--group::after{
	     width: 0;
	   }
	.customer-no-border-table::before{
	  width: 0;
	}
	.customer-no-border-table .el-table__fixed-right::before,.el-table__fixed::before{
	  width: 0;
	}
	.customer-no-border-table .el-table__header tr th{
	  background: #fff;
	  color: #333333 ;
	  padding: 3px ;
	  fontWeight: 550 ;
	  height: 36px ;
	  border: 0px;
	  font-size: 15px;
	}
	
</style>