import React from 'react';

const styles = {
  Text: {
    color: '#ffffff',
    fontSize: '50px',
    fontFamily: 'Caladea',
    fontWeight: '500',
    fontStyle: 'italic',
    lineHeight: '42px',
    padding: '10px',
  },
};

const defaultProps = {
  text: 'Core-Care',
};

const Logo = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Logo;