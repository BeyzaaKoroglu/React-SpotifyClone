import React from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Player from '../components/Player';

class CoreLayout extends React.Component {
  render = () => (
    <div className="main">
      <SideBar />
      <div className="main__content">
        <Header />
        <div className="main__content__child">
          {this.props.children}
        </div>
      </div>
      <Player />
    </div>
  );
}

export default CoreLayout;
