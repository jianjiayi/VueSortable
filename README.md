<!--
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-10 19:13:54
 * @LastEditTime: 2019-12-11 14:50:36
 -->
# vue-sortable

#### 主要功能描述
 - 页面内存在多个table，并且每个table都支持拖拽排序


# 预览图
##### 抱歉没有制作gif动态图，直接了一张图

# 核心代码
```
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
```

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
