# webpage rotor browser extension

## Install

1. Download `web-rotor.zip` from this repo.  
1. Unzip.
1. Navigate to [chrome://extensions](chrome://extensions/).
1. Enable "Developer Mode" in the upper right-hand corner.
1. Activate "Load unpacked".
1. Upload the unzipped directory.

## Usage

1. Navigate to a website of your choosing
1. <kbd>Option</kbd> + <kbd>1</kbd> to open popup view of headings
1. Keyboard navigate to your heading of choice and hit enter to focus.

![Usage demo of the chrome extension, in which I open the popup on a Wikipedia article, down arrow to a heading, hit enter, the popup closes, and the page scrolls to the heading I selected.](https://user-images.githubusercontent.com/14981214/179573535-a5a7b971-9bb8-4d14-96d7-4ecce910117c.gif)

## About

The semantic layer of the web is often obscured by the painted canvas. 

This browser extension assists in understanding the contents of a page and improves keyboard-only navigation to areas of interest.

For now, this browser extension is exclusively supported for Chrome.

## Development

1. Clone or download this repo.  
1. Install `node_modules` and run dev script to generate the extension.
    ```bash
    npm install
    npm run dev:chrome
    ````
1. Navigate to [chrome://extensions](chrome://extensions/).
1. Enable "Developer Mode" in the upper right-hand corner.
1. Activate "Load unpacked".
1. Choose the `./extension/chrome` subdirectory.

## Build

See the npm scripts for your build options here.
```bash
npm run
```

Find the zipped folder (likely in the `./extension` directory), move to root, and rename to `web-rotor.zip`.

### A note on the development workflow:

This browser extension starter uses webpack and leverages a hot reloading server. However, you may still need to reload the extension in `chrome://extensions/` depending on where you are making changes. 

## Credits

<a href="https://www.flaticon.com/free-icons/relationship">Extension icon</a> created by Freepik - Flaticon.

The [browser extension template](https://github.com/abhijithvijayan/web-extension-starter) was made by <a href="https://twitter.com/_abhijithv">@abhijithvijayan</a>.

### Features of the template

- Cross Browser Support (Web-Extensions API)
- Browser Tailored Manifest generation
- Automatic build on code changes
- Auto packs browser specific build files
- SASS styling
- TypeScript by default
- ES6 modules support
- React UI Library by default
- Smart reload

