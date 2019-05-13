const actionId='$-1';
export function dealSankeyData({ sankey, pvuvData,currentPage }) {
  /*
  * 桑吉接口组合，处理数据
  * 1、取前十；按节点点击量，同一层级取前十。第一层加上全局跳出总共算前十
  * 2、增加全局跳出
  * */
  const { upPage={},downPage1={},downPage2={}  } = sankey;

  const upPageData = upPageDeal(upPage,currentPage+actionId);
  const downPage1Data = downPage1Deal(downPage1,currentPage+actionId,pvuvData);
  const downPage2Data = downPage2Deal(downPage2,currentPage+actionId,pvuvData);
  const downPageData = downPageDeal(downPage1Data,downPage2Data);

  return { upPageData, downPageData };
}


function topTen(pageList,n) {
  // 排序，取前n个
  if (!pageList) return []
  pageList.sort(function(a, b) {
    if (Number(a.pageView) > Number(b.pageView)) {
      return -1;
    } else if (a < b) {
      return 1;
    } else {
      return 0;
    }
  });
  const newList = pageList.slice(0, n);

  return newList;
}

function upPageDeal(upPage,currentPage) {
  let upPageData = {
    node:[],
    links: [].concat(upPage.links)
  };
  upPage.node && upPage.node.forEach((v,i)=>{
    if (v.id === currentPage) {
      upPageData.node.push(upPage.node.splice(i,1));
    }
  });
  upPageData.node = upPageData.node.concat(topTen(upPage.node,10));
  return upPageData;
}

function downPage1Deal(downPage1,currentPage,pvuvData) {
  let pageData = {
    node:[],
    links:[].concat(downPage1.links)
  };
  const jumpOutNode = {// 跳出全局
    id:'jumpOut#',
    name:'跳出全局',
    pageView:pvuvData.bounceTimes,
    proportion:pvuvData.bounceTimePercent,
  };
  const jumpOutLinks = {
    source:currentPage,
    target:'jumpOut#',
    pageView:pvuvData.bounceTimes,
    proportion:pvuvData.bounceTimePercent,
  };
  downPage1.node && downPage1.node.forEach((v,i)=>{
    if (v.id === currentPage) {
      pageData.node.push(downPage1.node.splice(i,1));
    }
  });
  pageData.node = pageData.node.concat(topTen(downPage1.node,9));
  pageData.node.push(jumpOutNode);
  pageData.links.push(jumpOutLinks);
  return pageData;
}

function downPage2Deal(downPage2) {
  let pageData = {
    node:[],
    links:[].concat(downPage2.links)
  };
  const listNode = [];
  downPage2.node && downPage2.node.forEach((v1)=>{
    downPage2.links.forEach((v2)=>{
      if (v1.id === v2.target) {
        listNode.push(v1);
      }
    });
  });
  pageData.node = topTen(listNode,10);
  return  pageData;
}

function downPageDeal(downPage1Data,downPage2Data) {
  // 合并下游层级
  let pageData = {
    node:[],
    links:[]
  };
  pageData.node = downPage1Data.node.concat(downPage2Data.node);
  pageData.links = downPage1Data.links.concat(downPage2Data.links);

  return pageData;
}
