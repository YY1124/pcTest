<template>
	<div class="talentManage">
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
		  <el-form ref="form" :model="form" label-width="120px" :rules="rules">
		  <el-form-item label="姓名" prop="talentName">
			  <el-col :span="8">
		    <el-input v-model="form.talentName" placeholder="请输入姓名" clearable></el-input>
			  </el-col>
			  <el-col :span="16">
				 <el-form-item label="性别">
				     <el-select v-model="form.talentGender" placeholder="请选择性别" clearable class="setlengh">
				       <el-option label="男 " value="0"></el-option>
				       <el-option label="女" value="1"></el-option>
				     </el-select>
				   </el-form-item> 
			  </el-col>
		  </el-form-item>
			  <el-form-item label="政治面貌">
				  <el-col :span="8">
			      <el-select v-model="form.talentPolitics" placeholder="请选择政治面貌" clearable>
			        <el-option label="中共党员 " value="0"></el-option>
			        <el-option label="中共预备党员" value="1"></el-option>
					<el-option label="共青团员" value="2"></el-option>
					<el-option label="民革党员" value="3"></el-option>
					<el-option label="民盟盟员 " value="4"></el-option>
					<el-option label="民建会员" value="5"></el-option>
					<el-option label="民进会员" value="6"></el-option>
					<el-option label="农工党党员" value="7"></el-option>
					<el-option label="致公党党员" value="8"></el-option>
					<el-option label="九三学社社员" value="9"></el-option>
					<el-option label="台盟盟员" value="10"></el-option>
					<el-option label="无党派人士" value="11"></el-option>
					<el-option label="群众" value="12"></el-option>
			      </el-select>
				   </el-col>
				  <el-col :span="16">
					  <el-form-item label="单位名称" prop="talentCompanyName">
					    <el-input v-model="form.talentCompanyName" clearable placeholder="请输入单位名称"></el-input>
					  </el-form-item>
				  </el-col>
			    </el-form-item>
			<el-form-item label="毕业学校及专业" prop="talentEducation">
			  <el-input v-model="form.talentEducation" clearable placeholder="请输入毕业学校及专业"></el-input>
			</el-form-item>
			<el-form-item label="单位地址" prop="talentCompanyAddress">
			  <el-input v-model="form.talentCompanyAddress" clearable placeholder="请输入单位地址"></el-input>
			</el-form-item>
			<el-form-item label="现居住地" prop="talentAddress">
			  <el-input v-model="form.talentAddress" clearable placeholder="请输入现居地址"></el-input>
			</el-form-item>
			<el-form-item label="单位职务" prop="talentJob">
			  <el-input v-model="form.talentJob" clearable placeholder="请输入单位职务"></el-input>
			</el-form-item>
			<el-form-item label="人才类型">
				<el-col :span="8">
				<el-select v-model="form.talentOccupation" placeholder="请选择人才类型" clearable>
				  <el-option label="能工巧匠 " value="0"></el-option>
				  <el-option label="行政事业人员" value="1"></el-option>
				  <el-option label="经商办企人员" value="2"></el-option>
				  <el-option label="其他" value="3"></el-option>
				</el-select>
				 </el-col>
				 <el-col :span="16">
					 <el-form-item label="所属自然村">
					     <el-select v-model="form.villageId" placeholder="请选择所属自然村" class="setlengh" clearable>
					       <el-option label="区域一" value="shanghai"></el-option>
					       <el-option label="区域二" value="beijing"></el-option>
					     </el-select>
					   </el-form-item>
				 </el-col>
			  </el-form-item>
			
			  <el-form-item label="人才简介" prop="talentSkillsDescription">
			      <el-input type="textarea" rows="4" v-model="form.talentSkillsDescription" placeholder="请输入简介" clearable></el-input>
			    </el-form-item>
			  <el-form-item>
			    <el-button @click="goback">返回</el-button>
				 <el-button type="primary" @click="submit">保存</el-button>
			  </el-form-item>
			</el-form>
			
		  </div></el-col>
		</el-row>
		</div>
	</div>
</template>

