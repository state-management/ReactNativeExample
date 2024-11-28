import React, {act} from 'react';
import { render, waitFor } from '@testing-library/react-native';
import CounterDisplay from '../../../src/components/CounterDisplay.tsx';
import { StateMachine } from 'simple-state-machine';
import { counterKey } from '../../../src/constants/stateKeys.ts';

jest.mock('simple-state-machine', () => {
    const actualModule = jest.requireActual('simple-state-machine');
    const mockStateMachineInstance = {
        onChange: jest.fn(() => ({
            unsubscribe: jest.fn()
        })),
    };

    return {
        ...actualModule,
        StateMachine: {
            getInstance: jest.fn(() => mockStateMachineInstance),
        },
    };
});

describe('CounterDisplay', () => {
    let mockStateMachineInstance: any;

    beforeEach(() => {
        mockStateMachineInstance = StateMachine.getInstance();
        jest.clearAllMocks();
    });

    it('renders initial counter value of 0', () => {
        const { getByText } = render(<CounterDisplay />);
        expect(getByText('Counter Value: 0')).toBeTruthy();
    });

    it('updates counter value when state changes', async () => {
        // Mock the onChange function to simulate state changes
        const mockOnChangeCallback = jest.fn();
        mockStateMachineInstance.onChange.mockImplementation((key, callback) => {
            if (key === counterKey) {
                mockOnChangeCallback.mockImplementation(callback);
                return { unsubscribe: jest.fn() };
            }
        });

        const { getByText } = render(<CounterDisplay />);

        await act(async () => {
            mockOnChangeCallback(5);
        });

        await waitFor(() => {
            expect(getByText('Counter Value: 5')).toBeTruthy();
        });
    });
});
