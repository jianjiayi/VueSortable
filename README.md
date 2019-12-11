<!--
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-10 19:13:54
 * @LastEditTime: 2019-12-11 15:05:11
 -->
# vue-sortable

#### 主要功能描述
 - 页面内存在多个table，并且每个table都支持拖拽排序


# 预览图
##### 抱歉没有制作gif动态图，直接了一张图
![简单截图](https://github.com/jianjiayi/VueSortable/blob/master/static/20191211144621.png)

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

#### 应陌生人需求，也是第一次使用sortable排序真有些懵逼，简单记录下心得

看了几篇blog觉得使用起来很简单，但是这个需求有些我草.....(需求：页面中有一个Collapse 折叠面板，点击每个面板都能展现一个table,并且每个table都支持拖拽排序)。
开始我尝试了点击展开面板时候动态创建一个sortable，没错，这个方法不错，也很好使。
但是再次去打开已被打开过的面板时，里面的table拖拽出问题了，那问题出现砸哪里了呢？（原因：不能多次对一个table使用sortable.create()这个方法！！！！！）。
遂放弃了。开始了新的路程-------这就是上面的代码由来。我也不知道自己写了什么，反正就要写点。


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
