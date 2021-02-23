import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/layout/layout';


const NotFound = () => {

  
  return (
    <Layout>
      <div className="not-found">
        <h3>NOT FOUND 404</h3>
      </div>
    </Layout>
  );
}
 
export default NotFound;