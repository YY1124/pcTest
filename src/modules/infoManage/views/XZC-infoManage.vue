<template>
	<div class="infoManage">
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
					<div class="grid-content2">行政村名称</div>
				</div>
			</el-col>
			<el-col :span="10">
				<el-form class="grid-content bg-purple-light" :model="ruleForm" :rules="rules" ref="ruleForm">
					<el-form-item prop="administrativeName">
						<el-input v-model="ruleForm.administrativeName" placeholder="请输入行政村名称" clearable></el-input>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="2">
				<div class="grid-content bg-purple">
					<div class="grid-content2">人口数量</div>
				</div>
			</el-col>
			<el-col :span="10">
				<el-form class="grid-content bg-purple-light" :model="ruleForm" :rules="rules" ref="ruleForm">
					<el-form-item prop="totalPerson">
						<el-input v-model="ruleForm.totalPerson" placeholder="请输入人口数量" clearable></el-input>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="2">
				<div class="grid-content bg-purple">
					<div class="grid-content2">所在位置</div>
				</div>
			</el-col>
			<el-col :span="10">
				<el-form class="grid-content bg-purple-light" :model="ruleForm" :rules="rules" ref="ruleForm">
					<el-form-item prop="address">
						<el-input v-model="ruleForm.address" placeholder="请输入位置" @focus="selectMap" clearable>
						</el-input>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="2">
				<div class="grid-content bg-purple">
					<div class="grid-content2">所属乡镇</div>
				</div>
			</el-col>
			<el-col :span="10">
				<el-form class="grid-content bg-purple-light" :model="ruleForm" :rules="rules" ref="ruleForm">
					<el-form-item prop="townName">
				      <el-select v-model="ruleForm.townId" placeholder="请选择乡镇" class="setLength">
				      <el-option v-for="(item,index) in setData" 
					  :key="index" 
					  :label="item.townsName"
					  :value="item.townsId"
					  >
					   </el-option>
				    </el-select>
			</el-form-item>
			</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="2">
				<div class="grid-content bg-purple">
					<div class="grid-content2">行政村支书</div>
				</div>
			</el-col>
			<el-col :span="4">
				<el-form class="grid-content bg-purple-light" :model="ruleForm" :rules="rules" ref="ruleForm">
					<el-form-item prop="administrativeSecretaryName">
					<el-input v-model="ruleForm.administrativeSecretaryName" placeholder="请选择行政村支书" clearable @focus="change1"></el-input>
					</el-form-item>
				</el-form>
			</el-col>
				<el-col :span="2">
					<div class="grid-content bg-purple setdistance">
						<div class="grid-content2">第一书记</div>
					</div>
				</el-col>
				<el-col :span="4">
					<el-form class="grid-content bg-purple-light can1" :model="ruleForm" :rules="rules" ref="ruleForm">
						<el-form-item  prop="firstSecretaryName">
							 <el-input v-model="ruleForm.firstSecretaryName" placeholder="请选择第一书记" clearable @focus="change"></el-input>
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
			<el-col :span="10">
				<el-form class="grid-content bg-purple-light" :model="ruleForm" :rules="rules" ref="ruleForm">
					<el-form-item prop="administrativeAdministerName">
						<el-input v-model="ruleForm.administrativeAdministerName" placeholder="请选择管理员" clearable @focus="change2"></el-input>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="2">
				<div class="grid-content bg-purple">
					<div class="grid-content2">简介</div>
				</div>
			</el-col>
			<el-col :span="10">
				<el-form class="grid-content bg-purple-light" :model="ruleForm" :rules="rules" ref="ruleForm">
					<el-form-item prop="administrativeDescription">
						<el-input v-model="ruleForm.administrativeDescription" :rows="6" type="textarea" placeholder="请输入简介" clearable>
						</el-input>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-button @click="goback()" class="content3">返回</el-button>
			<el-button type="primary" @click="submit()">保存</el-button>
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
	
	import {request} from"../../../common/request"
	import storage from '../../../common/store/storage'
	import { saveXZCInfo,getXZCInfoById,getAllXZInfo} from '../api/index.js'
	export default {
		data() {
			return {
				right:false,
				right1:false,
				code:'102',
				flag:1,
				title:'添加信息',
				option: false,
				drawer: false,
				visible: false,
				result: '',
				search: '',
				data:[],
				form:'',
				titlePerson:"请选择挂职领导",
				setData:[],
				value: '',
				setTree:[],
				data1: [],
				id:'',
				multipleSelection: [],
				defaultProps: {
					 label: 'name',
				     children: 'zones',
					 isLeaf: 'leaf',
				},
				ruleForm:{
					administrativeId:'',//行政村id
					administrativeName:'',//行政村名称
					totalPerson:'',//行政村人口数
					address:'',//行政村地理位置
					townId:'',//所属乡镇id
					townName:"",//所属乡镇名称
					administrativeSecretaryName:'',//行政村书记姓名
					firstSecretaryId:'',//行政村第一支书id
					firstSecretaryName:'',//行政村第一支书姓名
					firstSecretaryOrgId:'',//行政村第一支书所属组织id
					firstSecretaryOrgCode:'',//行政村第一支书所属组织code
					firstSecretaryOrgName:'',//行政村第一支书所属组织名称
					administrativeAdministerId:'',//行政村管理人员id
					administrativeAdministerOrgId:'',//行政村管理人员所属组织id
					administrativeAdministerOrgCode:'',//行政村管理人员所属组织code
					administrativeAdministerOrgName:'',//行政村管理人员所属组织名称
					administrativeAdministerName:'',// 行政村管理人员姓名
					administrativeSecretaryOrgId:'',//行政村书记所属组织id
					administrativeSecretaryOrgCode:'',//行政村书记所属组织code
					administrativeSecretaryOrgName:'',//行政村书记所属组织名称
					administrativeSecretaryId:'',//行政村书记id
					administrativeDescription:'',//行政村信息简介
				},
				selectOrg: {
				        orgsid: []
				      },
				rules: {
					administrativeName: [{ required: true, message: '请输入行政村名称', trigger: 'blur' },
                                       { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
                               {
                                 required: true,
                                 pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
                                 message: '姓名不支持特殊字符',
                                 trigger: 'blur'
                           }
					],
					totalPerson: [{
						required: true,
						message: '请输入人口数量',
						trigger: 'blur'
					},
					{
						type: 'number',
						min:1,
						message: '必须是大于0的数字',
						trigger: 'change'
					}
					],
					address: [{
						required: true,
						message: '请输入位置',
						trigger: 'blur'
					}],
					firstSecretaryName: [{
						type: 'date',
						required: true,
						message: '请输入第一书记',
						trigger: 'blur'
					}],
					administrativeAdministerName: [{
						required: true,
						message: '请输入管理员',
						trigger: 'blur'
					}],
					administrativeSecretaryName: [{
						required: true,
						message: '请输入行政村支书',
						trigger: 'blur'
					}],
					administrativeDescription: [{
						required: true,
						message: '请填写简介',
						trigger: 'blur',
						
					},
					{
						min: 4,
						message: '长度大于4个字符',
						trigger: 'blur'
					}
					],
					townName: [{
						required: true,
						message: '请输入所属乡镇',
						trigger: 'blur'
					}]
				}
			};
			
		},
		methods: {
			selectMap() {
				this.$selectLocation(
				{
					title:"请选择地点"
				}).then(res=>{
					this.ruleForm.address=res.address
				})
			},
			getXZCInfoById(){
				getXZCInfoById(this.search).then(res=>{
					console.log(res)
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
				 this.ruleForm.firstSecretaryName=SelectedObj.checkedNodes[0].name
				 this.ruleForm.firstSecretaryId=nodeObj.id.replace("p","")
				 this.ruleForm.firstSecretaryOrgCode=nodeObj.code
				 this.ruleForm.firstSecretaryOrgName=nodeObj.parentname
				 this.ruleForm.firstSecretaryOrgId=nodeObj.gloabid.replace("p","")
				
			   }else if(this.flag==2){
				  this.ruleForm.administrativeSecretaryName=SelectedObj.checkedNodes[0].name
			      this.ruleForm.administrativeSecretaryOrgCode=nodeObj.code
			      this.ruleForm.administrativeSecretaryOrgId=nodeObj.gloabid.replace("p","")
			      this.ruleForm.administrativeSecretaryOrgName=nodeObj.parentname
			      this.ruleForm.administrativeSecretaryId=nodeObj.id.replace("p","")
			   }else if(this.flag==3){
				  this.ruleForm.administrativeAdministerName=SelectedObj.checkedNodes[0].name
				  this.ruleForm.administrativeAdministerOrgCode=nodeObj.code
				  this.ruleForm.administrativeAdministerOrgId=nodeObj.gloabid.replace("p","")
				  this.ruleForm.administrativeAdministerId=nodeObj.id.replace("p","")
				  this.ruleForm.administrativeAdministerOrgName=nodeObj.parentname
				   
			   }
			},
			//加载子节点	
			treeload(node,resolve){
			  console.log(node.data)
			  if(node.data.isParent==false) return resolve([]);
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
			//添加数据
			add(){
				console.log(this.ruleForm)
				   saveXZCInfo(this.ruleForm).then(res=>{
				       	console.log(res)
				  })
			},
			//保存数据
			submit() {
			  console.log(this.ruleForm)
			  this.$refs.ruleForm.validate((valid) => {
			          if (valid) {
			            this.add()
			          } else {
			            this.$message('请填写完整相关信息')//就像用户提示发生错误的消息
			          }
			      })
			},
			back(){
				this.option=false
				this.result=''
			},
			//返回上一页
			goback() {
				this.$router.push('XZC-info');
			},
			//处理确认
			toggleSelection() {
				this.option = false
				this.currentChecked1()
				this.result=''
			},
			handleCurrentChange(val) {
				this.currentRow = val;
			},
			change(){
				this.flag=1
				this.titlePerson="请选择第一书记"
				this.right=true
			},
			change1(){
				this.flag=2
				this.titlePerson="请选择行政村支书"
				this.right=true
			},
			change2(){
				this.flag=3
				this.titlePerson="请选择管理员"
				this.right=true
			},
			close(){
				this.right=false
			},
			getMessege1(){
				getAllXZInfo().then(res=>{
					this.setData=res.data
					this.ruleForm.townName=res.data.townsName
				})
			},
			//处理级联数据
			getDetail(){
				let dataArray=[];
				this.data.forEach(function(data){
					if(data.isParent==true){
						let parentId=data.pId
						let objTemp = {
							     id:data.id,
								 pId:data.pId,
								 name:data.name,
								 open:data.open,
								 isParent:data.isParent,
								 nocheck:data.nocheck,
								 regionType:data.regionType,
								 orderby:data.orderby,
			                     label: data.name,
			                 }
							 dataArray.push(objTemp)
					}
				})
				 this.setData=this.data2treeDG1(this.data, dataArray)
			},
			data2treeDG1(datas, dataArray) {
			         for (let j = 0; j < dataArray.length; j++) {
			              let dataArrayIndex = dataArray[j];
			              let children = [];
			              let Id = dataArrayIndex.id;
			              for (let i = 0; i < datas.length; i++) {
			                   let data = datas[i];
			                   if(data.isParent==false){
			                         let parentId = data.pId;
			                         if (parentId == Id) {//判断是否为儿子节点
			                         let objTemp = {
			                            id:data.id,
			                            pId:data.pId,
			                            name:data.name,
			                            open:data.open,
			                            isParent:data.isParent,
			                            nocheck:data.nocheck,
			                            regionType:data.regionType,
			                            orderby:data.orderby,
			                            label: data.name,
			                        }
			                      children.push(objTemp);
			                   }
			               }
			        }
			          dataArrayIndex.children = children;
					  if (children.length >0) { //有儿子节点则递归
					  	this.data2treeDG1(this.data, children)
					  }
			     }
			    //this.SetData = dataArray;
			    return dataArray;
			  },
			
			//处理级联数据
			 getListData() {
			        let dataArray = [];
			        this.data1.forEach(function(data){
			        if(data.isParent==true){
			             let parentId = data.pId;
			              if (data.isbranch==false) {
			                 let objTemp = {
								 code: data.code,
								 gloabid:data.gloabid,
								 id:data.id,
								 isParent:data.isParent, 
								 isbranch: data.isbranch,
								 name:data.name,
								 nocheck:data.nocheck, 
								 open:data.open,
								 pId: data.pId,
								 regionid: data.regionid,
								 syscode:data.syscode,
			                     label: data.shortname,
								 value:data.id,
			                     parentId: data.pId,
			                 }
			                 dataArray.push(objTemp);
			              }
			           }
			       })
				   //this.setTree=dataArray
			       this.data2treeDG(this.data, dataArray)
			    },
				 data2treeDG(data, dataArray) {
				          for (let j = 0; j < dataArray.length; j++) {
				               let dataArrayIndex = dataArray[j];
				               let childrenArray = [];
				               let Id = dataArrayIndex.id;
				               for (let i = 0; i < data.length; i++) {
				                    let data = data[i];
				                    if(data.isParent==true){
				                          let parentId = data.pId;
				                          if (parentId == Id) {//判断是否为儿子节点
				                          let objTemp = {
				                             code: data.code,
				                             gloabid:data.gloabid,
				                             id:data.id,
				                             isParent:data.isParent, 
				                             isbranch: data.isbranch,
				                             name:data.name,
				                             nocheck:data.nocheck, 
				                             open:data.open,
				                             pId: data.pId,
											 value:data.id,
				                             regionid: data.regionid,
				                             syscode:data.syscode,
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
						  	this.data2treeDG(data, childrenArray)
						  }
				      }
				     this.setTree = dataArray;
				     return dataArray;
				   },
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
					this.data1=res.EntityListT
					console.log(res)
					this.getListData()
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
			},
			init(){
				this.id=this.$route.query.id
				this.getTitle()
				console.log(storage.userInfo)
				this.getMessege1()
				this.getMessege()
			}
		},
		mounted() {
		  // this.ruleForm.administrativeId=storage.userInfo.userId
		   this.init()
		}
	}
</script>

<style lang="scss" scoped>
	.infoManage {
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
					  margin:0 50% 0 20px;
				  }
				  
				  .icon{
					cursor: pointer;
					margin-left: -100px;
				  }
		   }
	   }
	   .setLength{
		   width:100%;
	   }
	   .can1{
		  margin-left:10px; 
	   }
	   .center{
		  padding-left: 25%;
		  margin-top: 20px;
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

		.bg-purple-dark {
			
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

		.grid-content {
			width: 100%;
			border-radius: 4px;
			min-height: 45px;
			line-height: 45px;
			
			font: 16px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
		}

		.grid-content2 {
			border-radius: 4px;
			min-height: 45px;
			line-height: 45px;
			padding-left: 10px;
			font: 16px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
			font-weight: 400;
			float: right;
			margin-right: 10px;
			margin-top: 6px;
		}

		.content {
			min-height: 150px;
		}

		.content1 {
			margin-left: 160px;
			margin-right: 10px;
		}

		.content-box {
			position: absolute;
			bottom:-80px;
			left:-80px;
			margin: 15px 0 15px -15px;


		}

		.grid-content-box {
			margin: 20px 0 0 20px;
			font: 18px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
			color: #666666;
		}

		.grid-content-box:before {
			content: " ";
			width: 5px;
			position: relative;
			top: 3px;
			height: 18px;
			margin-right: 10px;
			background-color: #F56C6C;
			display: inline-block;
		}

		.bg-purple1 {
			width: 300px;
			height: 20px;
			margin: 0 0 0 20px;
		}

		.content3 {
			margin-left: 115px;
		}
		.confirm{
			margin-top: 15px;
			margin-left:0;
			width:90%;
			height:300px;
		}
	}
</style>
