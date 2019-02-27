import Link from 'umi/link';
export default function() {
  return (
    <div  style={{border:"1px solid blue",padding: '10px'}}>
      我是survey路由下的页面
      <br/>
      <Link to="/m1/details"> details </Link>

      <br/>
      <Link to="/doc"> 文档 </Link>
    </div>
  );
}
