export type Listener<T> = (args: T) => void

export default class Listenable<T> {
    private listeners = []

    emit = (args: T) => {
        for (let i = 0; i < this.listeners.length; ++i)
            this.listeners[i](args)
        return this
    }

    on = (cb: Listener<T>) => {
        this.listeners.push(cb)
        return cb
    }

    once = (cb: Listener<T>) => {
        const listener = this.on(args => {
            this.off(listener)
            cb(args)
        })
        return listener
    }

    off = (cb: Listener<T>) => {
        const before = this.listeners.length
        this.listeners = this.listeners.filter(el => el !== cb)
        return before - this.listeners.length
    }

}