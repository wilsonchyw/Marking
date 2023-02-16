import injectManager from '../services/injectManager';

type Constructor<T = any> = new (...args: any[]) => T;

export default function Injectable(target: any) {
    const key = target.name;
    injectManager.set(key, target);
}
