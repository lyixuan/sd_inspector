const actionId='$-1';
const detail1="majordetail";
const detail2="kogoodsdetail";

export function dealSankeyData({ sankey, pvuvData,currentPage }) {
  /*
  * 桑吉接口组合，处理数据
  * 1、取前十；按节点点击量，同一层级取前十。第一层加上全局跳出总共算前十
  * 2、增加全局跳出
  * */
  const { upPage={},downPage1={},downPage2={}  } = sankey;
  let upPageData = {}
  let downPage1Data = {};

  if (currentPage.indexOf(detail1)>-1||currentPage.indexOf(detail2)>-1) {
    upPageData = upPageDealDetail(upPage,currentPage);
  } else {
    upPageData = upPageDeal(upPage,currentPage+actionId);
  }

  if (currentPage.indexOf(detail1)>-1||currentPage.indexOf(detail2)>-1) {
    downPage1Data = downPage1DealDetail(upPage,currentPage,pvuvData);
  } else {
    downPage1Data = downPage1Deal(downPage1,currentPage+actionId,pvuvData);
  }

  const downPage2Data = downPage2Deal(downPage2,downPage1);
  const downPageData = downPageDeal(downPage1Data,downPage2Data);
  console.log('upPageData',upPageData)
  console.log('downPageData',downPageData)
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
      upPageData.node=upPage.node.splice(i,1)
    }
  });
  upPageData.node = upPageData.node.concat(topTen(upPage.node,10));
  return upPageData;
}

function upPageDealDetail(upPage,currentPage) {
  let upPageData = {
    node:[],
    links: [].concat(upPage.links)
  };

  upPage.node && upPage.node.forEach((v,i)=>{
    if (v.id.indexOf(currentPage)>-1) {
      console.log('v.id',v.id)
      if (upPageData.node.length===0) {
        upPageData.node[0]=upPage.node.splice(i,1)[0];
        upPageData.node[0].id=currentPage+actionId;
      } else {
        const arr = upPage.node.splice(i,1);
        upPageData.node[0].pageView+=arr[0].pageView;
        upPageData.node[0].proportion+=arr[0].proportion;
      }
      console.log(upPageData.node)
    }
  });
  upPageData.node = upPageData.node.concat(topTen(upPage.node,10));
  upPageData.links.forEach((v)=>{
    if(v.target.indexOf(currentPage)>-1){
      v.target = currentPage+actionId;
    }
  });
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
    proportion:pvuvData.bounceTimePercent.slice(0,pvuvData.bounceTimePercent.length-1)/100,
  };
  const jumpOutLinks = {
    source:currentPage,
    target:'jumpOut#',
    flowValue:pvuvData.bounceTimes,
    proportion:pvuvData.bounceTimePercent.slice(0,pvuvData.bounceTimePercent.length-1)/100,
  };
  downPage1.node && downPage1.node.forEach((v,i)=>{
    if (v.id === currentPage) {
      pageData.node=downPage1.node.splice(i,1);
    }
  });
  pageData.node = pageData.node.concat(topTen(downPage1.node,9));
  pageData.node.push(jumpOutNode);
  pageData.links.push(jumpOutLinks);
  return pageData;
}

function downPage1DealDetail(downPage1,currentPage,pvuvData) {
  let pageData = {
    node:[],
    links:[].concat(downPage1.links)
  };
  const jumpOutNode = {// 跳出全局
    id:'jumpOut#',
    name:'跳出全局',
    pageView:pvuvData.bounceTimes,
    proportion:pvuvData.bounceTimePercent.slice(0,pvuvData.bounceTimePercent.length-1)/100,
  };
  const jumpOutLinks = {
    source:currentPage+actionId,
    target:'jumpOut#',
    flowValue:pvuvData.bounceTimes,
    proportion:pvuvData.bounceTimePercent.slice(0,pvuvData.bounceTimePercent.length-1)/100,
  };
  downPage1.node && downPage1.node.forEach((v,i)=>{
    if (v.id.indexOf(currentPage)>-1) {
      if (pageData.node.length===0) {
        pageData.node[0]=downPage1.node.splice(i,1)[0];
        pageData.node[0].id=currentPage+actionId;
      } else {
        const arr = downPage1.node.splice(i,1);
        pageData.node[0].pageView+=arr[0].pageView;
        pageData.node[0].proportion+=arr[0].proportion;
      }
    }
  });
  pageData.node = pageData.node.concat(topTen(downPage1.node,9));
  pageData.node.push(jumpOutNode);
  pageData.links.push(jumpOutLinks);
  pageData.links.forEach((v)=>{
    if(v.source.indexOf(currentPage)>-1){
      v.source = currentPage+actionId;
    }
  });
  return pageData;
}

function downPage2Deal(downPage2,downPage1) {
  let pageData = {
    node:[],
    links:[].concat(downPage2.links)
  };
    downPage1.node.forEach((v)=>{
      for (let i = downPage2.node.length-1; i >= 0;i--) {
        if (downPage2.node[i].id === v.id) {
          downPage2.node.splice(i,1)
        }
      }
    });

  pageData.node = topTen(downPage2.node,10);
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

  // 去重node
  // const obj = {};
  // pageData.node.forEach((v)=>{
  //   if (!obj[v.id]) {
  //     obj[v.id] = v;
  //   }
  // });
  // Object.keys(obj).forEach((key) => {
  //   pageData.node.push(obj[key]);
  // });
  return pageData;
}
