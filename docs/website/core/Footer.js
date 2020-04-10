/**
 * Copyright (c) Northwestern Inclusive Technology Lab
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('installation.html', this.props.language)}>
              Getting Started
            </a>
            <a href={this.docUrl('features.html', this.props.language)}>
              Extension Reference
            </a>
            <a href={this.docUrl('design.html', this.props.language)}>
              Design Docs
            </a>
            <a href={this.docUrl('code-standards.html', this.props.language)}>
              Contributing
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a href="https://groups.google.com/forum/#!forum/v11-dev">
            Mailing List
            </a>
            <a
              href="https://github.com/tommymchugh/v11/issues"
              target="_blank"
              rel="noreferrer noopener">
              Issue Tracker
            </a>
            <a href={`${this.props.config.baseUrl}leadership`}>Leadership Team</a>
            <a
              href="https://twitter.com/inclusivetechNU"
              target="_blank"
              rel="noreferrer noopener">
              Twitter
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href={`${this.props.config.baseUrl}blog`}>Blog</a>
            <a href="https://github.com/tommymchugh/v11">GitHub</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/facebook/docusaurus/stargazers"
              data-show-count="true"
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
            {this.props.config.twitterUsername && (
              <div className="social">
                <a
                  href={`https://twitter.com/${this.props.config.twitterUsername}`}
                  className="twitter-follow-button">
                  Follow @{this.props.config.twitterUsername}
                </a>
              </div>
            )}
            {this.props.config.facebookAppId && (
              <div className="social">
                <div
                  className="fb-like"
                  data-href={this.props.config.url}
                  data-colorscheme="dark"
                  data-layout="standard"
                  data-share="true"
                  data-width="225"
                  data-show-faces="false"
                />
              </div>
            )}
          </div>
        </section>

        <a
          href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=1901456"
          target="_blank"
          rel="noreferrer noopener"
          className="fbOpenSource">
          <img
            src={`${this.props.config.baseUrl}img/nsf-award-logo.svg`}
            alt="Supported By NSF Award 1901456"
            width="170"
            height="45"
          />
        </a>
        <section className="copyright">{this.props.config.copyright} <a href="https://inclusive.northwestern.edu" className="normal">Northwestern Inclusive Technology Lab</a></section>
      </footer>
    );
  }
}

module.exports = Footer;
