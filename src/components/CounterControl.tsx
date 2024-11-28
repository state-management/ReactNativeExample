import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {StateMachine} from 'simple-state-machine';
import {IncrementCounterCommand, DecrementCounterCommand} from '../commands/CounterCommands';

const CounterControl: React.FC = () => {
    const stateMachine = StateMachine.getInstance();

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    title="Increment"
                    onPress={() => {
                        stateMachine.dispatch(new IncrementCounterCommand());
                    }}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title="Decrement"
                    onPress={() => {
                        stateMachine.dispatch(new DecrementCounterCommand());
                    }}
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
