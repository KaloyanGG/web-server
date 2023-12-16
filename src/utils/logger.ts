import signale, { Signale } from 'signale';
import { signaleConfig } from '../config/signale.config';

class Logger extends Signale {
    private static instance: Logger;

    private constructor() {
        super(signaleConfig);
    }

    public static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
}

export default Logger.getInstance();