export const globalStyles = `
  :root {
    --space: 24px;
    --borderRadius: 8px;
  }
  *, *::after, *::before {
    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
  }
  body, html {
    font-family: 'Inter', sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-padding-top: 80px;
  }
  body {
    height: 100vh;
    background-color: #fafafa;
  }
  
`;

export const container = {
  maxWidth: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '1048px',
  paddingLeft: 'var(--space)',
  paddingRight: 'var(--space)',
};
