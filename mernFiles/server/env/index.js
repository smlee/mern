import path from 'path';
const devConfigPath = path.join(__dirname, './development.js');
const productionConfigPath = path.join(__dirname, './production.js');

if (process.env.NODE_ENV === 'production') {
    export default (import productionConfigPath);
} else {
    export default (import devConfigPath);
}