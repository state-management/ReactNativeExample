import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import CounterControl from '../../../src/components/CounterControl.tsx';
import {StateMachine} from 'simple-state-machine';
import {DecrementCounterCommand, IncrementCounterCommand} from '../../../src/commands/CounterCommands.ts';

jest.mock('simple-state-machine', () => {
    const actual = jest.requireActual('simple-state-machine');
    const stateMachineInstance = {
        dispatch: jest.fn(),
    };
    return {
        ...actual,
        StateMachine: {
            getInstance: jest.fn(() => stateMachineInstance),
        },
    };
});

describe('CounterControl', () => {
    let stateMachineInstance: any;

    beforeEach(() => {
        // Reset mock before each test
        stateMachineInstance = StateMachine.getInstance();
        jest.clearAllMocks();
    });

    it('renders Increment and Decrement buttons', () => {
        const { getByText } = render(<CounterControl />);
        expect(getByText('Increment')).toBeTruthy();
        expect(getByText('Decrement')).toBeTruthy();
    });

    it('dispatches IncrementCounterCommand when Increment button is pressed', () => {
        const { getByText } = render(<CounterControl />);

        fireEvent.press(getByText('Increment'));

        expect(stateMachineInstance.dispatch).toHaveBeenCalledWith(
            expect.any(IncrementCounterCommand)
        );
    });

    it('dispatches DecrementCounterCommand when Decrement button is pressed', () => {
        const { getByText } = render(<CounterControl />);

        fireEvent.press(getByText('Decrement'));

        expect(stateMachineInstance.dispatch).toHaveBeenCalledWith(
            expect.any(DecrementCounterCommand)
        );
    });
});
