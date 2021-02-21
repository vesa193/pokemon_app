import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';
import { Navbar } from '../navbar/navbar'
import './layout.css'

export const Layout = ({ children, className, rest }) => {
  const state = useSelector(state => state.common)
  const { isLoading } = state

  return (
    <div className={`layout ${ className || "" }`}>
      { isLoading ? <CircularProgress disableShrink className="layout-spinner" />
        : null }
      <Navbar />
      { children }
    </div>
  );
}
