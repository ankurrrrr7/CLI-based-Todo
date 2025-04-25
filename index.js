const { Command } = require('commander');
const program = new Command();
const path = './tasks.json'
const chalk = require('chalk')
const fs = require('fs');
const { error } = require('console');


program.version('0.0.1')
.description("CLI Based TO-DO")
let newtodo=[]


//add
program.command( 'add')
.description('Add a new task')
.argument('<task>')
.option('--duedate <date>', 'Assign a Date to tasks')
.option('--category <filter>','Categorized by work or personal')
.action((task, options)=>{
    let id = Math.floor(Math.random()*100)
    let completed =false;
    let todo = {id, task, duedate: options.duedate, category: options.category, completed }
    if(fs.existsSync(path)){
        try{
           const file= fs.readFileSync(path, 'utf-8', )
            newtodo = JSON.parse(file)
        }catch(err){
            console.log('Unable to read file')
        }
        
    }
    newtodo.push(todo)

    const jsonString = JSON.stringify(newtodo, null, 2)
    try{
        fs.writeFileSync(path, jsonString)
        console.log(`✅ New Todo added: ID ${id}`);
    } catch (err) {
        console.log("❌ Error writing in the JSON file");
    }
    
})


//list
program.command('list')
    .description("See your saved Tasks")
    .action(() => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.error('❌ Error reading the file:', err);
                return;
            }
            try {
                const tasks = JSON.parse(data);
                tasks.forEach(task => {
                    console.log(`${chalk.green('ID:')} ${chalk.blue(`${task.id}`)}`);
                    console.log(`${chalk.green('Task:')} ${chalk.blue(`${task.task}`)}`);
                    console.log(`${chalk.green('Due Date:')} ${chalk.blue(`${task.duedate || 'Not specified'}`)}`);
                    console.log(`${chalk.green('Category:')} ${chalk.blue(`${task.category || 'Not specified'}`)}`);
                    console.log(`${chalk.green('Completed:')}${chalk.blue(`${task.completed}`)}`)
                    console.log(`${chalk.red('-------------------------')}`);
                });
            } catch (parseErr) {
                console.error('❌ Error parsing data:', parseErr);
            }
        });
    });
//update
program.command('update')
.description(chalk.green(`Update your Todo!!`))
.argument(`<id>`)
.option('--task <task> ')
.option('--duedate <date>')
.option('--category <category>')
.option('--completed <completed>')
.action((id, options)=>{
    let tasks;
    if(fs.existsSync(path)){
            fs.readFile(path, 'utf-8',(err, data)=>{
                if(err){
                    console.log(`${chalk.red(`Can't access the folder`)}`)
                }
                tasks = JSON.parse(data);
                const task = tasks.find(t=> t.id === parseInt(id))
                    if(task){
                        if (options.task) task.task = options.task;
                        if (options.duedate !== undefined) task.duedate = options.duedate;
                        if (options.category) task.category = options.category;
                        if (options.completed !== undefined) task.completed = options.completed;
                    }else{
                        console.log(`${chalk.red('Invalid Id')}`)
                    }
                const stringify = JSON.stringify(tasks, null, 2)
                try{
                    fs.writeFileSync(path, stringify);
                    console.log("Done")
                }catch(err){
                    console.log("Error")
                }
         })
    }
})
//delete
program.command('delete')
.argument('<id>', 'Delete a task')
.action((id)=>{
    let task;
    if(fs.existsSync(path)){
        fs.readFile(path, 'utf-8',(err, data)=>{
           if(err){
                console.log(`${chalk.red(`Can't access the folder`)}`)
            }
            task = JSON.parse(data)
            const find = task.findIndex(t=> t.id== parseInt(id))

            if(find != -1){
                task.splice(find, 1)
            }else{
                console.log("Error")
            }
            const stringify = JSON.stringify(task, null, 2);
            try{
                fs.writeFileSync(path, stringify,)
                console.log(`${chalk.green(`✅ Task deleted and file updated`)}`);
            }catch(err){
                
                console.log(`${chalk.red(`❌ Failed to write file`)}`);
            }
                

        })

    }
})
program.parse(process.argv);