<template>
  <div @click="visible = true" class="OrgUserSelector">
    <div class="OrgUserSelector-input">
      <div class="__left">
        <el-input
          class="__placeholder"
          v-if="!orgs.length && !users.length"
          :placeholder="placeholder"
          readonly
        ></el-input>
        <div class="orgs">
          <div class="org" v-for="item in orgs" :key="item.OrgId">
            {{ item.OrgFullName }}
            <!-- <i class="el-icon-close" @click="toggleOrg(item)" /> -->
          </div>
        </div>
        <div class="users">
          <div class="user" v-for="item in users" :key="item.MemberGloabId">
            {{ item.TrueName }}
            <!-- <i class="el-icon-close" @click="toggleUser(item)" /> -->
          </div>
        </div>
      </div>
      <i class="__arrow el-icon-circle-plus-outline" />
    </div>
    <el-dialog
      :visible.sync="visible"
      append-to-body
      custom-class="OrgUserSelector-dialog"
      width="70%"
    >
      <div slot="title" class="el-dialog__title">
        {{ placeholder }}
      </div>
      <div class="OrgUserSelector-dialog__content">
        <div class="aside left">
          <header>
            <el-input
              class="keyword"
              :disabled="!!currentOrg"
              placeholder="查询党组织"
              v-model="keyword"
              clearable
            />
          </header>
          <div class="aside-content">
            <!-- <div class="users" v-if="currentOrg" v-loading="userListLoading">
              <div class="top">
                <label>></label>
                <span class="name">{{ currentOrg.OrgFullName }}</span>
                <span class="back" @click="backToOrgTree">返回</span>
              </div>
              <div class="all">
                <el-checkbox
                  :value="isUserAllChecked"
                  :indeterminate="isUserAllIndeterminate"
                  @change="toggleAllUser"
                >
                  全选
                </el-checkbox>
              </div>
              <div class="list">
                <div v-for="item in userList" :key="item.MemberGloabId">
                  <el-checkbox :value="item.checked" @change="toggleUser(item)">
                    <div class="item">
                      <div class="avatar">
                        <div :style="{ backgroundImage: `url(${item.HeadPhotoUrl})` }" />
                      </div>
                      <div class="name">{{ item.TrueName }}</div>
                    </div>
                  </el-checkbox>
                </div>
                <div class="empty" v-if="currentOrgUserList.length == 0 && !userListLoading">
                  暂无数据
                </div>
              </div>
            </div> -->
            <div class="search-list" v-if="keyword" v-loading="searching">
              <!-- <div class="item" v-for="item in searchList" :key="item.OrgId">
                <el-checkbox :value="item.checked" @change="toggleOrg(item)"> </el-checkbox>
                <span @click="handleOrgClick(item)">{{ item.OrgFullName }}</span>
              </div>
              <div class="empty" v-if="searchList.length == 0 && !searching">暂无数据</div> -->
              <el-tree
                :key="searchKey"
                ref="searchTree"
                lazy
                :load="loadNodeSearch"
                :props="props"
                node-key="id"
                show-checkbox
                @check-change="handleTreeCheckSearch"
                :empty-text="searching ? '' : '暂无数据'"
              >
                <span slot-scope="{ node, data }">
                  <i v-if="node.isLeaf" class="el-icon-document-remove" />
                  <i v-else class="el-icon-folder-opened" />
                  <span class="item-title">{{ data.label }}</span>
                </span>
              </el-tree>
            </div>
            <div class="tree">
              <el-tree
                ref="tree"
                lazy
                :load="loadNode"
                :default-expanded-keys="defaultExpandedKeys"
                :props="props"
                node-key="id"
                show-checkbox
                @check-change="handleTreeCheck"
              >
                <span slot-scope="{ node, data }">
                  <i v-if="node.isLeaf" class="el-icon-document-remove" />
                  <i v-else class="el-icon-folder-opened" />
                  <span class="item-title">{{ data.label }}</span>
                </span>
              </el-tree>
            </div>
          </div>
        </div>
        <div class="divider" />
        <div class="aside right">
          <header>已选择</header>
          <div class="list">
            <div class="orgs">
              <div class="org" v-for="item in selectedOrgs" :key="item.OrgId">
                {{ item.OrgFullName }}
                <i class="el-icon-close" @click="toggleOrg(item)" />
              </div>
            </div>
            <div class="users">
              <div class="user" v-for="item in selectedUsers" :key="item.MemberGloabId">
                {{ item.TrueName }}
                <i class="el-icon-close" @click="toggleUser(item)" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleOk">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { loadOrgChildrenForTree, getOrgUsers, queryOrg } from '../../api/org'
