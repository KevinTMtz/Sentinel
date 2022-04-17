interface objectWithKeyStr {
  [key: string]: any;
}

export const styles: objectWithKeyStr = {
  layoutDiv: {
    maxWidth: '1500px',
    margin: '0px auto 16px auto',
    padding: '0 24px',
    '@media (max-width: 500px)': {
      padding: '0 16px',
    },
  },
  displayRows: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  displayRowsButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
};
