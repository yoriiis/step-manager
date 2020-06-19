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

The project includes also examples of `StepManager` implementation in the directory `./examples/`.

## How it works

`StepManager` is composed by the `Manager` to build the core and manage steps and `Steps` to create new step with hook functions.

### Steps

First, create the steps container with a selector easily accessible.

```html
<div id="steps"></div>
```

Next, we will create steps. For our example, two steps `People` and `Planet`. All steps needs inheritance from `Steps` to access hook functions.

__step-people.js__

```js
import { Steps } from "step-manager";

export default class StepPeople extends Steps {
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

    getDatasFromStep () {
        return {};
    }

    getStepDatasToRender () {
        return {
            title: 'people'
        };
    }
}
```

__step-planet.js__

```js
import { Steps } from "step-manager";

export default class StepPlanet extends Steps {
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

    getDatasFromStep () {
        return {};
    }

    getStepDatasToRender () {
        return {
            title: 'planet'
        };
    }
}
```

The inheritance of the `Steps` class expose following class fields:

#### `id`

`String`

The route identifier, an alias to used inside the app instead of the route.

#### `route`

`String`

Route for step navigation. `StepManager` use hash for steps navigation.

#### `selector`

`String`

The CSS selector use in the template to identify the step.

#### `optionalStep`

`Boolean`

Declare if the step is optional and can be submit without validation. The parameter is a public instance fields like `route` or `selector`.

#### `canTheStepBeDisplayed`

`Function`

The function for display conditions of the step. The function need to return an object with the following keys:

```javascript
{
    canBeDisplayed: true // Boolean
}
```

If the step can't be displayed, the manager will redirect to the first route. The optional key `fallbackRoute` allows to override this behavior.

```javascript
{
    canBeDisplayed: true, // Boolean
    fallbackRoute: 'people' // String
}
```

#### `getTemplate`

`Function`

The function return the template of the step. Step can access the manager options with `this.options`.

#### `getDatasFromStep`

`Function`

The function allows to extract step datas to save in the browser storage and persist during the navigation.

#### `getStepDatasToRender`

`Function`

TODO

### Manager

Now steps are created, we will create the manager to manage all these steps.

```javascript
import StepPeople from "step-people";
import StepPlanet from "step-planet";
import { Manager } from "step-manager";

const manager = new Manager({
    element: document.querySelector("#steps"),
    datas: {},
    steps: [StepPeople, StepPlanet],
    onComplete: datas => {
        // All steps are completed
        // All steps datas are available with the `datas` parameter
        // Call the function to save datas as you want
    },
    onChange: action => {
        // TODO
    }
});

manager.init();
```

Manager fields are explained below.

#### `element`

`HTMLElement`

The HTML element where the manager will build the steps.

#### `datas`

`Object`

JSON datas for all steps.

If steps are build with dynamic contents from an API for example, the manager expose the `datas` fields inside steps with `this.options.datas`, from the `render` function.

See SWAPI example in the `./examples/` directory for the full implementation.

#### `cacheMethod`

`String`

The browser storage method used by the manager (`sessionStorage` or `localStorage`).

#### `keyBrowserStorage`

`String`

The unique storages key to store datas in the browser storage.

#### `onComplete`

`Function`

The function is called when all steps are completed. The function expose as parameter `datas` variable with all steps datas combined in a object.

Feel free to call an API to save datas, redirect the user or whatever.

#### `onChange`

`Function`

TODO

## Available methods

The `Manager` exposes following functions.

### Init

The `init()` function initialize the manager and build steps.

```javascript
manager.init();
```

### Destroy

The `destroy()` function destroy event listeners and HTML.

```javascript
manager.destroy();
```

## Licence

`StepManager` and his documentation are licensed under the [MIT License](http://opensource.org/licenses/MIT).

Created with ♥ by [@yoriiis](http://github.com/yoriiis).
