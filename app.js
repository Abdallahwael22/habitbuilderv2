import express from 'express'; // استخدم import بدلاً من require

const app = express(); // إنشاء التطبيق

// get method 
app.get('/heyy', (request, response) => {
    response.send('oh heyyyy sweeetiiie');
});

//post request create data
app.post('/ouch', (request, response) => {
    response.send('oh what wrong honey ')

})
const port = 3000;  // تحديد رقم المنفذ
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


