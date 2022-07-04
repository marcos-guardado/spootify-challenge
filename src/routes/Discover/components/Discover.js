import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";
import {
  getCategories,
  getFeaturedPlaylist,
  getNewReleases,
} from "../../../common/utils/requestMaker";

export default class Discover extends Component {
  constructor() {
    super();
    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData() {
    getNewReleases().then(({ albums: { items } }) => {
      this.setState({ newReleases: items });
    });
    getFeaturedPlaylist().then(({ playlists: { items } }) => {
      this.setState({ playlists: items });
    });
    getCategories().then(({ categories: { items } }) => {
      this.setState({ categories: items });
    });
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
