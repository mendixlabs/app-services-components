# App Services Components

## 📂 Basic Folder Structure

```bash
|-- packages
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

## 💅🏽 Initial Setup

After cloning the repo, in the Root file run `yarn` - That will install the all the dependencies

`npx lerna bootstrap` is also an option but has not been tested.

---

## Adding Dependency

```bash
npx lerna add PACKAGE-TO-ADD --scope=PACKAGE-TO-ADD-IT-TOO

# Example

npx lerna add @app-services-components/usedomlocation --scope=draganddropwidget
```

**Note** This works for local or hosted packages

---

## ⛑️ Helper Scripts

Remove `node_modules` from packages - `yarn clean:packages`

Remove ALL `node_modules` - `yarn clean:all`

---

## 🐝 Known Errors

🐛 Error: "A Local Dependency I installed is giving an type error "No Type Declaration found""

👍🏽 Fix: This might be an VSCode error. Close and re-open

---

## ➕ Adding an exsisting Repo to the Mono Repo

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

TBA

---

### Still need doing We want/need

- Licence
- First Pull - Docs
- Look into Build Script and release
