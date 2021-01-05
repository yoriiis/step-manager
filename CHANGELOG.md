# CHANGELOG

## 1.2.2

### New features

* Render the template in HTML string with template literals for exemple or by HTMLElement with JSX.

## 1.2.1

### New features

* Add the `ignoredHash` on the manager to ignored hashs

## 1.2.0

### New features

* Add the `getStepDatasToRender` function on the Steps
* Add the `getRouteId` function on the Router
* Add the `onChange` hook promise function on the Manager options
* Add the `async/await` parameter on the `createStep` and the `destroyStep` functions
* Add the `getStepDatasToRender` on the steps example
* Add a transition effects on the step changes event on the example

### Updates

* Replace the route key by the route id key (alias) in the `steps` and `stepsOrder` variables (prevent conflict with route name usage as object key)
* Update all the unit tests after the reworks
* Update the `routeId` on the unit tests (the identifier is now different from the route)
* Update the `ESLint` and `MarkdownLint` config
* Update the `README` and the `CHANGELOG`
* Replace `Travis` by `GitHub Actions`
* Update the linter (`Stylelint`, `Prettier`)
* Update the README

### Removes

* Remove the destroy calls on the step complete function. Move them on the `destroy` function of the Manager

## 1.1.0

### Updates

* Add Jest tests for `manager`, `router`, `cache-manager` and `steps` files
* Bug fixes

## 1.0.0

### New features

* First release of `StepManager`