<script>
	
	import {getTalentInfo,getTalentInfoById,saveTalentInfo} from"../api/index.js"
	export default{
		data(){
			return{
			title:"新增信息",
			form: {
			      goodsId: '',//乡村振兴人才id
			      orgId: '',//所属组织id
			      townsId: '',//所属乡镇id
			      townsCode: '',//乡镇code
			      administrativeId: '',// 所属行政村id
			      administrativeCode: '',// 所属行政村code
			      villageId: '',// 所属自然村id
			      talentName: '',//乡村振兴人才姓名
				  talentGender: '',//性别
				  talentPolitics: '',//人才政治面貌
				  talentEducation: '',//人才教育学历
				  talentCollege: '',//人才毕业学习
				  talentMajor: '',//人才所学专业
				  talentOccupation: '',//人才从事职业
				  talentSkillsStatus: '',// 人才是否有额外专业技能 0 没有 1 有
				  talentSkillsDescription: '',//专业技能特长描述
				  talentOutsideWork: '',//是否长期外出务工人员 0 否 1 是
				  talentAdministrativeCause: '',//是否从事行政职业 0 否 1 是
				  talentPersonalCompany: '',//是否为经商办人员 0 否 1 是
				  talentCompanyName: '',//人才个人公司名称
				  talentCompanyAddress: '',//人才个人公司地址
				  talentAddress: '',//人才现居地址
				  talentUnit: '',//人才所在单位
				  talentJob: '',//人才从事职业
				  talentPhotoUrl: '',//人才照片
				  personId: '',//操作人id
				  personName: '',//操作人名称
				  createTime: '',// 创建时间
				  updateTime: ''//修改时间
			    },
				rules: {
					talentName: [{
							required: true,
							message: '请输入编号',
							trigger: 'blur'
						},
						{
							min: 3,
							message: '长度大于3个字符',
							trigger: 'blur'
						}
					],
					talentCompanyName: [{
						required: true,
						message: '请输入单位名称',
						trigger: 'blur'
					}],
					talentEducation: [{
							required: true,
							message: '请输入毕业学校以及专业',
							trigger: 'blur'
						},
						{
							min: 3,
							message: '长度大于3个字符',
							trigger: 'blur'
						}
					],
					talentCompanyAddress: [{
						required: true,
						message: '请输入单位地址',
						trigger: 'blur'
					}],
					talentAddress: [{
							required: true,
							message: '请输入现居地址',
							trigger: 'blur'
						},
						{
							min: 3,
							message: '长度大于3个字符',
							trigger: 'blur'
						}
					],
					talentJob: [{
						required: true,
						message: '请输入单位职务',
						trigger: 'blur'
					}],
					talentSkillsDescription: [{
							required: true,
							message: '请输入简介',
							trigger: 'blur'
						},
						{
							min: 3,
							message: '长度大于3个字符',
							trigger: 'blur'
						}
					],
				}
			}
		},
		methods:{
			goback(){
				this.$router.push({
				 path: 'talentList',
				 query: {
				 name: 'admin',
				 code: 10021
				}
				  })
			},
			getTalentInfoById(id){
				getTalentInfoById(id).then(res=>{
					console.log(res)
				})
			},
			saveTalentInfo(){
				saveTalentInfo(this.form).then(res=>{
					console.log(res)
				})
			},
			submit(){
				this.$refs.form.validate((valid) => {
				        if (valid) {
				          this.saveTalentInfo()()
				        } else {
				          this.$message('请填写完整相关信息')//就像用户提示发生错误的消息
				        }
				    })
			}
		},
		mounted() {
			this.getTalentInfoById()
		}
	}
</script>

<style lang="scss" scoped>
.talentManage{
	.el-row {
	    margin-bottom: 20px;
	    &:last-child {
	      margin-bottom: 0;
	    }
	  }
	  .setlengh{
		  width:100%;
	  }
	  .grid-content1 {
	  	height: 50px;
	  	line-height: 50px;
	  	padding-left: 30px;
	  	padding-top: 10px;
	  	font: 20px Arial;
	  }
	  .center{
	  		  padding-left: 18%;
	  		  margin-top: 0;
	  }
	  .divided{
	  	width:104%;
	  	margin-top: 12px;
	  	margin-left: -30px;
	  }	
	  .el-col {
	    border-radius: 4px;
	  }
	  .bg-purple {
	    background: #eeeeee;
	  }
	  .bg-purple-light {
	    background: #eeeeee;
	  }
	  .grid-content {
	    border-radius: 4px;
	    min-height: 50px;
		line-height: 50px;
		padding-left: 110px;
	  }
	  .row-bg {
	    padding: 10px 0;
	    background-color: #f9fafc;
	  }
     .photo	{
		 position:absolute;
		 top:0;
		 left:250px;
	 }
}
</style>

