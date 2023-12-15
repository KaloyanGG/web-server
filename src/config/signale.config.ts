import { Signale } from 'signale';

type ConstructorArgType = ConstructorParameters<typeof Signale>[0];

export const signaleConfig: ConstructorArgType = {
    config:{
        displayLabel: false,
    }
}