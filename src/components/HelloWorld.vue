<template>
  <el-table :data="Data" align="left">
    <el-table-column v-for="(item, index) in Table" :key="index" :prop="dropCol[index].prop" :label="item.label">
      <template slot-scope="scope">
        <el-button v-if="dropCol[index].prop=='companyname'" type="text" size="medium">{{scope.row[dropCol[index].prop]}}</el-button>
        <span v-else>{{scope.row[dropCol[index].prop]}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Sortable from 'sortablejs'
export default {
  data() {
    return {
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
      Data: [
        {
          id: '1',
          companyname: '公司名称1',
          global_id: '2606615561',
          address: '广东'
        },
        {
          id: '2',
          companyname: '公司名称1',
          global_id: '2594631498',
          address: '浙江'
        },
        {
          id: '3',
          companyname: '公司名称1',
          global_id: '2586480635',
          address: '浙江'
        },
      ]
    }
  },
  mounted() {
    this.rowDrop()
    this.columnDrop()
  },
  methods: {
    //行拖拽
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.Data.splice(oldIndex, 1)[0]
          _this.Data.splice(newIndex, 0, currRow)
        }
      })
    },
    //列拖拽
    columnDrop() {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: evt => {
          const oldItem = this.dropCol[evt.oldIndex]
          this.dropCol.splice(evt.oldIndex, 1)
          this.dropCol.splice(evt.newIndex, 0, oldItem)
        }
      })
    }
  }
}
</script>
