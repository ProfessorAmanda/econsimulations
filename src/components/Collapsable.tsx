import Collapse from 'react-collapse';
import { presets } from 'react-motion';
import PropTypes from 'prop-types';

export default function Collapsable({ children } : { children: React.ReactElement }) {
  return (
    <div>
      {/*//@ts-ignore*/}
      <Collapse
        style={{
          margin: 'auto',
          width: '100%',
          textAlign: 'center',
          backgroundColor: 'rgba(255,255,255,0.4)',
          marginBottom: '1em'
        }}
        isOpened
        springConfig={{ ...presets.gentle }}
      >
        <div style={{ height: '100%', padding: '2em' }}>
          <div style={{ padding: '2em' }}>
            {children}
          </div>
        </div>
      </Collapse>
    </div>
  );
}

Collapsable.propTypes = {
  children: PropTypes.element.isRequired,
}
