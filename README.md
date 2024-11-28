# React Native example using State Machine

This is an example project demonstrating how to use the
[**state-machine-react**](https://www.npmjs.com/package/@state-management/state-machine-react).
library with React Native. The project showcases:

- Subscribing to state changes using the `fromState` hook.
- Dispatching commands using the `useDispatcher` hook.
- Unit testing React components with `setupMockStateMachine`.

The [**state-machine-react**](https://www.npmjs.com/package/@state-management/state-machine-react) is a React-specific wrapper for the core library, [simple-state-machine](https://www.npmjs.com/package/@state-management/simple-state-machine).


## Features
- **State Management**: Powered by `@state-management/state-machine-react`, this project integrates a simple yet powerful state management system.
- **React Hooks**: Includes examples of the `fromState` and `useDispatcher` hooks for managing state in React Native app.
- **Unit Testing**: Demonstrates how to mock the state machine using `setupMockStateMachine` for testing.


## Prerequisites
Make sure you have the following installed:
- Node.js (16.x or later)
- npm (8.x or later)


## Getting Started

### 1. Install Dependencies
Clone the repository and install the required dependencies:
```bash
npm install
```


### 2. Run the unit tests
```bash
npm run test
```

### 3. Run The Application
#### Start the Metro Server

To start Metro, run the following command from the _root_ folder of this project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

#### Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

#### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

#### For iOS

```bash
# for the first time run, install pods, not required for subsequent runs.
cd ios
pod install --repo-update
cd ..

# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

