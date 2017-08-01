# ShopCRM

## Install & Start

### Run project locally

1. Clone the project git repository
1. `cd` to project dir
1. Install globally `yarn` and `react-native`
1. Install `react-native-debugger` using command `brew update && brew cask install react-native-debugger`
1. Install packages by running in project root `yarn`
1. Run TypeScript compiler (in VSCode `CMD+F9` or `yarn run watch`)
1. In separate console run `yarn start` in project directory. It should always be runned.

### How to run iOS simulator

* Open XCode
* In XCode `File -> Open` open directory `<project_dir>/ios/ReactNativeShop.xcodeproj`
* Press play icon (Build and then run current schema)

## Configure [Visual Studio Code](https://code.visualstudio.com/) (optional)

### Sync project settings, keybindings and extensions

1. Install extension  [Visual Studio Code Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
    * Press `cmd` + `P` and pass `ext install code-settings-sync`
1. Generate your GitHub "Personal acess token" with gist scope using this [manual](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync#steps-to-get-the-github-key)
1. Download settings, keybindings and extensions
    * press `cmd`+`P` and run action `Sync : Download Settings`.
    * past you "Personal acess token" value and then use Gist public ID: `968c3e5d7bb21f44ac9c8f7638bc4618`
