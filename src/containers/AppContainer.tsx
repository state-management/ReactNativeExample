import React, { useEffect } from 'react';
import { View } from 'react-native';
import {useDispatcher} from '@state-management/state-machine-react';
import { SetInitialCounterCommand } from '../commands/SetInitialCounterCommand.ts';
import CounterDisplay from '../components/CounterDisplay.tsx';
import CounterControl from '../components/CounterControl.tsx';

const AppContainer: React.FC = () => {
    const dispatch = useDispatcher();

    useEffect(() => {
        dispatch(new SetInitialCounterCommand(0));
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <CounterDisplay />
            <CounterControl />
        </View>
    );
};

export default AppContainer;
