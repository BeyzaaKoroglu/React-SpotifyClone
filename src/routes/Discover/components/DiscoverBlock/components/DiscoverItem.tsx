import React from 'react';
import { ImageIcon } from '../../Discover';
import '../styles/_discover-item.scss';

//TODO: Fix types here
interface IDiscoverItemProps {
  name: string;
  images: Array<ImageIcon>;
}

export default class DiscoverItem extends React.Component<IDiscoverItemProps> {
  render = () => {
    const { images, name } = this.props;
    return (
      <div className="discover-item animate__animated animate__fadeIn">
        <div
          className="discover-item__art"
          style={{ backgroundImage: `url(${images[0].url})` }}
        />
        <p className="discover-item__title">{name}</p>
      </div>
    );
  }
}
