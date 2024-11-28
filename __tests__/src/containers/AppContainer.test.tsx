import React from 'react';
import { render } from '@testing-library/react-native';
import AppContainer from '../../../src/containers/AppContainer.tsx';
import { StateMachine } from '@state-management/simple-state-machine';
import {setupMockStateMachine} from "@state-management/state-machine-react/tests";
import { counterKey } from '../../../src/constants/stateKeys.ts';
import {SetInitialCounterCommand} from "../../../src/commands/SetInitialCounterCommand.ts";

jest.mock('@state-management/simple-state-machine');

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
    let mockStateMachine: any;

    beforeEach(() => {
        // Reset mock before each test
        mockStateMachine = setupMockStateMachine({});

        (StateMachine.getInstance as jest.Mock).mockReturnValue(mockStateMachine);
        jest.clearAllMocks();
    });

    it('renders CounterDisplay and CounterControl components and sets initial value for counter', async () => {
        const mockOnChangeCallback = jest.fn();
        mockStateMachine.onChange.mockImplementation((key, callback) => {
            if (key === counterKey) {
                mockOnChangeCallback.mockImplementation(callback);
                return { unsubscribe: jest.fn() }; // Return an unsubscribe mock
            }
        });

        const { getByText } = render(<AppContainer />);

        expect(getByText('Counter Value: 0')).toBeTruthy();
        expect(getByText('Increment')).toBeTruthy();

        expect(mockStateMachine.dispatch).toHaveBeenCalledWith(expect.any(SetInitialCounterCommand));
    });
});
