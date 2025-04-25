const { Command } = require('commander');
const program = new Command();
const path = './tasks.json'
const chalk = require('chalk')
const fs = require('fs')


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
    let id = Date.now()
    let todo = {id, task, duedate: options.duedate, category: options.category}
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
                    console.log(`${chalk.red('-------------------------')}`);
                });
            } catch (parseErr) {
                console.error('❌ Error parsing data:', parseErr);
            }
        });
    });
//completed

//uncompleted
//delete
//update
program.parse(process.argv);