<template>
	<div class="XZ-info">
		<el-row>
			<el-col :span="12">
				<div class="grid1-content bg-purple">
					<el-button @click="add" type="primary" icon="el-icon-plus">新增</el-button>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content"></div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content bg-purple can">
					<div style="margin-left:-70px;">
						<el-input placeholder="请输内容搜索" v-model="search" class="input-with-select" clearable>
							<el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
						</el-input>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-table :data="tableData" style="width: 95%;margin-left: 50px;">
			<el-table-column label="编号" width="180px">
				<template slot-scope="scope">{{scope.$index+1}}</template>
			</el-table-column>
			<el-table-column label="乡镇名称" prop="townsName">
			</el-table-column>
			<el-table-column label="挂职领导" prop="townLeadName">
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
	import {
		request
	} from "../../../common/request"
	import {
		getXZInfo,
		deleteXZInfo
	} from '../api/index.js'
	export default {
		data() {
			return {
				form: [],
				search: '',
				keywords: '',
				pageNum: 1,
				pageSize: 10,
				count: 100,
				currentPage: 1,
				formLabelAlign: {
					name: '',
					region: '',
					type: '',
				},
				tableData: [],
			}
		},
		methods: {
			handleEdit(index, row) {
				this.$router.push({
					path: 'XZ-infoManage',
					query: {
						code: 101,
						id:row.townsId
					}
				})
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(row)
				deleteXZInfo({townId:row.townsId}).then(res => {
					this.getInfo()
				})
			},
			handleSizeChange(val) {
				this.pageNum = val
				console.log(this.pageNum);
				this.getInfo()
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.pageNum = val
				console.log(this.pageNum);
				this.getInfo()
				console.log(`当前页: ${val}`);
			},
			add() {
				this.$router.push({
					path: 'XZ-infoManage',
					query: {
						code: 102
					}
				})
			},
			getInfo() {
				getXZInfo({
					townName: this.keywords,
					pageSize: this.pageSize,
					pageNum: this.pageNum
				}).then(res => {
					this.tableData = res.data.data
					this.count=res.data.total
					console.log(res.data.data)
				})
			},
			handleSearch() {
				console.log("实现搜索")
			},
		},
		mounted() {
			this.getInfo()
		}
	}
</script>

<style lang="scss" scoped>
	.XZ-info {
		.el-row {
			margin-bottom: 20px;

			&:last-child {
				margin-bottom: 0;
			}
		}

		.grid1-content {
			height: 50px;
			width: 100%;
			margin-left: 50px;
			margin-top: 30px;
		}

		.el-col {
			border-radius: 4px;
		}

		.bg-purple-dark {}

		.bg-purple {
			margin-top: 30px;
			margin-left: 50px;
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
			margin-left: 30px;
		}

		.setcolor {
			background-color: #009688;
			color: #FFFFFF;
		}

		.can {
			margin-right: 90px;
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
				height: 400px;
				width: 600px;
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
