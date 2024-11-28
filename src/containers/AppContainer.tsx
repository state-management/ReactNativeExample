import React, { useEffect } from 'react';
import { View } from 'react-native';
import { StateMachine } from 'simple-state-machine';
import { SetInitialCounterCommand } from '../commands/SetInitialCounterCommand.ts';
import CounterDisplay from '../components/CounterDisplay.tsx';
import CounterControl from '../components/CounterControl.tsx';

const AppContainer: React.FC = () => {
    useEffect(() => {
        const stateMachine = StateMachine.getInstance();
        stateMachine.dispatch(new SetInitialCounterCommand(0));
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <CounterDisplay />
            <CounterControl />
        </View>
    );
};

export default AppContainer;
