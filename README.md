# StepManager

![StepManager](https://img.shields.io/badge/step-manager-v1.0.0-ff004b.svg?style=for-the-badge) [![TravisCI](https://img.shields.io/travis/com/yoriiis/step-manager/master?style=for-the-badge)](https://travis-ci.com/yoriiis/step-manager) ![Node.js](https://img.shields.io/node/v/step-manager?style=for-the-badge)

StepManager is a library to create multiple steps with navigation, validation and saving datas with hook functions.

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

The project includes also examples of StepManager implementation in the directory `./examples/`.

## Basic usage

StepManager is compose by `Manager` to build the core to manage steps and `Steps` to create new step with hook functions.

### Steps

First, create the steps container with a selector easily accessible.

```html
<div id="steps"></div>
```

Next, we will create steps. For our example, two steps `People` and `Planet`.

```javascript
// step-people.js
import { Steps } from "step-manager";

export default class StepPeople extends Steps {
    id = "step-people";
    route = "people";
    selector = ".step-people";

    canTheStepBeDisplayed() {
        return {
            canBeDisplayed: true,
            fallbackRoute: null
        };
    }

    getTemplate() {
        return '<div class="step-people"></div>';
    }

    getDatasFromStep() {
        return {};
    }
}
```

```javascript
// step-planet.js
import { Steps } from "step-manager";

export default class StepPlanet extends Steps {
    id = "step-planet";
    route = "planet";
    selector = ".step-planet";

    canTheStepBeDisplayed() {
        return {
            canBeDisplayed: true,
            fallbackRoute: null
        };
    }

    getTemplate() {
        return '<div class="step-planet"></div>';
    }

    getDatasFromStep() {
        return {};
    }
}
```

#### Class fields

The inheritance of the `Steps` class expose following fields:

```javascript
{
    id: '',
    route: '',
    selector: '',
    canTheStepBeDisplayed () {},
    getTemplate () {},
    getDatasFromStep () {}
}
```

* `id` - {String} - Unique identifier of the step
* `route` - {String} - Route for step navigation (hash)
* `selector` - {String} - CSS selector to identify the step (match in the template)
* `canTheStepBeDisplayed` - {Function} - Function to add display condition for the step
* `getTemplate` - {Function} - Function to return the template
* `getDatasFromStep` - {Function} - Function to extract step datas to save

### Manager

Then, we will create the manager to manage all these steps.

```javascript
import StepPeople from "step-people";
import StepPlanet from "step-planet";
import { Manager } from "step-manager";

const manager = new Manager({
    element: document.querySelector("#steps"),
    datas: {},
    steps: [StepPeople, StepPlanet],
    onEnded: datas => {
        // All steps are ended
        // Datas are available with the `datas` variable
        // Call the function to save datas as you want
    }
});
manager.init();
```

#### Options

You can pass configuration options to `Manager`. Example below show all default values.

```javascript
{
    element: null,
    datas: {},
    steps: [],
    cacheMethod: 'sessionStorage',
    keyBrowserStorage: 'stepManager',
    onAction: () => {}
}
```

* `element` - {HTMLElement} - DOM element reference
* `datas` - {Object} - JSON datas for the Manager
* `steps` - {Array} - Array of step instances
* `cacheMethod` - {String} - Browser storage method
* `keyBrowserStorage` - {String} - Browser storage key
* `onAction` - {Function} - Function executes on all steps ended

## Available methods

The `Manager` exposes following functions.

### Init

The `init()` function initialize the manager and build steps

```javascript
manager.init();
```

### Destroy

The `destroy()` function destroy event listeners and HTML.

```javascript
manager.destroy();
```

## Licence

StepManager and his documentation are licensed under the [MIT License](http://opensource.org/licenses/MIT).

Created with ♥ by [@yoriiis](http://github.com/yoriiis).
