import React from 'react';
import { render } from '@testing-library/react-native';
import AppContainer from '../../../src/containers/AppContainer.tsx';
import { StateMachine } from 'simple-state-machine';
import { counterKey } from '../../../src/constants/stateKeys.ts';
import {SetInitialCounterCommand} from "../../../src/commands/SetInitialCounterCommand.ts";

jest.mock('simple-state-machine', () => {
    const actualModule = jest.requireActual('simple-state-machine');
    const mockStateMachineInstance = {
        dispatch: jest.fn(),
        onChange: jest.fn(),
    };

    return {
        ...actualModule,
        StateMachine: {
            getInstance: jest.fn(() => mockStateMachineInstance),
        },
    };
});

jest.mock('../../../src/components/CounterDisplay.tsx', () => {
    const { Text } = require('react-native');

    return () => <Text>Counter Value: 0</Text>;
});

jest.mock('../../../src/components/CounterControl.tsx', () => {
    const { View, Button } = require('react-native');

    return ({ onIncrement }: any) => (
        <View>
            <Button title="Increment" onPress={onIncrement} />
        </View>
    );
});

describe('Container', () => {
    let mockStateMachineInstance: any;

    beforeEach(() => {
        mockStateMachineInstance = StateMachine.getInstance();
        jest.clearAllMocks();
    });

    it('renders CounterDisplay and CounterControl components and sets initial value for counter', async () => {
        const mockOnChangeCallback = jest.fn();
        mockStateMachineInstance.onChange.mockImplementation((key, callback) => {
            if (key === counterKey) {
                mockOnChangeCallback.mockImplementation(callback);
                return { unsubscribe: jest.fn() }; // Return an unsubscribe mock
            }
        });

        const { getByText } = render(<AppContainer />);

        expect(getByText('Counter Value: 0')).toBeTruthy();
        expect(getByText('Increment')).toBeTruthy();

        expect(mockStateMachineInstance.dispatch).toHaveBeenCalledWith(expect.any(SetInitialCounterCommand));
    });
});
