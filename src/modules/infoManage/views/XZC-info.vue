<template>
	<div class="XZC-info">
		<el-row>
			<el-col :span="12">
				<div class="grid1-content">
					<el-button @click="add" type="primary" icon="el-icon-plus">新增</el-button>
					<el-dropdown @command="chooseXZ" v-show="top">
						<span class="el-dropdown-link">
							{{town}}
							<i class="el-icon-arrow-down el-icon--right">
							</i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item v-for="(item,index) in data" :key="index" :command="item">
								{{item.townsName}}</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid1-content"></div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content bg-purple can">
					<div style="margin-left:-70px;">
						<el-input placeholder="请输入搜索" v-model="search" class="input-with-select" clearable>
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
			<el-table-column label="行政村名" prop="administrativeName">
			</el-table-column>
			<el-table-column label="人口数量" prop="totalPerson">
			</el-table-column>
			<el-table-column label="行政村支书" prop="administrativeSecretaryName">
			</el-table-column>
			<el-table-column label="所属乡镇" prop="townName">
			</el-table-column>
			<el-table-column label="第一书记" prop="firstSecretaryName">
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
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper" :total="count"
				background>
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import {
		getXZCInfo,
		deleteXZCInfo,
		getXZCInfoById,
		getAuthority,
		getAllXZInfo
	} from '../api/index.js'
	import storage from '../../../common/store/storage'
	export default {
		data() {
			return {
				title: "新增信息",
				toastTitle: "立即创建",
				top:true,
				form: [],
				keywords: '',
				pageNum: 1,
				pageSize: 10,
				count: 100,
				search: '',
				town: '',
				data: [],
				tableData: [],
				currentPage: 1,
				formLabelAlign: {
					name: '',
					region: '',
					type: '',
				},
			}
		},
		methods: {
			chooseXZ(res) {
				this.town = res.townsName
				this.getXZCInfo(res.townsId)
			},
			handleEdit(index, row) {
				this.$router.push({
					path: 'XZC-infoManage',
					query: {
						name: '编辑信息',
						id: row.administrativeId,
						code: 101
					}
				})
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(row)
				deleteXZCInfo({
					administrativeId: row.administrativeId
				}).then(res => {
					this.getXZCInfo()
				})
			},
			handleSearch() {
				getXZCInfoById(this.search, ).then(res => {
					console.log(res)
				})
			},
			handleSizeChange(val) {
				this.pageNum = val
				console.log(this.pageNum);
				this.lineCrodList()
			},
			handleCurrentChange(val) {
				this.pageNum = val
				console.log(this.pageNum);
				this.lineCrodList()
				console.log(`当前页: ${val}`);
			},
			add() {
				this.$router.push({
					path: 'XZC-infoManage',
					query: {
						name: '添加信息',
						code: 102
					}
				})
			},
			getAuthority() {
				getAuthority().then(res => {
					if(res.data.code==1){
					 this.top=true
					}else{
					 this.top=false
					 this.townId=res.data.townId
					}
					console.log(res)
				})
			},

			async lineCrodList() {
				this.getXZCInfo()
			},
			getXZCInfo(id) {
				getXZCInfo({
					townId: id,
					administrativeName: this.keywords,
					pageSize: this.pageSize,
					pageNum: this.pageNum
				}).then(res => {
					console.log(res)
					this.tableData = res.data.data
					this.count = res.data.total

				})
			},
			getxzInfo() {
				getAllXZInfo().then(res => {
					this.data = res.data
					this.town = res.data[0].townsName
					this.townId=res.data[0].townId
					console.log(this.town)
					
				})
			}
		},
		mounted() {
			this.getxzInfo()
			this.getAuthority()
			this.getXZCInfo(this.townId)
		}
	}
</script>

<style lang="scss" scoped>
	.XZC-info {
		.grid1-content {
			height: 50px;
			width: 100%;
			margin-left: 50px;
			margin-top: 30px;
		}

		.divided {
			width: 104%;
			margin-top: 12px;
			margin-left: -30px;
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

		.can {
			margin-right: 50px;
		}

		.el-dropdown-link {
			margin-left: 30px;
			cursor: pointer;
			color: #409EFF;
		}

		.el-icon-arrow-down {
			font-size: 12px;
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
	}
</style>
