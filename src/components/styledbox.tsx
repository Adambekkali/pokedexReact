import React from 'react';

type StyledBoxProps = {
  children: React.ReactNode;
};

export const StyledBox: React.FC<StyledBoxProps> = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
        padding: '28px 36px',
        fontSize: '1rem',
        fontWeight: 500,
        color: '#2d3436',
        border: '1px solid #f1f2f6',
        minWidth: '160px',
        maxWidth: '200px',
        margin: '12px',
        textAlign: 'left',
        lineHeight: 1.6,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        transition: 'box-shadow 0.3s ease, transform 0.2s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.08)');
        (e.currentTarget.style.transform = 'translateY(-2px)');
      }}
      onMouseLeave={(e) => {
        (e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.04)');
        (e.currentTarget.style.transform = 'translateY(0)');
      }}
    >
      {children}
    </div>
  );
};
