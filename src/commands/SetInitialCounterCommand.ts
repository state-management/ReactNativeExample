import { Command } from 'simple-state-machine';
import { counterKey } from '../constants/stateKeys';

export class SetInitialCounterCommand extends Command<number> {
    execute(executionContext: number): void {
        this.putState(counterKey, executionContext);
    }
}
