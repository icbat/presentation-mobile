const test = require('ava');

const writeEnvFile = require('../lib/writeEnvFile');

test('writeEnvFile writes to the right place', t => {
    const fs = mockFS();
    t.is(Object.keys(fs.spy).length, 0, 'precondition failed - spy object had stuff on it');

    writeEnvFile('my url', fs);

    t.is(fs.spy.file, 'generated/env.json');
});

test('writeEnvFile writes JSON with the socket server url', t => {
    const fs = mockFS();
    t.is(Object.keys(fs.spy).length, 0, 'precondition failed - spy object had stuff on it');
    const expected = 'my url';

    writeEnvFile(expected, fs);

    const parsed = JSON.parse(fs.spy.data);

    t.is(parsed.socketServerUrl, expected);
});

test('writeEnvFile creates directory if needed', t => {
    const fs = mockFS(false);
    t.is(Object.keys(fs.spy).length, 0, 'precondition failed - spy object had stuff on it');

    writeEnvFile('something', fs);

    t.is(fs.spy.createdDirectory, 'generated');
});

test('writeEnvFile skips mkdir if it exists', t => {
    const fs = mockFS(true);
    t.is(Object.keys(fs.spy).length, 0, 'precondition failed - spy object had stuff on it');

    writeEnvFile('something', fs);

    t.is(fs.spy.createdDirectory, undefined);
});

const mockFS = (tempDirAlreadyExists) => {
    return {
        spy: {},
        writeFileSync: function (file, data, options) {
            this.spy.file = file;
            this.spy.data = data;
        },
        existsSync: function(directory) {
            const exists = tempDirAlreadyExists === undefined ? true : tempDirAlreadyExists;
            console.log('we mocked this to', exists);

            return exists;
        },
        mkdirSync: function(directory) {
            this.spy.createdDirectory = directory;
        },
    };
};
