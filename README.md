# Shop example for Android and iOS using React Native

CAUTION: This code is for fun. Now it isn't stable, isn't production ready and sometimes is ugly

## Motivation

* try [modern tech stack](https://github.com/grab/front-end-guide)
* share code between platforms as much as possible
* use great tooling (IDE , Debuggers, DevTools, linters, code formatters)
* front-end - JS on any platform (React), common back-end. GraphQL - to bind both

## Long term idea

Create shop example for ANY platform with shared front-end and single common back-end

- [ ] web ([React](https://facebook.github.io/react/)).
- [x] mobile web ([React](https://facebook.github.io/react/)). [Project link](https://github.com/ArtemSerga/react-shop)
- [x] mobile app for Android and iOS ([React Native](https://facebook.github.io/react-native/)). [Project link](https://github.com/ArtemSerga/react-native-shop)
- [ ] desktop app for Windows, MacOS and Linux ([React + Electron](https://electron.atom.io/))
- [ ] cross-platform monorepo with shared code from projects mentioned above using [ReactXP](https://github.com/Microsoft/reactxp) or [Lerna](https://github.com/lerna/lerna)

Smells like future front-end!

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/-5VkI0dpHek/0.jpg)](https://www.youtube.com/watch?v=-5VkI0dpHek)

## Demo

### Android

1. Scan QR-code below using your phone to download app file
1. When downloaded - open it to install app

<img src="./README/android_qr_code.png" width="300" />

### Using [Expo](https://expo.io/@aserga/react-native-shop) (Android,  iOS)

1. Install on your phone *Expo* client app ([Google Play link](https://play.google.com/store/apps/details?id=host.exp.exponent), [iTunes link](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8))
1. Run *Expo* client app and press "Scan QR Code" to scan code below

<img src="./README/expo_qr_code.png" width="300"/>

## Current tech stack

### Front-end

* [TypeScript](https://www.typescriptlang.org/)
* [React Native](https://facebook.github.io/react-native/)
* [React Navigation](https://reactnavigation.org/)
* [Redux](http://redux.js.org/) to manage app's state
* [Apollo Client](http://dev.apollodata.com/) to manage data from GraphQL API
* [Ant Design Mobile](https://mobile.ant.design/) for UI

### Back-end

* [GraphQL](http://graphql.org/) server using [Python Graphene](http://graphene-python.org/)

## Related projects

* [react-shop](https://github.com/ArtemSerga/react-shop) - same shop example, tech stack and back-end, but for Mobile WEB platform
