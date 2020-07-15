import io from 'socket.io-client';

class MongoDB {
    ip = '120.125.83.10';
    port = '8080';

    constructor() {
        this.isOpen = false;
        this.connect();
    }

    connect(callback) {
        if (!this.isOpen) {
            this.socket = io(`http://${this.ip}:${this.port}`);
            this.isOpen = true;

            if (callback && this._isFunction(callback)) {
                callback();
            }
        }
    }

    trigger(type, event, query, callback) {
        this.connect();
        this.socket.emit(type, Object.assign({}, query, { event }));

        if (callback && this._isFunction(callback)) {
            this.socket.on(event, callback);
        }
    }

    get(query, callback) {
        this.connect();
        this._eventRoute('get', query, callback);
    }

    insert(query, callback) {
        this.connect();
        this._eventRoute('insert', query, callback);
    }

    update(query, callback) {
        this.connect();
        this._eventRoute('update', query, callback);
    }

    delete(query, callback) {
        this.connect();
        this._eventRoute('delete', query, callback);
    }

    watch(setting, callback) {
        this.connect();
        this.socket.emit('watch', setting);

        const { collection, event } = setting;
        if (callback && this._isFunction(callback)) {
            this.socket.on(event || `${collection}Changed`, callback);
        }
    }

    close(callback) {
        if (this.isOpen) {
            this.socket.close();
            this.socket = undefined;
            this.isOpen = false;

            if (callback && this._isFunction(callback)) {
                callback();
            }
        }
    }

    _eventRoute(event, query, callback) {
        this.socket.emit(event, query);

        if (callback && this._isFunction(callback)) {
            this.socket.on(`${event}Result`, callback);
        }
    }

    _isFunction(v) {
        return (typeof v === 'function');
    }
}

global.mongoDB = new MongoDB();