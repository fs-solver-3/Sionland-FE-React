import React, { Component, Fragment } from "react";
import ERC20Mint from "../components/token/ERC20/ERC20mint";
import About from "../components/about/about";
import Features from "../components/features/features";
import Steps from "../components/steps/steps";
import Tokens from "../components/token/tokens";
import Subscribe from "../components/subscribe/subscribe";
import MainSlider from "../components/mainSlider/mainSlider";
import Teams from "../components/team/team";
import Blogs from "../components/blog/blog";

class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <div className="wd_scroll_wrap">
          <MainSlider />
          {/* <Currency /> */}
        </div>
        <ERC20Mint />
        <About fill="#f6f6ff" />
        <Features />
        {/* <Projects /> */}
        <Steps fill="#f6f6ff" />
        {/* <Roadmap fill="#f6f6ff" /> */}
        <div className="wd_scroll_wrap">
          <Tokens />
          <Teams fill="#f6f6ff" />
        </div>
        <Blogs />
        <div className="wd_scroll_wrap">
          {/* <PressMedia /> */}
          <Subscribe />
        </div>
      </Fragment>
    );
  }
}

export default HomePage;
