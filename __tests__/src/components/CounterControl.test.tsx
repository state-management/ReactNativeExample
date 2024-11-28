import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import CounterControl from '../../../src/components/CounterControl.tsx';
import { StateMachine } from '@state-management/simple-state-machine';
import {setupMockStateMachine} from "@state-management/state-machine-react/tests";
import {DecrementCounterCommand, IncrementCounterCommand} from '../../../src/commands/CounterCommands.ts';

jest.mock('@state-management/simple-state-machine');

describe('CounterControl', () => {
    let mockStateMachine: any;

    beforeEach(() => {
        // Reset mock before each test
        mockStateMachine = setupMockStateMachine({});

        (StateMachine.getInstance as jest.Mock).mockReturnValue(mockStateMachine);
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

        expect(mockStateMachine.dispatch).toHaveBeenCalledWith(
            expect.any(IncrementCounterCommand)
        );
    });

    it('dispatches DecrementCounterCommand when Decrement button is pressed', () => {
        const { getByText } = render(<CounterControl />);

        fireEvent.press(getByText('Decrement'));

        expect(mockStateMachine.dispatch).toHaveBeenCalledWith(
            expect.any(DecrementCounterCommand)
        );
    });
});
