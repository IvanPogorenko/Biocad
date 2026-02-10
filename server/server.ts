const jsonServer = require("json-server")
const fs = require("fs")

const server = jsonServer.create()
const db = JSON.parse(fs.readFileSync('data/data.json', 'utf-8'))
const router = jsonServer.router('data/data.json')
const middlewares = jsonServer.defaults()

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get('/task-extended-info/:id', (req, res) => {
    const id = Number(req.params.id)
    const task = db.tasks.find(task => task.id === id)
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const description = db.task_description.find(td => td.task_id === id).description
    const experiments = db.task_history.find(th => th.task_id === id).experiments
    if (!description || !experiments){
        return res.status(404).json({ error: 'No extended info' });
    }
    res.json({
        task,
        description,
        experiments
    })
})

server.use(router);
server.listen(3003, () => {
    console.log('working on port 3003');
});