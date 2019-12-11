<!--
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-10 19:13:54
 * @LastEditTime: 2019-12-11 16:45:28
 -->
# vue-sortable

#### 主要功能描述
 - 页面内存在多个table，并且每个table都支持拖拽排序


# 预览图
##### 抱歉没有制作gif动态图，直接了一张图
![简单截图](https://github.com/jianjiayi/VueSortable/blob/master/static/20191211144621.png)

# 核心代码
```
<template>
  <div>
    <el-collapse v-model="activeName" accordion @change="handleChange">
      <el-collapse-item
        v-for="(item,index) in tableData"
        :key="index"
        :title="item.title"
        :name="item.name"
      >
        <el-table :data="item.subList" align="left">
          <el-table-column v-for="(v, i) in Table" :key="i" :prop="dropCol[i].prop" :label="item.v">
            <template slot-scope="scope">
              <el-button
                v-if="dropCol[i].prop=='companyname'"
                type="text"
                size="medium"
              >{{scope.row[dropCol[i].prop]}}</el-button>
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
                    prop: 'companyname',
                },
                {
                    label: 'global_id',
                    prop: 'global_id',
                },
                {
                    label: '省',
                    prop: 'address',
                },
            ],
            dropCol: [
                {
                    label: '公司名称',
                    prop: 'companyname',
                },
                {
                    label: 'global_id',
                    prop: 'global_id',
                },
                {
                    label: '省',
                    prop: 'address',
                },
            ],
            tableData: tableData,
        };
    },
    mounted() {
        this.initSortable();
    },
    methods: {
        handleChange(val) {
            this.activeName = val;
        },
        // 初始化拖拽
        initSortable() {
            this.rowDrop();
            this.columnDrop();
        },
        //行拖拽
        rowDrop() {
            let _this = this;
            let TbodyArray = document.querySelectorAll('.el-table__body-wrapper tbody');
            for (let i = 0; i < TbodyArray.length; i++) {
                let tbody = TbodyArray[i];
                Sortable.create(tbody, {
                    sort: true,
                    delay: 0,
                    animation: 180,
                    onEnd: evt => {
                        let currRow = _this.tableData[i].subList.splice(evt.oldIndex, 1)[0];
                        _this.tableData[i].subList.splice(evt.newIndex, 0, currRow);
                        let newSubListArray = _this.tableData[i].subList.slice(0);
                        _this.tableData[i].subList = [];
                        _this.$nextTick(function() {
                            _this.tableData[i].subList = newSubListArray;
                        });
                    },
                });
            }
        },
        //列拖拽
        columnDrop(i) {
            let _this = this;
            let TrArray = document.querySelectorAll('.el-table__header-wrapper tr');
            for (let i = 0; i < TrArray.length; i++) {
                let wrapperTr = TrArray[i];
                Sortable.create(wrapperTr, {
                    animation: 180,
                    delay: 0,
                    onEnd: evt => {
                        let oldItem = _this.dropCol[evt.oldIndex];
                        _this.dropCol.splice(evt.oldIndex, 1);
                        _this.dropCol.splice(evt.newIndex, 0, oldItem);
                    },
                });
            }
        },
    },
};
</script>

```

#### 应陌生人需求，也是第一次使用sortable排序真有些懵逼，简单记录下心得

看了几篇blog觉得使用起来很简单，但是这个需求有些我草.....(需求：页面中有一个Collapse 折叠面板，点击每个面板都能展现一个table,并且每个table都支持拖拽排序)。
开始我尝试了点击展开面板时候动态创建一个sortable，没错，这个方法不错，也很好使。

但是再次去打开已被打开过的面板时，里面的table拖拽出问题了，那问题出现砸哪里了呢？（原因：不能多次对一个table使用sortable.create()这个方法！！！！！）。

遂放弃了。开始了新的路程-------这就是上面的代码由来。我也不知道自己写了什么，反正就要写点。

####  拖拽操作排序的bug修改
> 在这需求当中，拖拽操作了数组[1,2,3,4]后，理想状态应该是[2,1,3,4]。我打印了下拖拽结果和理想的一样，但是页面却没有变化依旧是[1,2,3,4]。数组变化了，但是有渲染。

我想这个问题应该是sortable内部的问题....

解决办法来自segmentfault的一篇文章，先用一个数据深拷贝数据，这里使用了 slice 方法，然后置空，最后在 $nextTick 中赋值深拷贝出来的数组值。最后可以了。

我猜测有两个，数组的长度不变，只是数组的长度变化， Vue检测不到，对于这个猜想，很容易就被自己推翻了，毕竟试了一下，并不会这样的。

那就可能是 sortable.js 的问题了。


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
