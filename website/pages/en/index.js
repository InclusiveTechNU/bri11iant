/**
 * Copyright (c) Northwestern Inclusive Technology Lab
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

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
          <PromoSection>
            <Button href={docUrl('tutorial.html')}>Get Started</Button>
            <Button href={docUrl('docs.html')}>Read The Docs</Button>
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

    const Intro = () => (
      <Block id="intro">
        {[
          {
            content:
              `We love the web. The goal of Bri11iant is to help make the internet a more inclusive place by providing 
              developers with in-editor support for vital accessibility standards and inclusive design principles. It's 
              often hard to tell what is and isn't an accessibility problem just from looking at your code, and it's even 
              harder sometimes to understand <i>why</i> these issues are harmful. Moreover, there are many ways to make 
              the design of a website more inclusive past simply following WCAG standards.<br><br>That's where Bri11iant comes
              in. As you're writing HTML (more languages coming soon!), Bri11iant can diagnose and report parts of your 
              website that could be modified in order to provide your users a more inclusive experience.`,
            image: `${baseUrl}img/bri11iant-logo.svg`,
            imageAlign: 'left',
            title: 'Helping Developers Code with Accessibility in Mind'
          },
        ]}
      </Block>
    );

    const About = () => (
      <Block id="about">
        {[
          {
            content:
              `Bri11iant is smart. Instead of just parsing the HTML file you're working on, Bri11iant can use the links to your CSS 
              and Javascript files to construct a <i>virtual render tree</i> of your website and provide a more complex analysis 
              without you ever needing to launch your browser. This lets Bri11iant give suggestions about inclusive design 
              princibles like color contrast, dynamic content handling, and multi-modal content presentation.<br><br>We pride 
              ourselves on being . We want this website to be able to act as a comprehensive resource for learning about accessibility 
              and inclusive design. Alongside the Bri11iant extension, we provide extensive documentation, articles, and blog posts about 
              accessibility, inclusive design, and the A11y community.`,
            image: `${baseUrl}img/demo.png`,
            imageAlign: 'right',
            title: 'Why Bri11iant?'
          }
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

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Working With Bri11iant?</h2>
          <p className="long">We might be a group of researchers in Evanston, but we want to share Bri11iant across the globe.<br /><br />
             We've set up Bri11iant as an <a href="https://github.com/InclusiveTechNU/bri11iant">open source project</a>to encourage those 
             with bold and exciting new ideas in inclusive technology to work with us to bring them to life.
             Together, we can redefine development and make inclusive and universal websites and applications the norm.<br />
          </p>
          <a href={docUrl('contributing.html')} className="bold">Come Contribute!</a>
          <div className="logos">{showcase}</div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer homePage">
          <Intro />
          <About />
          <Showcase />
        </div>
      </div>
    );
  }
}

module.exports = Index;
