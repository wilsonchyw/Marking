import Log from 'log4fns';
import InjectManager from "../services/injectManager"

/**
 * A decorator function that injects an instance of the specified injectable class into the decorated property.
 * 
 * @param {new () => any} InjectableClass - A constructor function for the injectable class.
 * @param {string} [s=''] - A string parameter with no apparent purpose.
 * @returns {(target: any, propertyName: string) => void} A decorator that can be applied to a class property.
 */
export default function Inject(InjectableClass: { new () }, s = '') {
    return (target: any, propertyName: string) => {
        Object.defineProperty(target, propertyName, {
            get: () => InjectManager.get(InjectableClass.name),
            enumerable: true,
            configurable: true
        });
    };
}
