import React from 'react';

const Loading = ({ error }) => {
    if (error) {
      return 'Some error occured, Please try again later';
    } else {
      return <div style={{ textAlign: 'center' }}><h3>Loading...</h3></div>;
    }
}

export default Loading;