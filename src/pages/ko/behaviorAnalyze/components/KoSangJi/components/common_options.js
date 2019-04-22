export const seriesConfig = {
  type: 'sankey',
  top:1,
  bottom:1,
  nodeWidth: 10,
  layout:'none',
  layoutIterations:0,
  draggable:false,  // 不可拖动节点
  focusNodeAdjacency: true,   // hover 高亮
  lineStyle: {
    normal: {   // 流量样式
      color: 'source',
      curveness: 0.5
    }
  },
  itemStyle: {
    normal: {    // 节点样式
      borderWidth: 1,
      borderColor: '#000'
    }
  },
};

export const Config = {

};

export const sangjiColor = ['#FB7F29','#D4292F', '#2DBDCD', '#747474', '#2479B1','#D3292F'];
