# StepManager

![StepManager](https://img.shields.io/badge/step--manager-v1.2.0-ff004b.svg?style=for-the-badge) [![TravisCI](https://img.shields.io/travis/com/yoriiis/step-manager/master?style=for-the-badge)](https://travis-ci.com/yoriiis/step-manager) [![Coverage Status](https://img.shields.io/coveralls/github/yoriiis/step-manager?style=for-the-badge)](https://coveralls.io/github/yoriiis/step-manager?branch=master)  ![Node.js](https://img.shields.io/node/v/step-manager?style=for-the-badge)

`StepManager` is a library to create **flexible** and **robust** multiple **steps** navigation with hash, **validations**, browser **storage** and **hook** functions.

## Installation

The library is available as the `step-manager` package name on [npm](https://www.npmjs.com/package/step-manager).

```bash
npm i --save-dev step-manager
```

```bash
yarn add --dev step-manager
```

## Demo

Online demo is available on [yoriiis.github.io/step-manager](https://yoriiis.github.io/step-manager)

The project includes also the example of the `StepManager` implementation in the directory `./example/`.

## How it works

`StepManager` is composed by the `Manager` to manage the steps and the `Steps` to create steps.

### Steps

First, create the steps container with a selector easily accessible.

```html
<div id="steps"></div>
```

Next, we will create the steps `People` and `Planet` for our example. All the steps needs inheritance from `Steps` to access hook functions.

__step-people.js__

```js
import { Steps } from "step-manager";

export default class StepPeople extends Steps {
    id = "people";
    route = "people";
    selector = ".step-people";

    canTheStepBeDisplayed () {
        return {
            canBeDisplayed: true
        };
    }

    getTemplate (datas) {
        return `<div class="step-people">${datas.title}</div>`;
    }

    getStepDatasToRender () {
        return {
            title: 'people'
        };
    }

    getDatasFromStep () {
        return {};
    }
}
```

__step-planet.js__

```js
import { Steps } from "step-manager";

export default class StepPlanet extends Steps {
    id = "planet";
    route = "planet";
    selector = ".step-planet";

    canTheStepBeDisplayed () {
        return {
            canBeDisplayed: true
        };
    }

    getTemplate (datas) {
        return `<div class="step-planet">${datas.planet}</div>`;
    }

    getStepDatasToRender () {
        return {
            title: 'planet'
        };
    }

    getDatasFromStep () {
        return {};
    }
}
```

The manager exposed his options to each steps, they can access it with `this.options`.
The inheritance of the `Steps` class exposes following the class fields:

#### `id`

`String`

The route identifier, an alias to used inside the app instead of the route.

_The parameter is a public instance fields._

#### `route`

`String`

The route for the step navigation. `StepManager` use hash for steps navigation (`#people`).

_The parameter is a public instance fields._

#### `selector`

`String`

The CSS selector used in the template to identify the step.

_The parameter is a public instance fields._

#### `optionalStep`

`Boolean`

Declare if the step is optional and can be submit without validation. The validation is set on the `canTheStepBeDisplayed` function.

_The parameter is a public instance fields and is optional._

#### `canTheStepBeDisplayed`

`Function`

The function for the display conditions of the step. The function need to return an object with the following keys:

```javascript
return {
    canBeDisplayed: true // Boolean
}
```

If the step can't be displayed, the manager will redirect to the route of the first step depending of the steps order. The optional key `fallbackRoute` allows to override this behavior.

```javascript
return {
    canBeDisplayed: true, // Boolean
    fallbackRoute: 'people' // String
}
```

#### `getTemplate`

`Function`

The function returns the HTML template of the step and exposes the return of the `getStepDatasToRender` function as parameter.

#### `getStepDatasToRender`

`Function`

The function returns the data for the template.

#### `getDatasFromStep`

`Function`

The function allows to extract step datas to save in the browser storage and persist during the navigation.

### Manager

Now the steps are created, we will create the Manager to manage all these steps.

```javascript
import StepPeople from "./step-people";
import StepPlanet from "./step-planet";
import { Manager } from "step-manager";

const manager = new Manager({
    element: document.querySelector("#steps"),
    datas: {},
    steps: [StepPeople, StepPlanet],
    onComplete: datas => {},
    onChange: action => {}
});

manager.init();
```

The Manager fields are explained below.

#### `element`

`HTMLElement`

The HTML element where the manager will build the steps.

#### `datas`

`Object`

The datas for all the steps stored in a JSON. The object key need to match with the route id declare in each steps.

If the steps are build with dynamic contents from an API for example, the manager exposes the `datas` fields inside the steps with `this.options.datas`, from the `render` function.

See the SWAPI example in the `./example/` directory for the full implementation.

#### `steps`

`Array`

The array of the steps.

#### `cacheMethod`

`String`

The browser storage method used by the manager (`sessionStorage` or `localStorage`).

#### `keyBrowserStorage`

`String`

The unique storage key to store the datas in the browser storage.

#### `onComplete`

`Function`

The function is called when all the steps are completed. The function exposes as parameter the `datas` variable with all the steps datas combined in a object. The key corresponds to each route id.

You can call an API to save the datas or redirect the user.

#### `onChange`

`Function -> Promise`

The function allows to add a specific behavior during the step changes. The function is called 2 times per step change, on the `destroy` event and on the `create` event. The function exposes the `action` variable as parameter according to the state (`destroy` or `create`).

**The function need to return a Promise resolved as the example below**. The Promise allows to add any behavior during the step changes, like a transition or an XHR.

```js
new Manager({
    onChange: action => {
        return new Promise(resolve => {
            // Add here the scripts to be executed on the step changes
            // The setTimeout is an example to add a fake delay during the change of steps
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }
});
```

See the SWAPI example in the `./example/` directory for the transition behavior on the step changes.

## Available methods

The `Manager` exposes following functions.

### Init

The `init()` function initialize the manager and build the steps.

```javascript
manager.init();
```

### Destroy

The `destroy()` function destroy the event listeners and the HTML.

```javascript
manager.destroy();
```

### isReverseNavigation

The `isReverseNavigation()` function check if the navigation is reversed. The function can be called inside the `onChange` function.

```javascript
manager.Router.isReverseNavigation()
```

### getRouteId

The `getRouteId()` function returns the `routeId` from the `route`.

```javascript
manager.Router.getRouteId()
```

### currentRoute

The `currentRoute` property returns the current `route`.

```javascript
manager.Router.currentRoute
```

## Licence

`StepManager` and his documentation are licensed under the [MIT License](http://opensource.org/licenses/MIT).

Created with ♥ by [@yoriiis](http://github.com/yoriiis).
