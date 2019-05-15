
// Подключем все нужные библиотеки и создаем веб-сервер
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

// Используем парсер для json
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Массив подключенных клиентов
let clients = []

// Обработа входящего пост-запроса
app.post('/', function(req, res){ 

	// Всем клиентам отправляем сообщение с телом запросы 
	clients.forEach(client => client.emit("data", req.body));
	res.send('Done');
});

// Когда клиент подключается к серверу
io.on('connection', function(socket){

	// Добавляем его в массив
	clients.push(socket);

	// Когда клиент отключаетяс, удаляем его из массива
	socket.on('disconnect', () => clients.splice(clients.indexOf(socket), 1));
});

// Запускаем http сервер
http.listen(3000, function(){
  console.log('listening on *:3000');
});