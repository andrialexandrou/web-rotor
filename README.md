# webpage rotor browser extension

## Install

1. Clone or download this repo.  
1. Navigate to [chrome://extensions](chrome://extensions/).
1. Flip on "Developer Mode" in the upper right-hand corner.
1. Select "Load unpacked".
1. Choose the chrome subdirectory. You'll see a `manifest.json`.

## Usage

1. Navigate to a website of your choosing
1. <kbd>Option</kbd> + <kbd>1</kbd> to open popup view of headings
1. Keyboard navigate to your heading of choice and hit enter to focus.

## About

The semantic layer of the web is often obscured by the painted canvas. 

This browser assists in understanding the contents of a page and improves keyboard-only navigation to areas of interest.

For now, this browser extension is exclusively supported for Chrome.

## Development

1. Clone or download this repo.  
1. Install `node_modules` and run dev script to generate the extension.
    ```
    npm install
    npm run dev:chrome
    ````
1. Navigate to [chrome://extensions](chrome://extensions/).
1. Flip on "Developer Mode" in the upper right-hand corner.
1. Select "Load unpacked".
1. Choose the `./extension/chrome` subdirectory. You'll see a `manifest.json`.

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

