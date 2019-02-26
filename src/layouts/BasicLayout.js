import React from 'react';

function BasicLayout(props) {
  return (
    <div style={{border:'1px solid red',padding: '10px'}}>
      我是 basiclayout
      { props.children }
    </div>
  );
}

export default BasicLayout;
