<template>
	<div class="ZRC-info">
		<el-row>
			<el-col :span="12">
				<div class="grid1-content">
					<el-button @click="add" type="primary" icon="el-icon-plus">新添信息</el-button>
					<el-dropdown @command="changeXZ" v-show="top">
						<span class="el-dropdown-link">
							{{town}}<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown" v-show="top1">
							<el-dropdown-item v-for="(item,index) in data" :key="index" :command="item">
								{{item.townsName}}</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<el-dropdown @command="changeXZC">
						<span class="el-dropdown-link">
							{{village}}<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item v-for="(item,index) in data1" :key="index" :command="item">
								{{item.administrativeName}}</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid1-content"></div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content bg-purple can">
					<div style="margin-left: -70px;">
						<el-input placeholder="请输入内容" v-model="search" class="input-with-select" clearble>
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
			<el-table-column label="自然村名" prop="villageName">
			</el-table-column>
			<el-table-column label="所属行政村" prop="administrativeName">
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
		getZRCInfo,
		deleteZRCInfo,
		getZRCInfoById,
		getXZCInfo,
		getXZCInfoByTownsId,
		getAllXZInfo,
		getZRCInfoByAdministrativeId,
		getAuthority
	} from '../api/index.js'
	export default {
		data() {
			return {
				title: "新增信息",
				toastTitle: "立即创建",
				form: [],
				top:true,
				top1:true,
				search: '',
				town: '',
				village: '',
				townsId: '',
				pageNum: 1,
				id: '',
				data: [],
				data1: [],
				count: 100,
				pageSize: 10,
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
			changeXZ(res) {
				this.town = res.townsName
				this.townsId = res.townsId
				this.getXZCInfo(this.townsId)
			},
			changeXZC(res) {
				console.log(res)
				this.village = res.administrativeName
				this.id = res.administrativeId

				this.getZRCInfo(this.id)
				console.log(res)
			},
			handleEdit(index, row) {
				this.$router.push({
					path: 'ZRC-infoManage',
					query: {
						name: '编辑信息',
						id: row.villageId,
						code: 101
					}
				})
				console.log(index, row);
			},
			getZRCInfoByAdministrativeId(id) {
				getZRCInfoByAdministrativeId({
					administrativeId: id
				}).then(res => {
					this.tableData = res.data
					console.log(res.data)
				})
			},
			getXZInfo() {
				getAllXZInfo().then(res => {
					console.log(res.data)
					this.data = res.data
					this.town = res.data[0].townsName
					this.townsId = res.data[0].townsId
					this.getXZCInfo(res.data[0].townsId)
				})
			},
			getXZCInfo(id) {
				getXZCInfoByTownsId({
					townId: id
				}).then(res => {
					console.log(res.data)
					this.data1 = res.data
					this.village = res.data[0].administrativeName
				})
			},
			add() {
				this.$router.push({
					path: 'ZRC-infoManage',
					query: {
						name: '新增信息',
						code: 102
					}
				})
			},
			IsAuthority(){
			 getAuthority().then(res=>{
				 if(res.data.code==1){
					 this.top=true
					 this.top1=true
				 }else{
					 this.top=false
					 this.top1=false
				 }
			 })
			},
			handleDelete(index, row) {
				console.log(row)
				deleteZRCInfo({
					villageId: row.villageId
				}).then(res => {
					this.getZRCInfo()
				})
			},
			handleSizeChange(val) {
				this.pageNum = val
				console.log(this.pageNum);
				this.getZRCInfo()
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.pageNum = val
				console.log(this.pageNum);
				this.getZRCInfo()
				console.log(`当前页: ${val}`);
			},
			handleSearch() {
				this.getZRCInfoById()
			},
			handleRefresh() {
				this.getZRCInfo()
			},
			getZRCInfo(id) {
				getZRCInfo({
					administrativeId: id,
					keywords: this.keywords,
					pageSize: this.pageSize,
					pageNum: this.pageNum
				}).then(res => {
					this.count = res.data.total
					this.tableData = res.data.data
					console.log(res.data.data)
				})
			},
			getZRCInfoById() {
				getZRCInfoById(this.search).then(res => {
					console.log(res)
				})
			}
		},
		mounted() {
			this.getXZInfo()
			this.getZRCInfo(this.village)
		}
	}
</script>

<style lang="scss" scoped>
	.ZRC-info {
		.grid1-content {
			height: 50px;
			width: 100%;
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
			bottom: -80px;
			left: -80px;
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

		.confirm {
			margin-top: 15px;
			margin-left: 0;
			width: 90%;
			height: 300px;
		}
	}
</style>
