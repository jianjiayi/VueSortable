<!--
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-10 19:13:54
 * @LastEditTime: 2019-12-11 14:28:07
 -->
<template>
  <div>
    <el-collapse v-model="activeName" accordion @change="handleChange">
      <el-collapse-item v-for="(item,index) in tableData" :key="index" :title="item.title" :name="item.name">
        <el-table :data="item.subList" align="left">
          <el-table-column v-for="(v, i) in Table" :key="i" :prop="dropCol[i].prop" :label="item.v">
            <template slot-scope="scope">
              <el-button v-if="dropCol[i].prop=='companyname'" type="text" size="medium">{{scope.row[dropCol[i].prop]}}</el-button>
              <span v-else>{{scope.row[dropCol[i].prop]}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import Sortable from 'sortablejs';
import tableData from '@/assets/table_json.js';
export default {
  data() {
    return {
      activeName: '1',


      Table: [
        {
          label: '公司名称',
          prop: 'companyname'
        },
        {
          label: 'global_id',
          prop: 'global_id'
        },
        {
          label: '省',
          prop: 'address'
        }
      ],
      dropCol: [
        {
          label: '公司名称',
          prop: 'companyname'
        },
        {
          label: 'global_id',
          prop: 'global_id'
        },
        {
          label: '省',
          prop: 'address'
        }
      ],
      tableData: tableData,
    }
  },
  mounted() {
    this.initSortable();
  },
  methods: {
    handleChange(val) {
      this.activeName = val;
    },
    // 初始化拖拽
    initSortable(index){
      this.rowDrop(index);
      this.columnDrop(index);
    },
    //行拖拽
    rowDrop() {
      let _this = this;
      let TbodyArray = document.querySelectorAll('.el-table__body-wrapper tbody')
      for(let i= 0; i < TbodyArray.length; i++){
        let tbody = TbodyArray[i]
        Sortable.create(tbody, {
          sort:true,
          delay: 0,
          animation: 180,
          onEnd: evt => {
            _this.$nextTick(function() {
              const currRow = _this.tableData[i].subList.splice(evt.oldIndex, 1)[0]
              _this.tableData[i].subList.splice(evt.newIndex, 0, currRow);
            })
          },
        })
      }
    },
    //列拖拽
    columnDrop(i) {
      let _this = this;
      let TrArray = document.querySelectorAll('.el-table__header-wrapper tr')
      for(let i= 0; i < TrArray.length; i++){
        let wrapperTr = TrArray[i]
        Sortable.create(wrapperTr, {
          animation: 180,
          delay: 0,
          onEnd: evt => {
            let oldItem = _this.dropCol[evt.oldIndex]
            _this.dropCol.splice(evt.oldIndex, 1)
            _this.dropCol.splice(evt.newIndex, 0, oldItem)
          }
        })
      }
    }
  }
}
</script>
