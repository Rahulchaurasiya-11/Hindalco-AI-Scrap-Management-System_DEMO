const path = require('path');

// 1. Express ko batao ki frontend folder ke andar saari static files (CSS, Images, JS) hain
app.use(express.static(path.join(__dirname, 'frontend')));

// 2. Jab koi main URL open kare, toh use index.html file serve karo
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});