import throttle from 'lodash/throttle'
import uniqWith from 'lodash/uniqWith'

export default {
  props: {
    placeholder: {
      type: String,
      default: null,
    },
    orgs: {
      type: Array,
      default: () => [],
    },
    users: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      searchKey: 0,
      visible: false,
      currentOrg: null,
      currentOrgUserList: [],
      userListLoading: false,
      selectedUsers: [],
      selectedOrgs: [],
      props: {
        label: 'label',
        children: 'children',
        isLeaf: 'isLeaf',
      },
      defaultExpandedKeys: [],
      searching: false,
      searchList: [],
      keyword: '',
      inited: false,
    }
  },
  computed: {
    userList() {
      return this.currentOrgUserList.map(u => ({
        ...u,
        checked: this.selectedUsers.some(i => i.MemberGloabId == u.MemberGloabId),
      }))
    },
    isUserAllChecked() {
      if (!this.userList.length) {
        return false
      }
      return !this.userList.some(i => !i.checked)
    },
    isUserAllIndeterminate() {
      if (!this.userList.length) {
        return false
      }
      return !this.isUserAllChecked && this.userList.some(i => i.checked)
    },
    searchTreeCheckedKeys() {
      return this.selectedOrgs
        .map(i => i.OrgId)
        .concat(this.selectedUsers.map(i => i.MemberGloabId))
    },
  },
  watch: {
    currentOrg: 'loadCurrentOrgUserList',
  },
  mounted() {
    this.$watch(
      'keyword',
      throttle(() => {
        this.searchKey += 1
      }, 1000)
    )
  },
  methods: {
    loadNode(node, resolve) {
      if (!node.data || node.data.data.HasChildren) {
        loadOrgChildrenForTree(node.data?.id).then(orgs => {
          if (orgs.length > 0) {
            if (!this.inited) {
              this.inited = true
              if (orgs[0]) {
                this.defaultExpandedKeys = [orgs[0].data.OrgId]
              }
            }
            resolve(orgs.map(i => ({ ...i, isLeaf: false, isOrg: true })))
          } else {
            node.data.data.HasChildren = false
            this.loadNode(node, resolve)
          }
        })
      } else {
        getOrgUsers({
          Token: this.$auth.accessToken,
          OrganizGloabId: node.data.id,
          OrgCode: node.data.data.OrgCode,
          RegionId: node.data.data.RegionId,
        }).then(res => {
          resolve(
            res.EntityListT.map(i => ({
              label: i.TrueName,
              id: i.MemberGloabId,
              isLeaf: true,
              isUser: true,
              data: i,
            }))
          )
        })
      }
    },
    loadNodeSearch(node, resolve) {
      if (!node.data) {
        const { OrgCode, OrgGlobalId } = this.$auth.userInfo.EntityT
        this.searching = true
        queryOrg({
          Token: this.$auth.accessToken,
          OrganizCode: OrgCode,
          OrgGloabId: OrgGlobalId,
          KeyWord: this.keyword,
        })
          .then(res => {
            resolve(
              res.EntityListT.slice(0, 100).map(i => ({
                label: i.name,
                id: i.gloabid,
                isLeaf: false,
                isOrg: true,
                data: {
                  HasChildren: !i.isbranch,
                  OrgCode: i.code,
                  OrgFullName: i.name,
                  OrgId: i.gloabid,
                  ParentOrgId: i.pId,
                  RegionId: i.regionid,
                },
              }))
            )
            this.$nextTick(() => {
              this.$refs.searchTree.setCheckedKeys(this.searchTreeCheckedKeys)
            })
          })
          .catch(() => {
            resolve([])
          })
          .finally(() => {
            this.searching = false
          })
      } else {
        getOrgUsers({
          Token: this.$auth.accessToken,
          OrganizGloabId: node.data.id,
          OrgCode: node.data.data.OrgCode,
          RegionId: node.data.data.RegionId,
        }).then(res => {
          resolve(
            res.EntityListT.map(i => ({
              label: i.TrueName,
              id: i.MemberGloabId,
              isLeaf: true,
              isUser: true,
              data: i,
            }))
          )
          this.$nextTick(() => {
            this.$refs.searchTree.setCheckedKeys(this.searchTreeCheckedKeys)
          })
        })
      }
    },
    handleOrgClick(org) {
      this.currentOrg = org
      this.currentOrgUserList = []
    },
    handleNodeClick(node) {
      if (node.isLeaf) {
        this.currentOrg = node.data
        this.currentOrgUserList = []
      }
    },
    loadCurrentOrgUserList() {
      if (!this.currentOrg) {
        return
      }
      this.userListLoading = true
      getOrgUsers({
        Token: this.$auth.accessToken,
        OrganizGloabId: this.currentOrg.OrgId,
        OrgCode: this.currentOrg.OrgCode,
        RegionId: this.currentOrg.RegionId,
      })
        .then(res => {
          this.currentOrgUserList = res.EntityListT
        })
        .finally(() => {
          this.userListLoading = false
        })
    },
    backToOrgTree() {
      this.currentOrg = null
      this.currentOrgUserList = []
    },
    toggleUser(user) {
      if (this.selectedUsers.some(i => i.MemberGloabId == user.MemberGloabId)) {
        this.selectedUsers = this.selectedUsers.filter(i => i.MemberGloabId != user.MemberGloabId)
      } else {
        this.selectedUsers.push(user)
      }
    },
    toggleAllUser() {
      if (this.isUserAllChecked) {
        this.selectedUsers = this.selectedUsers.filter(
          i => !this.currentOrgUserList.some(j => i.MemberGloabId == j.MemberGloabId)
        )
      } else {
        this.selectedUsers.push(...this.currentOrgUserList)
      }
    },
    handleTreeCheck({ data, isOrg, isUser }, checked) {
      let orgs = isOrg
        ? checked
          ? this.selectedOrgs.concat(data)
          : this.selectedOrgs.filter(i => !i.OrgCode.startsWith(data.OrgCode))
        : this.selectedOrgs
      let users = isUser
        ? checked
          ? this.selectedUsers.concat(data)
          : this.selectedUsers.filter(i => i.MemberGloabId != data.MemberGloabId)
        : this.selectedUsers

      orgs = orgs.concat(
        this.$refs.tree
          .getCheckedNodes()
          .filter(i => i.isOrg)
          .map(i => i.data)
      )
      users = users.concat(
        this.$refs.tree
          .getCheckedNodes()
          .filter(i => i.isUser)
          .map(i => i.data)
      )

      orgs = uniqWith(orgs, (i, j) => i.OrgId == j.OrgId)
      users = uniqWith(users, (i, j) => i.MemberGloabId == j.MemberGloabId)

      const orgCodeList = orgs.map(i => i.OrgCode)
      for (const orgCode of orgCodeList) {
        orgs = orgs.filter(
          i => !(i.OrgCode.length > orgCode.length && i.OrgCode.startsWith(orgCode))
        )
        users = users.filter(i => i.OrganizCode != orgCode)
      }
      this.selectedOrgs = orgs
      this.selectedUsers = users
    },
    handleTreeCheckSearch({ data, isOrg, isUser }, checked) {
      this.$refs.tree.setChecked(isOrg ? data.OrgId : data.MemberGloabId, checked)

      let orgs = isOrg
        ? checked
          ? this.selectedOrgs.concat(data)
          : this.selectedOrgs.filter(i => !i.OrgCode.startsWith(data.OrgCode))
        : this.selectedOrgs
      let users = isUser
        ? checked
          ? this.selectedUsers.concat(data)
          : this.selectedUsers.filter(i => i.MemberGloabId != data.MemberGloabId)
        : this.selectedUsers

      orgs = orgs.concat(
        this.$refs.searchTree
          .getCheckedNodes()
          .filter(i => i.isOrg)
          .map(i => i.data)
      )
      users = users.concat(
        this.$refs.searchTree
          .getCheckedNodes()
          .filter(i => i.isUser)
          .map(i => i.data)
      )

      orgs = uniqWith(orgs, (i, j) => i.OrgId == j.OrgId)
      users = uniqWith(users, (i, j) => i.MemberGloabId == j.MemberGloabId)

      const orgCodeList = orgs.map(i => i.OrgCode)
      for (const orgCode of orgCodeList) {
        orgs = orgs.filter(
          i => !(i.OrgCode.length > orgCode.length && i.OrgCode.startsWith(orgCode))
        )
        users = users.filter(i => i.OrganizCode != orgCode)
      }
      this.selectedOrgs = orgs
      this.selectedUsers = users
    },
    toggleOrg(item) {
      const selected = this.isOrgCodeSelected(item.OrgCode)
      let list = selected
        ? this.selectedOrgs.filter(i => !i.OrgCode.startsWith(item.OrgCode))
        : this.selectedOrgs.concat(item)
      list = uniqWith(list, (i, j) => i.OrgId == j.OrgId)
      const orgCodeList = list.map(i => i.OrgCode)
      for (const orgCode of orgCodeList) {
        list = list.filter(
          i => !(i.OrgCode.length > orgCode.length && i.OrgCode.startsWith(orgCode))
        )
      }
      this.selectedOrgs = list
      item.checked = !selected
      this.$refs.tree.setChecked(item.OrgId, !selected)
    },
    isOrgCodeSelected(orgCode) {
      return this.selectedOrgs.some(i => orgCode.indexOf(i.OrgCode) === 0)
    },
    queryOrg() {
      const { OrgCode, OrgGlobalId } = this.$auth.userInfo.EntityT
      this.searching = true
      queryOrg({
        Token: this.$auth.accessToken,
        OrganizCode: OrgCode,
        OrgGloabId: OrgGlobalId,
        KeyWord: this.keyword,
      })
        .then(res => {
          this.searchList = res.EntityListT.map(i => ({
            HasChildren: !i.isbranch,
            OrgCode: i.code,
            OrgFullName: i.name,
            OrgId: i.gloabid,
            ParentOrgId: i.pId,
            RegionId: i.regionid,
            checked: this.isOrgCodeSelected(i.code),
          }))
        })
        .catch(() => {
          this.searchList = []
        })
        .finally(() => {
          this.searching = false
        })
    },
    handleCancel() {
      this.visible = false
    },
    handleOk() {
      this.$emit('update:users', [...this.selectedUsers])
      this.$emit('update:orgs', [...this.selectedOrgs])
      this.visible = false
    },
  },
}
</script>

