# Bri11iant
[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/InclusiveTechNU/Bri11iant/blob/master/LICENSE)
[![Northwestern HCI](https://img.shields.io/badge/NU-HCI-blueviolet)](https://hci.northwestern.edu/)
[![NSF Grant 1901456](https://img.shields.io/badge/NSF-1901456-informational)](https://www.nsf.gov/awardsearch/showAward?AWD_ID=1901456)

**Made with :purple_heart: in Evanston, IL at the [Northwestern Inclusive Technology Lab](http://inclusive.northwestern.edu/)**

Bri11iant is a Language Extension for scaffolding accessible web development. Bri11iant fits right into your text editor, suggesting improvements to your HTML and CSS code in order to improve the accessibility of your websites.

Unlike other projects, Bri11iant reads the HTML files you are working on, loads in any CSS files specified in <link> tags, and runs any specified JS scripts using [JSDOM](https://github.com/jsdom/jsdom) in order to mock the render tree that would be created by a browser. This allows the language extension to provide more nuanced feedback that depends on parent-to-child element relationships and page layout.

[List of Accessibility Standards Supported by Bri11iant](https://github.com/InclusiveTechNU/A11yGrammar)

## Compatibility

### Text Editors

- [Visual Studio Code](https://code.visualstudio.com)
- More on the way!

### Languages

- HTML / CSS
- [React.js](https://reactjs.org) (Coming Soon)
- [React Native](https://facebook.github.io/react-native/) (Coming Soon)
- [Vue.js](https://vuejs.org) (Coming Soon)

## Run

### Visual Studio Code

1. Download the Bri11iant extension within the VSCode application.
2. Install and enable the application

### Local (VSCode)

First, clone the repository:

```unix
git clone https://github.com/InclusiveTechNU/Bri11iant.git
cd Bri11iant
```

Then, run these commands to install dependencies and compile the project:

```unix
npm install
npm run postinstall
npm start
```

Open Visual Studio Code. Press ⌘ + Shift + B to build the project. Then, press F5 to run the project in debug mode. A new VSCode window should pop up with the language client and server running.

This project is built and maintained by the [Northwestern University Inclusive Technology Lab](https://inclusive.northwestern.edu) and is funded by [NSF Grant 1901456](https://www.nsf.gov/awardsearch/showAward?AWD_ID=1901456).
