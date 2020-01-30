# Contributing to Bri11iant

Bri11iant is an *open-source* library created by researchers at the [Northwestern University Inclusive Technology Lab](https://inclusive.northwestern.edu) under NSF 1901456.

Feel free to submit PRs to this repo or to our [standards repository](https://github.com/InclusiveTechNU/A11yGrammar)!

## Build and Run

### Visual Studio Code

First, clone the repository:

```unix
git clone https://github.com/InclusiveTechNU/Bri11iant.git
```

Then, in the root directory, run these commands to install dependencies:

```unix
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..
npm run compile
```

Open Visual Studio Code. Press ⌘ + Shift + B to build the project. Then, press F5 to run the project in debug mode. A new VSCode window should pop up with the language client and server running.
