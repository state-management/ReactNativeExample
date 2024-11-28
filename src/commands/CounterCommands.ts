import { Command } from '@state-management/state-machine-react';
import { counterKey } from '../constants/stateKeys';

export class IncrementCounterCommand extends Command<void> {
    execute(): void {
        const currentValue = this.getLatest(counterKey) || 0;
        this.putState(counterKey, currentValue + 1);
    }
}

export class DecrementCounterCommand extends Command<void> {
    execute(): void {
        const currentValue = this.getLatest(counterKey) || 0;
        this.putState(counterKey, currentValue - 1);
    }
}
