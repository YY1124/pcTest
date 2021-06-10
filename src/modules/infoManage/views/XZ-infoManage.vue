<template>
	<div class="XZ-infoManage">
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
				<el-col :span="2">
					<div class="grid-content bg-purple">
						<div class="grid-content2">乡镇名称</div>
					</div>
				</el-col>
				<el-col :span="12">
					<el-form class="grid-content bg-purple-light" :model="ruleForm" :rules="rules" ref="ruleForm">
						<el-form-item prop="townsName">
							<el-input placeholder="请输入乡镇名称"
							 v-model="ruleForm.townsName"
							:options="options"  
							class="set_length"
							clearable
							>
								</el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="2">
					<div class="grid-content bg-purple">
						<div class="grid-content2">挂职领导</div>
					</div>
				</el-col>
				<el-col :span="12">
					<el-form class="grid-content bg-purple-light" :model="ruleForm" :rules="rules" ref="ruleForm">
						<el-form-item prop="townLeadName">
							<el-input v-model="ruleForm.townLeadName" placeholder="请选择挂职领导" clearable @focus="change"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="2">
					<div class="grid-content bg-purple">
						<div class="grid-content2">管理员</div>
					</div>
				</el-col>
				<el-col :span="12">
					<el-form class="grid-content bg-purple-light" :model="ruleForm" :rules="rules" ref="ruleForm">
						<el-form-item prop="townAdministerName">
							<el-input v-model="ruleForm.townAdministerName" placeholder="请选择管理员" clearable @focus="changeAdmin"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-button class="content3" @click="goback()">
					返回
				</el-button>
				<el-button type="primary" @click="submit()">
					保存
				</el-button>
			</el-row>
		</div>
		<div class="right" v-show="right">
			<div class="right-title">
				<span class="right-title-content">{{titlePerson}}</span>
				<i class="el-icon-close icon" @click="close"></i>
			</div>
			<el-tree 
			:data="setTree" 
			show-checkbox  
			node-key="id" 
			ref="setData"
			lazy
			:load="treeload"
			:expand-on-click-node="false"
			highlight-current 
			style="margin-left: 20px;"
		    :props="defaultProps"
			@check-change="orgCheckChange"
			@check="currentChecked"
				>
			</el-tree>
		</div>
	</div>
</template>

