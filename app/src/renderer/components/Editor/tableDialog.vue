<template>
  <el-dialog @close="close" v-model="showDialog" :close-on-press-escape="true" :modal="false" :close-on-click-modal="false" >
    <span slot="title"><i class="el-icon-z-table"></i><span style="margin-left:5px;">插入表格</span></span>
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="4" align>行数:</el-col>
      <el-col :span="8">
        <el-input-number v-model="rowNum" :min="2" size="small"></el-input-number>
      </el-col>
      <el-col :span="4">列数:</el-col>
      <el-col :span="8">
        <el-input-number v-model="colNum" :min="1" size="small"></el-input-number>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top:20px;">
      <el-col :span="4"></el-col>
      <el-col :span="4">
        <el-button type="primary" @click="confirm">确定</el-button>
      </el-col>
      <el-col :span="4">
        <el-button @click="cancel">取消</el-button>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
  </el-dialog>
</template>
<script>
export default {
  data() {
      return {
        rowNum: 2,
        colNum: 2
      }
    },
    computed:{
      showDialog:function() {
        return this.show;
      }
    },
    props: {
      show: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      close: function() {
        this.rowNum = 2;
        this.colNum = 2;
        this.$parent.showDialog = false;
      },
      cancel: function() {
        this.$parent.showDialog = false;
      },
      confirm: function() {
        let headerSplit = '---------';
        let spaceSplit = '    ';
        let columnSplit = '|';
        let pos = this.$parent.cm.getCursor();
        let tableStr = '\n'
        for (let i = 0; i <= this.rowNum; i++) {
          // title
          if (i == 1) {
            for (let j = 1; j <= this.colNum; j++) {
              tableStr += columnSplit;
              tableStr += headerSplit;
            }
            tableStr += columnSplit;
            tableStr += '\n';
            continue;
          } else {
            for (let j = 1; j <= this.colNum; j++) {
              tableStr += columnSplit;
              tableStr += spaceSplit;
            }
            tableStr += columnSplit;
            tableStr += '\n';
          }
        }
        this.$parent.cm.replaceRange(tableStr, {
          line: pos.line + 1,
          ch: 0
        });
        tableStr = null;
        this.$parent.showDialog = false;
      }
    }
}
</script>
<style scoped>
</style>
