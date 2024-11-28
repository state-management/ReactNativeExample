import React, {act} from 'react';
import { render, waitFor } from '@testing-library/react-native';
import CounterDisplay from '../../../src/components/CounterDisplay.tsx';
import { StateMachine } from '@state-management/simple-state-machine';
import {setupMockStateMachine} from "@state-management/state-machine-react/tests";
import { counterKey } from '../../../src/constants/stateKeys.ts';

jest.mock('@state-management/simple-state-machine');

describe('CounterDisplay', () => {
    let mockStateMachine: any;

    beforeEach(() => {
        // Reset mock before each test
        mockStateMachine = setupMockStateMachine({});

        (StateMachine.getInstance as jest.Mock).mockReturnValue(mockStateMachine);
        jest.clearAllMocks();
    });

    it('renders initial counter value of 0', () => {
        const { getByText } = render(<CounterDisplay />);
        expect(getByText('Counter Value: 0')).toBeTruthy();
    });

    it('updates counter value when state changes', async () => {
        // Mock the onChange function to simulate state changes
        const mockOnChangeCallback = jest.fn();
        mockStateMachine.onChange.mockImplementation((key, callback) => {
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
