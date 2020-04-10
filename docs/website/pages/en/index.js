/**
 * Copyright (c) Northwestern Inclusive Technology Lab
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <p className="preview">preview</p>
          <PromoSection>
            <Button href={docUrl('installation.html')}>Get Started</Button>
            <Button href={docUrl('doc4.html')}>Read The Spec</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          className="contentSections"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const About = () => (
      <Block id="try">
        {[
          {
            content:
              'We love the web. Using the document object model and JavaScript, new and experienced developers can create and interact with magical experiences, no matter their device. So why can’t the same be true for interacting with the systems, interfaces, and devices that power so many accessibility and inclusive technologies? Customizable input devices, accessibility UI APIs, and interacting with screen readers often use platform-dependent and low-level programming interfaces which may, or may not, be well-documented.<br><br>That changes with V11, a small, fast, and efficient JavaScript(ish) engine to embed in, and power, the next generation of A11Y technologies. You can finally work with accessibility interfaces in a language that treats your system like the web. Just like the web, it\'s easy to learn for beginners, and powerful enough for the most experienced developers.',
            image: `${baseUrl}img/undraw_building_blocks_n0nc.svg`,
            imageAlign: 'left',
            title: 'Building Cross-Platform A11Y Tools As Easy As<br>' +
              '<span style="color: #a093c2;font-family: monospace;font-weight: 600;">&lt;h1&gt;Hello, World&lt;/h1&gt;</span>',
          },
        ]}
      </Block>
    );

    const JavaScriptIsh = () => (
      <Block id="jsish">
        {[
          {
            content:
              'No, V11 isn’t a Javascript library or framework. We are implementing a version of the JavaScript language, specifically designed to enable an easy to use interface for creating and interacting with desktop and mobile inclusive technologies, without worrying about cross-platform and low-level apis and services. <br><br>We follow ECMAScript standards, so all of your existing JavaScript code can run in V11 (see **[dynamic scripting](docs/reference-static#avoiding-type-checking)**). However, V11 does provide additional features and syntactical sugar designed to create a more inclusive programming language for developers with different sets of abilities, and to better support V11\'s specific use cases. So import those existing JS libraries, and use cool V11 features, too!',
            image: `${baseUrl}img/undraw_react_y7wq.svg`,
            imageAlign: 'right',
            title: 'Wait! What Do You Mean By JavaScript(ish)?',
          },
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Working With V11?</h2>
          <p className="long">We might be a group of researchers in Evanston, but we want to share V11 across the globe.<br /><br />
             We've set up V11 as an open source project to encourage those with bold and exciting new ideas
             in inclusive technology to work with us to bring them to life.
             Together, we can redefine development and make inclusive and universal applications the norm.<br />
             <a href={docUrl('doc4.html')} className="bold">Come Contribute!</a></p>
          <div className="logos">{showcase}</div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer homePage">
          <About />
          <JavaScriptIsh />
          <Showcase />
        </div>
      </div>
    );
  }
}

module.exports = Index;