<script>
	import storage from '../../../common/store/storage'
	import {
		request
	} from "../../../common/request"
	import {
		saveXZInfo,
		getXZInfoById
	} from '../api/index.js'
	export default {
		data() {
			return {
				title: '添加信息',
				options:[],
				right:false,
				code:102,
				setTree:[],
				setData:[],
				id: '',
				data:[],
				flag:1,
				input:'',
				titlePerson:"选择挂职领导",
				tableData:[],
				defaultProps: {
					 label: 'name',
				     children: 'zones',
					 isLeaf: 'leaf',
				},
				ruleForm: {
					townsId: '', //乡镇id
					townsName: '', //乡镇名称
					townsCode: '', //乡镇code
					townLeadId: '', //乡镇挂职领导id
					townLeadName: '', //乡镇挂职领导姓名
					townLeadOrgId: '', //乡镇挂职领导所属组织id
					townLeadOrgCode: '', //乡镇挂职领导所属组织code
					townLeadOrgName: '', //乡镇挂职领导所属组织名称
					townAdministerId: '', //乡镇管理员id
					townAdministerName: '', //乡镇管理员姓名
					townAdministerOrgId: '', //乡镇管理员所属组织id
					townAdministerOrgCode: '', //乡镇管理员所属组织code
					townAdministerOrgName: '', //乡镇管理员所属组织名称
				},
				rules: {
					townLeadName: [{
							required: true,
							message: '请选择挂职领导',
							trigger: 'blur'
						},
						{
							min: 2,
							max:5,
							message: '长度大于3个字符',
							trigger: 'blur'
						}
					],
					townsName: [{
						required: true,
						message: '请输入乡镇名称',
						trigger: 'blur'
					},
					{
						min: 2,
						max:10,
						message: '长度大于3个字符',
						trigger: 'blur'
					}
					],
					townAdministerName: [{
						required: true,
						message: '请选择管理员',
						trigger: 'blur'
					},
					{
						min: 2,
						max:10,
						message: '长度大于3个字符',
						trigger: 'blur'
					}
					],
				}
			}
		},
		methods: {
			getMessege(){
				request({
					method:"POST",
					url:'https://apitestpsns.ccphl.com/external/psns/v1/foreign/get/organiz/partymember/list?format=json',
					body:{
						Token:storage.token_,
						GloabId:storage.userInfo.pGloabId,
						RegionId:storage.userInfo.RegionId,
						Code:storage.userInfo.orgCode,
					}
				}).then(res=>{
					this.data=res.EntityListT
					console.log(res)
					this.getListData()
					console.log(this.options)
				})
			},
			//限制单选
			orgCheckChange(data, checked, indeterminate){
				if(checked==true){
					this.checkedId=data.id
					this.$refs.setData.setCheckedKeys([data.id])
				}else{
					if(this.checkedId==data.id){
					this.$refs.setData.setCheckedKeys([data.id])
					}
				}
			},
			currentChecked(nodeObj,SelectedObj){
				console.log(nodeObj)
				console.log(SelectedObj)
				 if(this.flag==1){
					this.ruleForm.townLeadName=SelectedObj.checkedNodes[0].name
					this.ruleForm.townLeadId=nodeObj.id
					this.ruleForm.townLeadOrgCode=nodeObj.code
					this.ruleForm.townLeadOrgName=nodeObj.parentname
					this.ruleForm.townLeadOrgId=nodeObj.gloabid 
				 }else if(this.flag==2){
					this.ruleForm.townAdministerName=SelectedObj.checkedNodes[0].name
					this.ruleForm.townAdministerId=nodeObj.id
					this.ruleForm.townAdministerOrgCode=nodeObj.code
					this.ruleForm.townAdministerOrgName=nodeObj.parentname
					this.ruleForm.townAdministerOrgId=nodeObj.gloabid 
				 }
			},
			close(){
				this.right=false
			},
			getListData() {
				let dataArray = [];
				this.data.forEach(function(data) {
					if (data.isParent == true) {
						let parentId = data.pId;
						if (data.isbranch == false) {
							let objTemp = {
								code: data.code,
								gloabid: data.gloabid,
								id: data.id,
								isParent: data.isParent,
								isbranch: data.isbranch,
								name: data.name,
								value: data.shortname,
								nocheck: data.nocheck,
								open: data.open,
								pId: data.pId,
								regionid: data.regionid,
								syscode: data.syscode,
								label: data.shortname,
								parentId: data.pId,
							}
							dataArray.push(objTemp);
						}
					}
				})
				this.data2treeDG(this.data, dataArray)
			},
			data2treeDG(datas, dataArray) {
				for (let j = 0; j < dataArray.length; j++) {
					let dataArrayIndex = dataArray[j];
					let childrenArray = [];
					let Id = dataArrayIndex.id;
					for (let i = 0; i < datas.length; i++) {
						let data = datas[i];
						if (data.isParent == true) {
							let parentId = data.pId;
							if (parentId == Id) { //判断是否为儿子节点
								let objTemp = {
									code: data.code,
									gloabid: data.gloabid,
									id: data.id,
									isParent: data.isParent,
									isbranch: data.isbranch,
									name: data.name,
									value: data.shortname,
									nocheck: data.nocheck,
									open: data.open,
									pId: data.pId,
									regionid: data.regionid,
									syscode: data.syscode,
									label: data.shortname,
									parentId: data.pId,
								}
								childrenArray.push(objTemp);
							}
						}
					}
					dataArrayIndex.children = childrenArray;
					if (childrenArray.length < 1) { //有儿子节点则递归
						dataArrayIndex.children = undefined
					} else {
						this.data2treeDG(this.data, childrenArray)
					}
				}
				this.setTree= dataArray;
				return dataArray;
			},
			key(input){
				this.tableData = this.tableData.filter(Val => {
				         if(Val.name.includes(this.input)){
				            this.table.push(Val);
				           return  this.table;
				      }
			             })
			},
			change(){
			  this.flag=1
			  this.titlePerson="选择挂职领导"
			  this.right=true	
			},
			changeAdmin(){
			 this.flag=2
			 this.titlePerson="选择管理员"
			 this.right=true
			},
			getCheck(){
				this.ruleForm.townLeadId=this.$refs['myCascader'].getCheckedNodes()[0].data.id
				this.ruleForm.townLeadName=this.$refs['myCascader'].getCheckedNodes()[0].data.label
				this.ruleForm.townLeadOrgcode=this.$refs['myCascader'].getCheckedNodes()[0].data.code
				this.ruleForm.townLeadOrgName=this.$refs['myCascader'].getCheckedNodes()[0].data.name
				this.ruleForm.townLeadOrgId=this.$refs['myCascader'].getCheckedNodes()[0].data.gloabid
			},
			save() {
				saveXZInfo(this.ruleForm).then(res => {
					console.log(res)
				})
			},
			getInfoById(id) {
				getXZInfoById(id).then(res => {
					console.log(res)
				})
			},
			treeload(node,resolve){
			  console.log(node.data)
			  if(node.data.isParent==true){
				 request({
				 	method:"POST",
				 	url:'https://apitestpsns.ccphl.com/external/psns/v1/foreign/get/organiz/partymember/list?format=json',
				 	body:{
				 		Token:storage.token_,
				 		GloabId:node.data.gloabid.replace("o",""),
				 		RegionId:node.data.regionid,
				 		Code:node.data.code,
				 	}
				 }).then(res=>{
					 return resolve(res.EntityListT)
				 }) 
			  }else{
				  this.$message("无内容")
			  }
			 
				
			},
			submit() {
				//this.getCheck()
				//let kk=this.$refs['myCascader'].getCheckedNodes()
		        //console.log(kk)
				console.log(this.ruleForm)
				this.$refs.ruleForm.validate((valid) => {
				        if (valid) {
				          this.save()
				        } else {
				          this.$message('请填写完整相关信息')//就像用户提示发生错误的消息
				        }
				    })
			},
			goback() {
				this.$router.push({
					path: "XZ-info",
					query: {
					}
				})
			},
			getTitle(){
				if(this.$route.query.code){
					this.code=this.$route.query.code
				}
				if(this.code==101){
					this.title='编辑信息'
				}else{
					this.title="添加信息"
				}
			}
		},
		mounted() {
			this.getMessege()
			this.getTitle()
			if (this.id !== '') {
				this.getInfoById()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.XZ-infoManage {
		.right{
				   height:100%;
				   width:400px;
				   position: fixed;
				   right:0;
				   top:40px;
				   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
				   
				   .right-title{
				   		  height:80px;
				   		  width:100%;
				   		  line-height: 80px;
						  
						  .right-title-content{
							  margin:0 60% 0 20px;
						  }
						  
						  .icon{
							cursor: pointer;
						  }
				   }
		}
		
		.can1 {
			margin-left: 10px;
		}

		.center {
			padding-left: 25%;
			margin-top: 30px;
		}

		.el-row {
			margin-bottom: 20px;

			&:last-child {
				margin-bottom: 0;
			}
		}

		.divided {
			width: 104%;
			margin-top: 12px;
			margin-left: -30px;
		}

		.el-col {
			border-radius: 4px;
		}

		.bg-purple-dark {}

		.grid-content1 {
			height: 50px;
			line-height: 50px;
			padding-left: 30px;
			padding-top: 10px;
			font: 20px Arial;
		}

		.grid-content {
			width: 100%;
			border-radius: 4px;
			min-height: 45px;
			line-height: 45px;

			font: 16px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
		}

		.content3 {
			margin-left: 120px;
		}

		.table-box {
			border: 1px solid #eeeeee;
			padding: 20px;
		}

		.set_length {
			width: 100%;

		}

	}
</style>
<style>
	.customer-no-border-table th {
		border: none;
	}

	.customer-no-border-table td,
	.customer-no-border-table th.is-leaf {
		border: none;
	}

	/*表格最外边框*/
	.customer-no-border-table .el-table--border,
	.el-table--group {
		border: none;
	}

	/*头部边框*/
	.customer-no-border-table thead tr th.is-leaf {
		border: 0px solid #EBEEF5;
		border-right: none;
	}

	.customer-no-border-table thead tr th:nth-last-of-type(2) {
		border-right: 0px solid #EBEEF5;
	}

	/*表格最外层边框-底部边框*/
	.customer-no-border-table .el-table--border::after,
	.customer-no-border-table .el-table--group::after {
		width: 0;
	}

	.customer-no-border-table::before {
		width: 0;
	}

	.customer-no-border-table .el-table__fixed-right::before,
	.el-table__fixed::before {
		width: 0;
	}

	.customer-no-border-table .el-table__header tr th {
		background: #fff;
		color: #333333;
		padding: 3px;
		fontWeight: 550;
		height: 36px;
		border: 0px;
		font-size: 15px;
	}
</style>
