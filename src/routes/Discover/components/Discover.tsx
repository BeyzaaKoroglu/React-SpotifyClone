import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';

//TODO: Fix `any` types here

interface IDiscoverProps {}

// Type for image and icon
export interface ImageIcon { height: number; url: string; width: number }

export interface DataItemWithImages {
  name: string;
  images: Array<ImageIcon>;
}

export interface DataItemWithIcons {
  name: string;
  icons: Array<ImageIcon>;
}

interface IDiscoverState {
  newReleases: Array<DataItemWithImages>;
  playlists: Array<DataItemWithImages>;
  categories: Array<DataItemWithIcons>;
}

export default class Discover extends Component<IDiscoverProps, IDiscoverState> {
  constructor(props: IDiscoverProps) {
    super(props);

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  //TODO: Handle APIs
  componentDidMount() {
    const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    const authParameters ={
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
    }

    // To get access token
    fetch("https://accounts.spotify.com/api/token",authParameters )
      .then((result) => result.json())
      .then((data) => {
        const config={
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        }

        //To get "Released This Week" songs
        fetch("https://api.spotify.com/v1/browse/new-releases", config)
          .then((response) => response.json())
          .then((data) => {
            this.setState({ newReleases: data.albums.items });
          });

        //To get “Featured Playlists”
        fetch("https://api.spotify.com/v1/browse/featured-playlists", config)
          .then((response) => response.json())
          .then((data) => {
            this.setState({ playlists: data.playlists.items });
          });

        //To get “Browse genres”
        fetch("https://api.spotify.com/v1/browse/categories", config)
          .then((response) => response.json())
          .then((data) => {
            this.setState({ categories: data.categories.items });
          });
      });
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
