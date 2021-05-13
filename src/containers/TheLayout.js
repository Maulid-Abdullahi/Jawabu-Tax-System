import React from 'react';
import { TheContent, TheFooter, TheHeader, TheSidebar } from './index';


function TheLayout() {
  return (
      <div className="c-app c-default-layout">
        <TheSidebar/>
        <div className="c-wrapper">
          <TheHeader/>
          <div className="c-body">
            <TheContent/>
          </div>
          <TheFooter/>
        </div>
      </div>
  );
}

export default TheLayout;
