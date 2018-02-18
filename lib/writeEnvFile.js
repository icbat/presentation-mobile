module.exports = (socketServerUrl, fs) => {
    const data = {
        socketServerUrl: socketServerUrl
    };

    const dir = 'generated';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const path = `${dir}/env.json`;
    console.log('writing environment file to', path);
    fs.writeFileSync(path, JSON.stringify(data));
};