<style lang="scss">
.OrgUserSelector-dialog__content {
  display: flex;
  height: 50vh;
  overflow: hidden;

  > .divider {
    border-right: 1px solid #eee;
    height: 100%;
  }

  > .aside {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 16px;

    > header {
      height: 32px;
      line-height: 32px;
      margin-bottom: 16px;
    }
  }

  > .left {
    position: relative;

    > .aside-content {
      flex: 1;
      position: relative;
      overflow: hidden;

      > .tree {
        height: 100%;
        overflow: auto;

        > .el-tree {
          display: inline-block;
          min-width: 100%;

          .el-tree-node.is-current > .el-tree-node__content {
            color: #b02027;
          }
        }
      }

      > .search-list {
        background-color: white;
        overflow: auto;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 2;

        > .item {
          padding: 0 8px;
          line-height: 26px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;

          &:hover {
            background-color: #f5f7fa;
          }
        }
      }

      > .users {
        background-color: white;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 3;

        .top {
          font-size: 14px;
          display: flex;
          align-items: center;
          color: #999999;
          line-height: 32px;
          height: 32px;

          .name {
            flex: 1;
            color: #ce0000;
            margin: 0 8px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .back {
            cursor: pointer;
          }
        }

        .list {
          flex: 1;
          overflow: auto;

          .el-checkbox {
            display: flex;
            align-items: center;
            margin: 6px 0;
          }

          .item {
            display: flex;
            align-items: center;

            .avatar {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background-color: #efefef;
              margin-right: 12px;
              background-image: url(./images/avatar.png);
              background-size: 100%;
              background-position: center;
              border-radius: 50%;

              div {
                width: 100%;
                height: 100%;
                background-size: cover;
                background-position: center;
                border-radius: 50%;
              }
            }

            .name {
              flex: 1;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }

      .empty {
        padding: 40px 0;
        text-align: center;
        color: #999;
      }
    }
  }

  > .right {
    .list {
      margin: -5px;
      overflow: auto;

      .org {
        margin: 5px;
        display: flex;
        align-items: center;

        i {
          margin-left: 16px;
          display: inline-block;
          width: 14px;
          height: 14px;
          line-height: 14px;
          text-align: center;
          vertical-align: middle;
          border-radius: 50%;
          background-color: #ce0000;
          color: #fff;
          font-size: 10px;
          cursor: pointer;
        }
      }

      .users {
        display: flex;
        flex-wrap: wrap;
      }

      .user {
        height: 26px;
        line-height: 26px;
        border-radius: 4px;
        background-color: rgba(206, 0, 0, 0.05);
        padding: 0 8px;
        font-size: 14px;
        color: #666666;
        margin: 5px;
        display: flex;
        align-items: center;

        i {
          cursor: pointer;
          vertical-align: middle;
          display: inline-block;
          font-size: 10px;
          margin-left: 4px;
          width: 12px;
          height: 12px;
          line-height: 12px;
          text-align: center;
          border-radius: 50%;

          &:hover {
            background-color: rgba(0, 0, 0, 0.1);
            color: #fff;
          }
        }
      }
    }
  }
}

.OrgUserSelector-dialog {
  > .el-dialog__body {
    padding: 0;
  }
}

.OrgUserSelector {
  min-height: 40px;
  display: flex;
  align-items: center;
}

.OrgUserSelector-input {
  width: 100%;
  min-height: 32px;
  border-radius: 4px;
  border: 1px solid #d5d5d5;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;

  .__placeholder {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    border: none;
    color: #999;

    input {
      border: none;
    }
  }

  .__left {
    flex: 1;
    position: relative;
  }

  .__arrow {
    margin: 0 8px;
    color: #999;
  }

  .org {
    margin: 5px;
    display: flex;
    align-items: center;
    line-height: 26px;

    i {
      margin-left: 16px;
      display: inline-block;
      width: 14px;
      height: 14px;
      line-height: 14px;
      text-align: center;
      vertical-align: middle;
      border-radius: 50%;
      background-color: #ce0000;
      color: #fff;
      font-size: 10px;
      cursor: pointer;
    }
  }

  .orgs,
  .users {
    display: flex;
    flex-wrap: wrap;
  }

  .user {
    height: 26px;
    line-height: 26px;
    border-radius: 4px;
    background-color: rgba(206, 0, 0, 0.05);
    padding: 0 8px;
    font-size: 14px;
    color: #666666;
    margin: 5px;
    display: flex;
    align-items: center;

    i {
      cursor: pointer;
      vertical-align: middle;
      display: inline-block;
      font-size: 10px;
      margin-left: 4px;
      width: 12px;
      height: 12px;
      line-height: 12px;
      text-align: center;
      border-radius: 50%;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        color: #fff;
      }
    }
  }
}
</style>
