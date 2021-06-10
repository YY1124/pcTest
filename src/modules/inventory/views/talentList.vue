<template>
	<div class="talentList">
		<el-row>
		  <el-col :span="12"><div class="grid1-content"><el-button @click="add"  type="primary" icon="el-icon-plus">新添信息</el-button></div></el-col>
		  <el-col :span="4"><div class="grid1-content"></div>
		  </el-col>
		  <el-col :span="6"><div class="grid-content bg-purple">
					<div style="margin-left: -40px;">
						<el-input placeholder="请输入内容" v-model="search" class="input-with-select">
							<el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
						</el-input>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-table :data="tableData"
			style="width: 90%;margin-left: 50px;">
			<el-table-column label="编号" prop="date" >
			</el-table-column>
			<el-table-column label="姓名" prop="name" >
			</el-table-column>
			<el-table-column label="性别" prop="name" >
			</el-table-column>
			<el-table-column label="学历" prop="name" >
			</el-table-column>
			<el-table-column label="政治面貌" prop="name" >
			</el-table-column>
			<el-table-column label="毕业学校及专业" prop="name" >
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" class="setcolor" background-color="#009688"
						@click="handleEdit(scope.$index, scope.row)">修改</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="block bg-block">
			<el-pagination
			     @size-change="handleSizeChange"
			     @current-change="handleCurrentChange"
			     :current-page.sync="currentPage"
			     :page-size="pageSize"
			     layout="prev, pager, next, jumper"
			     :total="count"
				 background
				>
			   </el-pagination>
		</div>
	</div>
</template>

<script>
	
	import {getTalentInfo,getTalentInfoById,deleteTalentInfo} from"../api/index.js"
	export default{
		data(){
			return{
				title:"新增信息",
				toastTitle:"立即创建",
				pageSize:10,
				pageNum:1,
				count:100,
				search:'',
				current:1,
				currentPage:1,
				tableData: [],	
				formLabelAlign: {
					name: '',
					region: '',
					type: '',
				},
			}
		},
		methods:{
		handleEdit(index, row) {
			   this.$router.push({
			   path: 'talentManage',
			   query: {
			   id:row.id,
			   code: 101
			  }
			    })
					console.log(index, row);
				},
				handleDelete(index, row) {
					this.deleteTalentInfo(row.id)
				},
				handleSizeChange(val) {
					this.pageNum=val
					console.log(this.pageNum);
					this.getTalentList()
					console.log(`每页 ${val} 条`);
				},
				handleCurrentChange(val) {
					this.pageNum=val
					console.log(this.pageNum);
					this.getTalentList()
					console.log(`当前页: ${val}`);
				},
				add() {
					this.$router.push({
					 path: 'talentManage',
					 query: {
					 code: 102
					}
					  })
				},
				handleSearch(){
					console.log("实现搜索")
				},
			    getTalentList(){
					getTalentInfo({
						villageId:'',
						talentName:'',
						pageSize:this.pageSize,
						pageNum:this.pageNum
					}).then(res=>{
						console.log(res.data)
						this.tableData=res.data.data
						this.count=res.data.total
					})
				},
				getTalentInfoById(id){
					getTalentInfoById(id).then(res=>{
						console.log(res)
					})
				},
				deleteTalentInfo(id){
					deleteTalentInfo(id).then(res=>{
						console.log(res)
					})
				}
		},
		mounted() {
			this.getTalentList()
		}
	}
</script>

<style lang="scss" scoped>
.talentList{
	.grid1-content{
		height:50px;
		width:100%;
		margin-left: 50px;
		margin-top: 30px;
		
	}
	
	.el-row {
		margin-bottom: 10px;
	
		&:last-child {
			margin-bottom: 0;
		}
	}
	
	.el-col {
		border-radius: 4px;
	}
	
	.bg-purple-dark {}
	
	.bg-purple {
		margin-top: 30px;
		margin-left: 180px;
	}
	
	.bg-purple-light {
		background: #e5e9f2;
	}
	
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	
	.row-bg {
		background-color: #f9fafc;
	}
	
	.bg-block {
		margin-top: 20px;
		margin-left: 50px;
	}
}
	
</style>
