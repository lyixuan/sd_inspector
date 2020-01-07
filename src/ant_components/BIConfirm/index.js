import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './style.less'

export const destroyFns = [];

const IS_REACT_16 = !!ReactDOM.createPortal;
const closeTimeout = (duration = 3000, close) => {
  setTimeout(() => {
    close();
  }, duration);
}
const ConfirmDialog = (props) => {
  const { content, duration, close } = props;
  closeTimeout(duration, close);
  return (
    <div className={styles.BIConfirm}>
        <div>
          {content}
        </div>
    </div>
  );
};

export default function BIConfirm(config) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  // eslint-disable-next-line no-use-before-define
  let currentConfig = { 
    ...config, 
    close, 
    // visible: true 
  };

  function destroy(...args) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    const triggerCancel = args.some(param => param && param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel(...args);
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      // eslint-disable-next-line no-use-before-define
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  function render(props) {
    ReactDOM.render(<ConfirmDialog {...props} getContainer={false} />, div);
  }

  function close(...args) {

    currentConfig = {
      ...currentConfig,
      // visible: false,
      afterClose: destroy.bind(this, ...args),
    };
    if (IS_REACT_16) {
      render(currentConfig);
    } else {
      destroy(...args);
    }
    destroy(...args);
  }

  function update(newConfig) {
    currentConfig = {
      ...currentConfig,
      ...newConfig,
    };
    render(currentConfig);
  }

  render(currentConfig);

  destroyFns.push(close);

  return {
    destroy: close,
    update,
  };
}
