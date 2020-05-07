<template>
  <div>
    <div>
      <el-input
        size="small"
        class="input_type"
        placeholder="添加职称..."
        prefix-icon="el-icon-plus"
        @keydown.enter.native="addPosition"
        v-model="pos.name"
      ></el-input>

      <el-select size="small" class="input_type2" v-model="pos.titleLevel" placeholder="职称等级">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="addPosition">添加</el-button>
    </div>
    <div>
      <el-table
        :data="positions"
        stripe
        border
        type="small"
        style="width: 90%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="56"></el-table-column>
        <el-table-column prop="id" label="编号" width="56"></el-table-column>
        <el-table-column prop="name" label="职位名称" width="150"></el-table-column>
        <el-table-column prop="titleLevel" label="职称级别" width="150"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="200"></el-table-column>
        <el-table-column prop="enabled" label="是否启用" width="200">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
            <el-tag v-else type="warning">未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="danger"
        size="small"
        style="margin-top: 8px"
        @click="deleteMany"
        :disabled="multipleSelection.length === 0"
      >批量删除</el-button>
    </div>
    <el-dialog title="修改职位" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-tag>职位名称</el-tag>
        <br />
        <br />
        <el-input class="update_input" size="small" v-model="updatePos.name"></el-input>
        <br />
        <br />

        <el-select size="small" class="update_select" v-model="updatePos.titleLevel">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select><br><br>
          <el-tag>是否启用</el-tag>
          <el-switch
            class="update_inputs"
            v-model="updatePos.enabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="doUpdate" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Position",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "正高级"
        },
        {
          value: "选项2",
          label: "副高级"
        },
        {
          value: "选项3",
          label: "中级"
        },
        {
          value: "选项4",
          label: "初级"
        },
        {
          value: "选项5",
          label: "员级"
        }
      ],
      value: "",
      label: "",
      // 添加输入框的数据
      pos: {
        name: "",
        titleLevel: ""
      },
      // 表格显示的数据
      positions: [],
      // 更新按钮的数据
      updatePos: {
        name: "",
        titleLevel: "",
        enabled: true
      },
      // 对话框显示与否的标志位
      dialogVisible: false,
      // 批量删除的数据记录
      multipleSelection: []
    };
  },
  methods: {
    // 表格数据初始化处理
    async initPositions() {
      const data = await this.getRequest("/system/basic/job/findAll");
      if (data) {
        this.positions = data.obj;
      }
    },
    // 添加新记录的事件处理
    async addPosition() {
      if (this.pos.name && this.pos.titleLevel) {
        const resp = await this.postRequest("/system/basic/job/add", this.pos);
        if (resp) {
          this.initPositions();
          this.pos.name = "";
          this.pos.titleLevel = "";
        }
      } else {
        this.$message.error("职位名称,职称级别不能为空");
      }
    },
    // 显示修改对话框
    showEditDialog(index, data) {
      // this.updatePos = data // 浅拷贝会改变表格的记录
      Object.assign(this.updatePos, data); // 使用深拷贝
      this.dialogVisible = true;
    },
    // 弹框确认修改的事件处理
    async doUpdate() {
      const resp = await this.putRequest(
        "/system/basic/job/update",
        this.updatePos
      );
      if (resp) {
        this.initPositions();
        this.updatePos.name = "";
        this.updatePos.titleLevel = "";
        this.dialogVisible = false;
      }
    },
    // 表格记录的删除按钮的事件处理
    handleDelete(index, data) {
      this.$confirm(
        "此操作将永久删除" + data.name + "职位, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.deleteRequest("/system/basic/job/delete/" + data.id).then(
            resp => {
              this.initPositions();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    // 记录多选的处理
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    // 批量删除
    deleteMany() {
      this.$confirm(
        "此操作将永久删除" +
          this.multipleSelection.length +
          "条记录, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          // 生成删除记录 id的查询字符串
          let ids = "?";
          this.multipleSelection.forEach(item => {
            ids += "ids=" + item.id + "&";
          });
          this.deleteRequest("/system/basic/job/bulk/delete/" + ids).then(
            resp => {
              this.initPositions();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    }
  },
  // 在页面元素挂载后加载数据
  mounted() {
    this.initPositions();
  }
};
</script>

<style scoped>
.input_type {
  width: 300px;
  margin-right: 8px;
  margin-bottom: 16px;
}
.input_type2 {
  width: 150px;
  margin-right: 8px;
  margin-bottom: 16px;
}
.update_input {
  width: 300px;
}
.update_select {
  width: 100px;
}
.update_inputs {
  width: 300px;
  padding-left: 10px;
}
</style>