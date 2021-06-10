<template>
	<div class="ZRC-infoManage">
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
			<el-col :span="3">
				<div class="grid-content bg-purple">
					<div class="grid-content2">自然村名称</div>
				</div>
			</el-col>
			<el-col :span="10">
				<el-form class="grid-content bg-purple-light" :model="info" :rules="rules" ref="info">
					<el-form-item prop="villageName">
						<el-input v-model="info.villageName" placeholder="请输入自然村名称" clearable></el-input>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="3">
				<div class="grid-content bg-purple">
					<div class="grid-content2">所在位置</div>
				</div>
			</el-col>
			<el-col :span="10">
				<el-form class="grid-content bg-purple-light" :model="info"  ref="info">
					<el-form-item prop="villageAddress">
						<el-input v-model="info.villageAddress" placeholder="请在地图上选择所在位置" @focus="selectMap" clearable></el-input>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="3">
				<div class="grid-content bg-purple">
					<div class="grid-content2">所属行政村/社区</div>
				</div>
			</el-col>
			<el-col :span="10">
				<el-form class="grid-content bg-purple-light" :model="info" :rules="rules" ref="info">
					<el-form-item prop="administrativeName">
						<el-cascader
						    v-model="info.administrativeName"
							placeholder="请选择所属行政区/社区" 
							class="setlength"
							:props="staProps"
							:options="data"
							>
						</el-cascader>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="3">
				<div class="grid-content bg-purple">
					<div class="grid-content2">上传村庄规划图</div>
				</div>
			</el-col>
			<el-col :span="10">
				<el-form class="grid-content bg-purple-light" :model="info" :rules="rules" ref="info">
					<el-form-item prop="personName">
						<el-col :span="18"><div class="update-box">
							<el-upload
							  :action="url"
							  :headers="headers"
							  list-type="picture-card"
							  :on-remove="handleRemove"
							  :on-success="handSuccess"
							  >
							  <i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible">
							  <img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
						</div></el-col>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="3">
				<div class="grid-content bg-purple">
					<div class="grid-content2">上传村域规划图</div>
				</div>
			</el-col>
			<el-col :span="10">
				<el-form class="grid-content bg-purple-light" :model="info" :rules="rules" ref="info">
					<el-form-item prop="personName">
						<el-col :span="18"><div class="update-box">
							<el-upload
							  :action="url"
							   :headers="headers"
							  list-type="picture-card"
							  :on-success="handSuccess1"
							  :on-remove="handleRemove">
							  <i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible">
							  <img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
						</div></el-col>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="3">
				<div class="grid-content bg-purple">
					<div class="grid-content2">附件</div>
				</div>
			</el-col>
			<el-col :span="10">
				<el-row>
				  <el-col :span="12"><div class="update-box">
					<el-upload
					  class="upload-demo"
					  :action="url"
					  :headers="headers"
					  :on-change="handleChange"
					  :limit="3"
					  :file-list="fileList"
					  :on-success="handSuccess2"
					  accept=".doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf"
					  >
					  <el-button size="small" type="primary">点击上传</el-button>
					  <div slot="tip" class="el-upload__tip">支持上传 .doc .docx .xls .xlsx .ppt .pptx .pdf文件</div>
				   </el-upload>
				</div></el-col>
				 <el-col :span="12">
					 <div class="update-box1">
						上传一表、民约、一书
					 </div>
					 </el-col>
				</el-row>
			</el-col>
		</el-row>
		<el-row>
			<el-button @click="goback()" class="content3">返回</el-button>
			<el-button type="primary" @click="submit()">保存</el-button>
		</el-row>
		</div>
	</div>
</template>

