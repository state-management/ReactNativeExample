import { Command } from '@state-management/state-machine-react';
import { counterKey } from '../constants/stateKeys';

export class SetInitialCounterCommand extends Command<number> {
    execute(executionContext: number): void {
        this.putState(counterKey, executionContext);
    }
}
