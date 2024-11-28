import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import {fromState} from '@state-management/state-machine-react';
import { counterKey } from '../constants/stateKeys';

const CounterDisplay: React.FC = () => {
    const counter = fromState(counterKey);

    useEffect(() => {
        console.log('CounterDisplay > useEffect > counter ', counter);
    }, [counter]);

    return (
        <View>
            <Text style={{ fontSize: 24 }}>Counter Value: {counter}</Text>
        </View>
    );
};

export default CounterDisplay;
