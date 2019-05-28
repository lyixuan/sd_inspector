# 工作交接文档：

## admin后台：

目录 admin_sys/src/

模块目录介绍

:
```
.
|-- routes/  
    |-- Quality                        // 质检
    |-- Refund                            // 退费
    |-- Complaint                           // 申诉
    |-- Role                           // 角色管理
|-- selfComponent/  //自定义组件
    |-- RoleFrom                        // 角色组件
    |-- setpForm                            // 上传和删除步骤组件分割
        |-- stepInput.js                      //input输入框
        |-- stepTablet.js                         //校验失败列表
        |-- stepUpload.js                         //上传组件
        |-- stepSucess.js                         //上传成功或失败
        |-- checkResult.js                         //校验成功组件
        
 ```
 
 组件的传参在组件内部都有详细介绍 

## 小德bi和绩效：

目录 sd_bi_xiaode/src/

学分详情:
```
.
|-- components/Listview/  //listview 组件
|-- routes/Details/  
    |-- _creditDialog.js                         // 底部弹框
    |-- _creditDialog.less                            // 样式
    |-- _filter.jsx                               // 详情页过滤条件
    |-- Details.jsx                               //学分详情页面
    |-- Details.less                                // 样式
|-- routes/PercentCenter/  //个人中心
 ``` 
 这两个项目都用到了listview组件，组件介绍

* params：
* dataList: 必传，展示的数据结构
* groupName: 每个模块的字段，要是只有一个列表，可以不传
* initialListSize: 每页展示多好条数据
*
* headerParam: 传给子组件 RenderHeader
* renderHeader：页头
* renderFooter：页脚
* customRenderHeader: 组件，展示表头，默认RenderHeader
* customRenderItem: 组件，展示数据，RenderItem
* otherCpmponent: 在listView中扩展
*
* 

## ko项目热力图和柱状图部分：

目录 ko/behaviorAnalyze/components/

热力图:
```
.
|-- KoSangJi/HotImg/  
    |-- KO_detail.js                         // 业务逻辑
    |-- style.less                            // 样式
    |-- SVG.js                               // 极速app所有页面
    |-- mainSVG.js                               // 主app所有页面
 ```   
柱状图: 
```
.                                 
|-- EchartsBar/  
    |-- component/
        |-- bar_echarts.js                    // 柱状图options
        |-- titleName.js                      // 柱状图标题
        |-- titleName.less                 // 柱状图标题样式
    |-- style.less                            // 样式
    |-- index.js                             // 柱状图页面
``` 
```
model目录： ko/behaviorAnalyze/model.js   
```     
 
 
        新增页面：热力图需要新增页面的话，只需要在SVG.js中导出改页面的svg即可，导出的名字必须跟后台返回的一样，
        新增的页面需要给每个rect添加data-name=actionKeyId和class='mask'属性，tspan添加data-name=actionKeyId和class='text'属性，
        如果不是截取前几数据的情况，那直接按照上述方法做就可以了，只需改动svg，不需要改别的，
        如果是需要截取前几数据，可以模仿商城列表和ko列表页面来写，方法都有，直接调用即可
