import React from 'react';

function BasicLayout(props) {
  return (
    <div>
      我是 basiclayout
      { props.children }
    </div>
  );
}

export default BasicLayout;
