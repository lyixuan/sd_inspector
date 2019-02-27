import Link from 'umi/link';
export default function() {
  return (
    <div style={{border:"1px solid yellow",padding: '10px'}}>
      我是detail下的页面
      我是detail下的页面
      我是detail下的页面
      我是detail下的页面
      我是detail下的页面
      我是detail下的页面
      我是detail下的页面
      <br/>
      <Link to="/m1/survey"> 概览 </Link>
      <br/>
      <Link to="/doc"> 文档 </Link>
    </div>
  );
}
