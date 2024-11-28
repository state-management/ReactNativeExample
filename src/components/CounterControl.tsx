import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {useDispatcher} from '@state-management/state-machine-react';
import {IncrementCounterCommand, DecrementCounterCommand} from '../commands/CounterCommands';

const CounterControl: React.FC = () => {
    const dispatch = useDispatcher();

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    title="Increment"
                    onPress={() => dispatch(new IncrementCounterCommand())}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title="Decrement"
                    onPress={() => dispatch(new DecrementCounterCommand())}
                />
            </View>
        </View>
    );
};

export default CounterControl;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    buttonContainer: {
        borderColor: '#007AFF',
        borderWidth: 2,
        borderRadius: 8,
        paddingVertical: 2,
        paddingHorizontal: 4,
    },
});
