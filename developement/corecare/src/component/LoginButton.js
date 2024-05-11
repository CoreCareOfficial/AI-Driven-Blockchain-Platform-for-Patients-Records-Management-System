import React from 'react';

const styles = {
  Button: {
    transition: '0.7s ease',
    cursor: 'pointer',
    width: '100px',
    height: '35px',
    padding: '10px',
    margin:'15px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    gap: '7px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#3146ff',
    color: '#ffffff',
    fontSize: '15px',
    fontFamily: 'Roboto',
    lineHeight: '24px',
    outline: 'none',
  },
  Icon: {
    fontSize: '21px',
    width: '21px',
    height: '21px',
    color: '#ffffff',
    fill: '#ffffff',
  },
};

const IconComponent = () => (
  <svg style={styles.Icon}  viewBox="0 0 24 24">
    <path fill="none" d="M0 0h24v24H0z">
    </path>
    <path d="M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z">
    </path>
  </svg>
);

const defaultProps = {
  label: 'Login ',
  IconComponent,
};

const LoginButton = (props) => {
  return (
    <button style={styles.Button}>
      <span>{props.label ?? defaultProps.label}</span>
      {
        props.IconComponent 
          ? <props.IconComponent style={styles.Icon} /> 
          : <defaultProps.IconComponent />
      }
    </button>
  );
};

export default LoginButton;