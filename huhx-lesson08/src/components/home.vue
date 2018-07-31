<template>
  <div class="home">
      <!-- 头部：用户信息 扩展：登陆/退出 -->
      <div class="head">
        <div class="headall">
          <i class="fa fa-internet"></i>
          <el-badge is-dot>
            <i class="fa fa-letter"></i>
          </el-badge>
          <span>始祖鸟</span>
          <i class="fa fa-userava"></i>
        </div>
      </div>

      <!-- 用户信息列表内容 -->
      <el-card  shadow="always">
      <!-- 第一行：新增和查询功能 -->
      <div class="mar-btm-10 clearfix">
        <el-button
          type="primary"
          size="small"
          @click="addItems()"
        >
          <i class="augment fa fa-plus">新增</i> <!-- 添加item -->
        </el-button>
        <div class="search-area">     <!-- keyup.enter.native 回车事件 -->

          <!-- txt框 -->
          <el-input
            size="small"
            v-model="queryForm"
            placeholder="输入item名称查询"
            @keyup.enter.native="onSubmitQuery"
            clearable
          >
          </el-input>

          <!-- 查询按钮 -->
          <el-button size="small" @click="onSubmitQuery">
            <i class="fa demand" @click="onSearchFrom">查询</i>
          </el-button>
        </div>
      </div>

      <!-- 列表展示数据 -->
      <el-table
      :data="templateList"
        border
        style="width: 100%"
       >

        <!-- id -->
        <el-table-column type="index" width="52">#</el-table-column>

        <!-- 登录名 -->
        <el-table-column prop="name" label="登录名"></el-table-column>

        <!-- 姓名 -->
        <el-table-column prop="username" label="姓名"></el-table-column>

        <!-- 职位 -->
        <el-table-column prop="post" label="职位"></el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作" width="195">

          <!-- element-ui：自定义列模板 -->
          <template slot-scope="scope">
            <div class="text-nowrap">

              <!-- 按钮功能实现：编辑 -->
              <el-button
               size="small"
               @click.native.prevent="editTemplate(scope.row,scope.$index)"
              >
                <span class="prev">编辑</span>
              </el-button>

              <!-- 按钮功能实现：删除 -->
              <el-button
               type="danger"
               size="small"
               @click.native.prevent="removeTemplate(scope.$index)"
              >
                <span class="next">删除</span>
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页部分 -->
      <div class="mar-top clearfix">
        <el-pagination class="pull-right"
          background
          layout="total, prev, pager, next"
          :total="4"
          :current-page="1"
          :page-size="10"
          @current-change="onChangePage"
        >
        </el-pagination>
      </div>

    <!-- 弹框：表单 -->
    <el-dialog
      fullscreen
      :title="isEdit ? '新建用户' : '编辑用户'"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      custom-class="fr"
    >
      <!-- content -->
        <!-- from -->
        <el-form :model="userInfo" :rules="rules" ref="ruleForm" label-width="6rem" class="demo-ruleForm" size="mini">
        <el-form-item label="登录名" prop="name">
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item v-if="!isEdit" label="密码" prop="password">
          <el-input v-model="userInfo.password" type="password" placeholder="用户登录时的密码"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tell">
          <el-input v-model="userInfo.tell" placeholder="用户的联系号码，会用来接收短信"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="post">
          <el-input v-model="userInfo.post"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="type">
          <el-checkbox-group v-model="userInfo.type">
            <el-checkbox label="管理员" name="type"></el-checkbox>
            <el-checkbox label="技术专家" name="type"></el-checkbox>
            <el-checkbox label="运维工程师" name="type"></el-checkbox>
            <el-checkbox label="审核人员" name="type"></el-checkbox>
            <el-checkbox label="任务分配" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- footer -->
        <el-form-item class="footer">

          <!-- 重置密码 -->
          <el-button
           v-if="isEdit"
           class="resetCode"
           size="small"
           type="warning"
           @click="resetPassword"
          >
              重置
          </el-button>

          <!-- 确定 -->
          <el-button
           class="ensure"
           size="small"
           type="primary"
           @click="resetForm('formName')"
          >
              确定
          </el-button>

          <!-- 取消 -->
          <el-button
           class="cancel"
           size="small"
           @click="dialogVisible = false"
          >
              取消
          </el-button>

        </el-form-item>
      </el-form>

    </el-dialog>

    </el-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

  export default {
    // components: {},
    // mixins: [],
    data() {
      return {
        templateList: this.$store.state.templateList,       //列表数据
        dialogVisible: this.$store.state.dialogVisible,            //是否显示dialog弹框表单
        userInfo: this.$store.state.userInfo,
        queryForm: '',
        // 密码可见?
        seeKeys: false,
        // 表单验证规则
        rules: {
          name: [
            { required: true, message: '请输入登录名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入正确的密码', trigger: 'blur' },
            { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个角色分配', trigger: 'change' }
          ],
        }
      };
    },
    // computed: {},
    created() {
      // 接收请求数据
    },
    computed: {
      // 获取列表数据，用于渲染
      getList: function() {
        return this.$store.state.userInfo
      }
    },
    methods: {
      // 搜索
      onSearchFrom () {
        this.$store.commit('findData',this.queryForm)
      },
      // 弹窗关闭
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      // 新增数据
      addItems(){
        this.$store.commit('onState', JSON.stringify({
          title: '新增用户',
          changeFrom: 'add',
          dialogVisible: true,
        }))
        this.$store.commit('onUpdateTemplate')
      },
      // 删除数据
      removeTemplate(index){
        this.$confirm('确定要删除这条数据吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'danger'
        })
          .then(()=>{
            this.$store.commit('onDeleteItem', index)
            this.$message({
              type: 'success',
              message: '成功删除用户！'
            })
          })
          .catch(()=>{
            this.$message({
              message: '已取消删除！'
            })
          })
      },
      // 编辑弹框
      editTemplate (val) {
        this.$store.commit('onState',JSON.stringify({
          title: "编辑用户",
          changeFrom: 'edit',
          dialogVisible: true,
          id: val.id,
        }))
        this.$store.commit('onUpdateTemplate')
      },
      ...mapMutations([
          'resetPassword',
        ]),
      // 确定
      resetForm(formName) {
        this.$refs.getList.validate((valid) => {
          if (valid) {
            if (this.$store.state.changeFrom === "add") {
              this.$store.commit('onCreateItem', JSON.stringify(formName))
              this.$message({
                type: 'success',
                message: '成功新增用户！'
              })
              this.$store.state.dialogVisible = false
            } else if (this.$store.state.changeFrom === "edit") {
              this.$store.commit('commitFrom', JSON.stringify(fromName))
              this.$message({
                type: 'success',
                message: '成功编辑用户！'
              })
              this.$store.state.dialogVisible = false
            }
          } else {
            return false
          }
        })
      },
    },
  };
