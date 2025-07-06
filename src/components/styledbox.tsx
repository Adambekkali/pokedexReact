import React from 'react';

type StyledBoxProps = {
  children: React.ReactNode;
};
export const StyledBox: React.FC<StyledBoxProps> = ({ children }) => {
  return (

        <div
            style={{
                display: 'inline-block',
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                padding: '9px 16px',
                fontSize: '1.2rem',
                fontWeight: 600,
                color: '#30336b',
                border: '2px solid #dcdde1',
                minWidth: 'fit-content',
                textAlign: 'center',
                marginRight: '8px',
                verticalAlign: 'middle',
            }}
        >
            {children}
        </div>
  );
};
