<img  align="center" alt="headerIMG" src="./assets/ASCM-Logov2.png" target="_blank" />
<br/>
<br/>

This read me is for Developing on this repo. If you are looking for documentation on a package or a widget please go [here](https://mendixlabs.github.io/app-services-components/)

## 📂 Basic Folder Structure

```bash
|-- apps
    |
    |-- native-widgets
    |    |- * Native Widgets
    |
    |-- utils
    |   |- * Helper Functions/Published Packages
    |
    |-- web-widgets
    |   |- * Web Widgets
```

## 💅 Initial Setup

After cloning the repo, in the Root file run `yarn` - That will install the all the dependencies

The repos uses [Turborepo](https://turborepo.org/) under the hood, the migration from [lerna](https://github.com/lerna/lerna) to Terborepo is still WIP

---

## ⛑️ Helper Scripts

Remove `node_modules` from packages - `yarn clean:packages`

Remove ALL `node_modules` Hoisted and non Hoisted - `yarn clean:all` _mac and linux only_

---

## 🐝 Known Errors

🐛 Error: "A Local Dependency I installed is giving an type error "No Type Declaration found""

👍🏽 Fix: This might be an VSCode error. Close and re-open

---

## ➕ Adding an existing Repo to the Mono Repo

Basic command Structure

```bash
git subtree add --prefix=packages/[PATH/PROJECT_NAME] [REPO URL] [BRANCH NAME]


# Example:

git subtree add --prefix=packages/web-widgets/dad  git://github.com/ahwelgemoed/drag-and-drop-mendix-widget.git main
```

This will Create a folder called `dad` in `packages/web-widgets`. It will merge git history from `ahwelgemoed/drag-and-drop-mendix-widget` at the current `main` branch

---

## 📦 Versioning and Release your Package

TBA

## 💻 Versioning and Release your Widget

This packages uses a Github action to build and maintain versioning with lerna version.

For details on the Action see [here](https://github.com/ahwelgemoed/widget-build-monorepo-action)

---

## ✨ Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->

<table>
  <tr>
    <td align="center"><a href="https://github.com/justinroy-mx"><img src="https://avatars.githubusercontent.com/u/81809936?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Justin Roy Tamaela</b></sub></a><br />🤔</td>
  </tr>

</table>

## ✨ Past Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->

<table>
  <tr>
    <td align="center"><a href="https://github.com/j3lte"><img src="https://avatars.githubusercontent.com/u/14937393?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jelte Lagendijk</b></sub></a><br />🤔💻⚠️📖💡🚧</td>
    <td align="center"><a href="https://github.com/ahwelgemoed"><img src="https://avatars.githubusercontent.com/u/29273599?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Arno Welgemoed</b></sub></a><br />🤔💻⚠️📖💡🚧</td>
  </tr>

</table>

### Want/Need

- Licence
- First Pull - Docs
- Look into Build Script and release (semi done!)