<script>

	import {saveZRCInfo,updateFile,getZRCInfoById,getZRCInfo,getXZCInfoByTownsId,getAllXZInfo} from '../api/index.js'
	import storage from '../../../common/store/storage'
	import config from '../../../common/config'
	export default{
		data() {
			return{
			code:'',
			id:'',
			data:[],
			url:'',
			dialogVisible:false,
			dialogImageUrl:[],
			title:'添加信息',
			fileList: [],
			planPhotosUrl:[],
			regionPhotosUrl:[],
			villageFileUrl:[],
			setData:[],
			info: {
				villageId:'',//自然村id
				orgId:'',// 所属组织id
				villageName: '',// 自然村名称
				villageAddress:'',//自然村位置
				administrativeId:'',//所属行政村id
				administrativeName:'',// 所属行政村名称
				planPhotosUrl:[],//村庄规划图
				regionPhotosUrl:[],//村庄域规划图
				villageFileUrl:[],//村庄一表or村庄民约or村庄一书
			},
			rules: {
					villageName: [{
							required: true,
							message: '请输入自然村名称',
							trigger: 'blur'
						},
						{
							min: 3,
							message: '长度大于3个字符',
							trigger: 'blur'
						}
					],
					administrativeName: [{
						required: true,
						message: '请输入行政村/社区',
						trigger: 'blur'
					}
					],
				    villageAddress: [{
						required: true,
						message: '请输入位置',
						trigger: 'blur'
					}],
				},
				 staProps: {
				              label: "townsName",
				              value: "townsId",
				              multiple:false,
				              expandTrigger: "click",
				              lazy: true,
				              checkStrictly: true,
				              lazyLoad: this.lazyLoad
				             },
			}
		},
		computed: {
			headers() {
				return{
					"Authorization":storage.token_ // 直接从本地获取token就行
				}
			}
		},
		methods:{
			getXZInfo(){
				getAllXZInfo().then(res=>{
					console.log(res.data)
					this.data=res.data
				})
			},
			lazyLoad(node,resolve){
				const { level } = node;
				setTimeout(() => { 
				getXZCInfoByTownsId({townId:node.value}).then(res=>{
					if(res.data==null){
						resolve([])
					}else{
					const nodes =res.data.map(item => (
					{
						//label: item.administrativeName,
					value: item.administrativeId, 
					
					leaf: level >= 2
					})
					); // 通过调用resolve将子节点数据返回，通知组件数据加载完成
					resolve(nodes);
						
					}
					}, 1000); 
				})
			},
			getXZCInfoByTownsId1(id){
			   
			},
			SelectGet(res){
				this.info.administrativeId=res
			},
			handSuccess(res, file, fileList) {
			 //console.log(res.Data[0].Url)
			 let url=res.Data[0].Url.replace("http://192.168.100.238:8888","")
			 this.planPhotosUrl.push(url)
			 this.info.planPhotosUrl =`[${this.regionPhotosUrl}]`
			 //console.log(this.info.planPhotosUrl)
			},
			handSuccess1(res, file, fileList) {
			 //console.log(res.Data[0].Url)
			 let url=res.Data[0].Url.replace("http://192.168.100.238:8888","")
			 this.regionPhotosUrl.push(url)
			 this.info.regionPhotosUrl = `[${this.regionPhotosUrl}]`
			 //console.log(this.info.regionPhotosUrl)
			},
			handSuccess2(res, file, fileList) {
			 //console.log(res.Data[0].Url)
			 let url=res.Data[0].Url.replace("http://192.168.100.238:8888","")
			 this.villageFileUrl.push(url) 
			 this.info.villageFileUrl=`[${this.villageFileUrl}]`
			},
			handleChange(){
				
			},
			beforeAvatarUpload(){
				console.log(this.uploadUrl)
				},
			selectMap() {
				this.$selectLocation(
				{
					title:"请选择地点"
				}).then(res=>{
					this.info.villageAddress=res.address
				})
			},
			getZRCInfoById(){
				getZRCInfoById(
				{
					villageId:this.$route.query.id
				}
				
				).then(res=>{
					console.log(res.data)
				this.info=res.data
				})
			},
			updateCity(){
				
			},
			goback(){
				this.$router.push('ZRC-info');
			},
			handlePreview(){
				
			},
			handleRemove(){
				
			},
			beforeRemove(){
				
			},
			getXZCInfoByTownsId(){
				getXZCInfoByTownsId({townId:"1169394094686404608"}).then(res=>{
					console.log(res.data)
					this.setData=res.data
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
			handleExceed(){
				
			},
			submit(){
				console.log(this.info)
			     this.$refs.info.validate((valid) => {
			             if (valid) {
			               this.save()
			             } else {
			               this.$message('请填写完整相关信息')//就像用户提示发生错误的消息
			             }
			         })
			},
			save(){
				saveZRCInfo(this.info).then(res=>{
					console.log(res)
				})
			},
			getXZCList(){
			   
			},
			init(){
			console.log(this.$config.uploadUrl)
			this.url=this.$config.uploadUrl
			this.headers=storage.token_
			this.id=this.$route.query.name
			this.getTitle()	
			}
		},
		mounted() {
			this.getXZInfo()
			this.init()
			this.getXZCInfoByTownsId()
			this.getZRCInfoById()
		}
		
	}
</script>

<style lang="scss" scoped>
.ZRC-infoManage{
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
	.grid-content1 {
		height: 50px;
		line-height: 50px;
		padding-left: 30px;
		padding-top: 10px;
		font: 20px Arial;
	}
	.center{
			  padding-left: 20%;
			  margin-top: 10px;
	}
		
	.setlength{
		width:100%;
	}
	.divided{
		width:104%;
		margin-top: 12px;
		margin-left: -30px;
	}	
	.update-box1{
		position: relative;
		top:5px;
		left:-230px;
		font-size: 14px;
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
	.content3 {
		margin-left: 190px;
	    margin-top:20px;
	}
	.update-box{
		margin-left: 0px;
	}
}
</style>