</script>
<style scoped>
.head {
  width: 100%;
  height: 45px;
  border-radius: 5px;
  background: #409EFF;
  color: #fff;
}
.headall {
  width: 250px;
  height: 45px;
  float: right;
}
.head > .headall > i {
  display: inline-block;
  width: 30px;
  height: 30px;
  font-size: 24px;
  text-align: center;
  line-height: 45px;
  margin-left: 15px;
}
.head > .headall > i:hover,.head > .headall > span:hover {
  cursor: pointer;
}
.head > .headall > span {
  display: inline-block;
  margin-left: 20px;
  font-size: 15px;
  font-weight: bold;
}

/*清除浮动*/
.clearfix:after{
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.clearfix{
  zoom:1;
}
.el-card {
  margin-top: 15px;
}
.augment {
  font-size: 12px;
}
.demand {
  font-size: 12px;
}
.search-area {
  float: right;
}
.search-area > .el-input {
  width: 200px;
}
.el-badge {
  margin-left: 20px;
  font-size: 5px;
}
.el-table {
  margin-top: 15px;
}
.prev {
  display: inline-block;
  width: 22px;
  float: left;
  text-align: center;
  color: #409eff;
}
.next {
  display: inline-block;
  width: 22px;
  float: right;
  text-align: center;
}
.el-pagination {
  /*border: 1px solid #000;*/
  margin-top: 15px;
  margin-right: 25px;
  float: right;
}
/*form*/
.el-form > span {
  margin-bottom: 35px;
  width: 120px;
  height: 40px;
  display: inline-block;
  /*border: 1px solid #666;*/
  font-size: 1.1rem;
  text-align: center;
  line-height: 40px;
}
.footer {
  margin-top: 6rem;
  margin-bottom: 2.5rem;
}
.resetCode {
  margin-left: -60px;
}
.cancel, .ensure {
  margin-right: 8px;
  float: right;
}
.ensure {
  margin-right: 35px;
}
</style>
