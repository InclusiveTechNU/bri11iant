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

function Leadership(props) {
  const {config: siteConfig, language = ''} = props;
  const {baseUrl, docsUrl} = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  const faculty = [
    {
      image: `${baseUrl}img/leadership/piper.jpg`,
      imageAlt: 'Picture of Anne Marie Piper',
      imageAlign: 'top',
      imageLink: 'https://ampiper.soc.northwestern.edu/',
      content: '<span>Principal Investigator</span><br>Associate Professor, Northwestern University',
      title: 'Anne Marie Piper',
    },
    {
      image: `${baseUrl}img/leadership/pardo.jpg`,
      imageAlt: 'Picture of Bryan Pardo',
      imageAlign: 'top',
      imageLink: 'https://users.cs.northwestern.edu/~pardo/',
      content: '<span>Co-Principal Investigator</span><br>Associate Professor, Northwestern University',
      title: 'Bryan Pardo',
    },
    {
      image: `${baseUrl}img/leadership/gergle.jpg`,
      imageAlt: 'Picture of Darren Gergle',
      imageAlign: 'top',
      imageLink: 'https://dgergle.soc.northwestern.edu/',
      content: '<span>Co-Principal Investigator</span><br>Professor, Northwestern University',
      title: 'Darren Gergle',
    },
  ];

  const leads = [
    {
      image: `${baseUrl}img/leadership/mchugh.jpg`,
      imageAlt: 'Picture of Tommy McHugh',
      imageAlign: 'top',
      imageLink: 'https://github.com/tommymchugh/',
      content: `<span>Undergraduate Student</span><br>Computer Science & Learning Sciences, Northwestern University`,
      title: 'Tommy McHugh',
    },
    {
      image: `${baseUrl}img/leadership/saha.jpg`,
      imageAlt: 'Picture of Abir Saha',
      imageAlign: 'top',
      imageLink: 'https://abirsaha056.wordpress.com/',
      content: '<span>Ph.D. Student</span><br>Technology and Social Behavior, Northwestern University',
      title: 'Abir Saha',
    }
  ];

  const collaborators = [
    {
      image: `${baseUrl}img/leadership/wiig.jpg`,
      imageAlt: 'Picture of Jack Wiig',
      imageAlign: 'top',
      imageLink: 'https://github.com/jhwiig',
      content: `<span>Undergraduate Student</span><br>Computer Science, Northwestern University`,
      title: 'Jack Wiig',
    },
    {
      image: `${baseUrl}img/leadership/barth.jpg`,
      imageAlt: 'Picture of Cooper Barth',
      imageAlign: 'top',
      imageLink: 'https://github.com/cooperbarth',
      content: '<span>Undergraduate Student</span><br>Computer Science, Northwestern University',
      title: 'Cooper Barth',
    }
  ];

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Leadership Team</h1>
          </header>
          <p>The V11 project is maintained by a dedicated group of faculty and student researchers at Northwestern University.
             Our work is suported by a grant from the <a href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=1901456">National Science Foundation</a>.</p>
          <h2>Faculty</h2>
          <GridBlock contents={faculty} className="profiles" align="center" layout="threeColumn" />
          <h2>Project Leads</h2>
          <GridBlock contents={leads} className="profiles" align="center" layout="twoColumn" />
          <h2>Contributors and Collaborators</h2>
          <GridBlock contents={collaborators} className="profiles" align="center" layout="twoColumn" />
        </div>
      </Container>
    </div>
  );
}

module.exports = Leadership;
