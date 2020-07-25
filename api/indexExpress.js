import fetch from 'node-fetch';
import mongodb from 'mongodb';
const { MongoClient, ObjectId } = mongodb;
import express from 'express';
const app = express();
import http from 'http';
const { Server } = http;
const server = Server(app);
import socketIO from 'socket.io';
const io = socketIO(server);

const ip = '120.125.83.10';
const dbPort = '27017';
const socketPort = '8080';
const dbName = 'AIdel';

let dbo = undefined;
let dbClient = undefined;
MongoClient.connect(`mongodb://${ip}:${dbPort}`, (err, client) => {
    if (err) throw err;
    console.log('mongoDB connection is ready!');

    dbClient = client;
    dbo = client.db(dbName);
    console.log(`connect to ${dbName} successfully!`);
});

server.listen(socketPort);
io.on('connection', (socket) => {
    console.log(`socket connect id: ${socket.id}`);

    socket.on('get', (query) => {
        console.log(query);

        const { collection, filter } = query;
        dbo.collection(collection).find(filter || {})
            .toArray((err, data) => {
                if (err) throw err;

                console.log(data);
                socket.emit(query.event || 'getResult', data);
            });
    });

    socket.on('insert', (query) => {
        console.log(query);

        const { collection, data } = query;
        const col = dbo.collection(collection);

        if (data && Array.isArray(data)) {
            col.insertMany(data, (err, res) => {
                if (err) throw err;
                console.log(`number of document inserted into ${collection}: ${res.insertedCount}`);
            })
        } else if (_isObject(data)) {
            col.insertOne(data, (err, res) => {
                if (err) throw err;
                console.log(`has one document inserted into ${collection}`);
            });
        } else {
            throw new Error('insert failed! data type must be array or object');
        }

        _dbQuery(collection, query.event || 'insertResult', socket);
    });

    socket.on('update', (query) => {
        console.log(query);

        const { collection, filter, update, muti = false } = query;
        const col = dbo.collection(collection);

        if (filter._id) {
            filter._id = new ObjectId(filter._id)
        }

        if (muti) {
            col.updateMany(filter, { $set: update },
                (err, res) => {
                    if (err) throw err;
                    console.log(`number of document updated on ${collection}: ${res.result.nModified}`);
                });
        } else {
            col.updateOne(filter, { $set: update },
                (err, res) => {
                    if (err) throw err;
                    console.log(`has one document updated on ${collection}`);
                });
        }

        _dbQuery(collection, query.event || 'updateResult', socket);
    });

    socket.on('delete', (query) => {
        console.log(query);

        const { collection, filter, muti = false } = query;
        const col = dbo.collection(collection);

        if (filter._id) {
            filter._id = new ObjectId(filter._id)
        }

        if (muti) {
            col.deleteMany(filter, (err, res) => {
                if (err) throw err;
                console.log(`number of document deleted on ${collection}: ${res.result.n}`);
            });
        } else {
            col.deleteOne(filter, (err, res) => {
                if (err) throw err;
                console.log(`has one document deleted on ${collection}`);
            });
        }

        _dbQuery(collection, query.event || 'deleteResult', socket);
    });

    socket.on('watch', (setting) => {
        const { collection, pipeline = [], options = {} } = setting;

        dbo.collection(collection)
            .watch(pipeline, options)
            .on('change', (data) => {
                if (data && data.operationType && data.operationType === 'insert') {
                    const { date, location, type } = data.fullDocument;

                    dbo.collection('userNotificationToken')
                        .find({}).toArray((err, tokens) => {
                            if (err) throw err;

                            console.log(tokens);
                            _push_notification({
                                to: tokens.map(({ token }) => String(token)),
                                title: '緊急!',
                                body: `${date}: 於${location.address}疑似發生${type}事故`,
                                vibrate: true
                            });
                        });
                }
            });
    });

    socket.on('disconnect', () => console.log(`socket disconnect id: ${socket.id}`));
});

process.on('SIGINT', () => {
    console.log('Process is terminated');
    dbClient.close();
    process.exit();
});

function _isObject(obj) {
    return obj && obj !== null && obj.constructor === Object;
}

function _dbQuery(collection, event, socket) {
    dbo.collection(collection).find({})
        .toArray((err, data) => {
            if (err) throw err;
            socket.emit(event, data);
        });
}

async function _push_notification(pushData) {
    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pushData)
    })
        .then((res) => res.json())
        .then((data) => console.log('push notification successfully.'))
        .catch((err) => console.log(err));
} 