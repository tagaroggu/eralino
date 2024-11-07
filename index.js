import * as Comlink from 'comlink';

/**
 * Like Android intents. Can be used for actions outside an app, such as
 * opening abother app. Simple superclass to make management a little easier.
 */
class Intents extends BroadcastChannel {
    static actions = Object.freeze(
        Object.fromEntries(["OPEN"].map((value) => [value, value])));

    constructor() {
        super('Intents');
        this.addEventListener('message', this);
    }

    /**
     * @param {Event} event 
     */
    handleEvent(event) {
        if (event.type === 'message') {
            this.dispatchEvent(new CustomEvent(event.data.intentID, { detail: event.data }));
        }
    }

    /**
     * 
     * @param {keyof typeof Intents.actions} intent 
     * @param {unknown} data 
     */
    sendIntent(intent, data) {
        this.postMessage({ ...data, intentID: intent })
    }
}
