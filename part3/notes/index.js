
const express = require('express');
const app = express();
const morgan = require('morgan');

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('----')
  next()
};



app.use(express.json());  // essential for POST middleware
//app.use(requestLogger);
app.use(morgan('tiny'));


let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
];

app.get('/', (request, response) => {
  response.send('<h1>Hello Baby! </h1>')
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find(note => note.id === id);
  if(note) {
    response.json(note); 
  } else {
    response.status(404).end()
  }
});

app.delete('/api/notes/:id',(request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
});

app.post('/api/notes', (request, response) => {
  const note = request.body
  console.log(note)
  response.json(note) 
});

app.post('./api/notes', (request, response) => {
  
    const person = request.body;
    console.log(person);

    response.json(person) 
})

let persons = [
  { 
    id: 1,
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: 2,
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: 3,
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: 4,
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
];

app.get('/api/persons', (request, response) => {
  response.json(persons)
});

app.get('/info', (request, response) => {
  let size = persons.length;
  response.send(`<p>Phonebook has info for ${size} people</p>
                  <p>${new Date()}</p>`)
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
 });

/*
app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)

  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    :0

  body.id = maxId + 1
  persons = persons.concat(body)
  response.json(body) 
})
*/



  const generateId = () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    :0

    return maxId + 1
  }  

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  } else if(persons.some(n => n.name ===body.name)) {
    return response.json({
      error: 'name must be unique'
    })
  };

  const person = {
    name:body.name,
    number:body.number,
    date: new Date(),
    id: generateId()
  }

  console.log(person)

  persons = persons.concat(person)

  response.json(person) 
});


//app.post('./api/persons', (request, response) => { 
// the dot cause the former bug!!!!
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint'})
};
app.use(unknownEndpoint);// after all the routes

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});