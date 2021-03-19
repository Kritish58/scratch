const express = require('express');
const path = require('path');
const clientRoutes = require('./client.routes');
const adminRoutes = require('./admin.routes');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use('', express.static(path.join(__dirname, 'assets')));
app.use('/client', express.static(path.join(__dirname, 'client', 'static')));
app.use('/admin', express.static(path.join(__dirname, 'admin', 'static')));

app.use('', clientRoutes);
app.use('', adminRoutes);

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'global', '404.html'));
});

app.listen(3000, () => {
   console.log('server is running on port ', 3000);
});
