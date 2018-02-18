module.exports = (socketServerUrl, fs) => {
    const data = {
        socketServerUrl: socketServerUrl
    };

    const stringified = 'var env = ' + JSON.stringify(data);

    const dir = 'generated';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const path = `${dir}/env.js`;
    console.log('writing environment file to', path);
    fs.writeFileSync(path, stringified);
};
