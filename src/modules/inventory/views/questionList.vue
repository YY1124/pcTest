<template>
	<div class="questionList">
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
				</div></el-col>
		</el-row>
		<el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
			style="width: 90%;margin-left: 50px;">
			<el-table-column label="编号" prop="questionId">
			</el-table-column>
			<el-table-column label="问题描述" prop="questionDescription">
			</el-table-column>
			<el-table-column label="问题类型" prop="questionType">
			</el-table-column>
			<el-table-column label="责任人" prop="questionDutyPerson">
			</el-table-column>
			<el-table-column label="所属自然村" prop="name">
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
	
	import {getQuestionInfo,getQuestionInfoById,deleteQuestionInfo} from"../api/index.js"
	export default{
		data(){
			return{
				pageSize:10,
				pageNum:1,
				count:100,
				title:"新增信息",
				search:'',
				current:"",
				formLabelAlign: {
					name: '',
					region: '',
					type: '',
				},
				tableData: [],	
			}
		},
		methods:{
		handleEdit(index, row) {
			   this.$router.push({
			   path: 'questionManage',
			   query: {
			     code: 101,
				 id:row.id
			  }
			    })
					console.log(index, row);
				},
				handleDelete(index, row) {
					this.deleteQuestionInfo(row.id)
				},
				handleSizeChange(val) {
					this.pageNum=val
					console.log(this.pageNum);
					this.getQuestionList()
					console.log(`每页 ${val} 条`);
				},
				handleCurrentChange(val) {
					this.pageNum=val
					console.log(this.pageNum);
					this.getQuestionList()
					console.log(`当前页: ${val}`);
				},
				add() {
					this.$router.push({
					 path: 'questionManage',
					 query: {
					 code: 102
					}
					  })
				},
				handleSearch(){
					console.log("实现搜索")
				},
			getQuestionList(){
				getQuestionInfo({
					villageId:'',
					questionDutyPerson:'',
					pageSize:this.pageSize,
					pageNum:this.pageNum
				}).then(res=>{
					console.log(res.data)
					this.tableData=res.data.data
					this.count=res.data.total
				})
			},
			deleteQuestionInfo(id){
				deleteQuestionInfo(id).then(res=>{
					console.log(res)
				})
			},
			getQuestionById(id){
				getQuestionInfoById(id).then(res=>{
					console.log(res)
				})
			}
		},
		mounted() {
			this.getQuestionList()
		}
	}
</script>

<style lang="scss" scoped>
.questionList{
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
		margin-left: 80px;
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
	
	.top {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 20;
		background: rgba(0, 0, 0, .2);
	
		.top-content-box {
			height: 500px;
			width: 800px;
			background: rgba($color: #FFFFFF, $alpha: 1.0);
			margin: 8% auto;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
	
			.top-content {
				width: 100%;
				height: 60px;
				line-height: 60px;
				margin-top: 10px;
				padding-left: 80px;
	
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
