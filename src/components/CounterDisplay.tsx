import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { StateMachine } from 'simple-state-machine';
import { counterKey } from '../constants/stateKeys';

const CounterDisplay: React.FC = () => {
    const [counter, setCounter] = useState<number | undefined>(0);

    useEffect(() => {
        const stateMachine = StateMachine.getInstance();
        const subscription = stateMachine.onChange(counterKey, setCounter);

        return () => subscription.unsubscribe();
    }, []);

    return (
        <View>
            <Text style={{ fontSize: 24 }}>Counter Value: {counter}</Text>
        </View>
    );
};

export default CounterDisplay;
