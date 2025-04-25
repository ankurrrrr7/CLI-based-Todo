const { Command } = require('commander');
const program = new Command();


program.version('0.0.1')
.description("CLI Based TO-DO")

//add
program.command( 'add <name>')
.description('Write your Task')
.action((name)=>{
    console.log(name)
})
//list
//completed
//uncompleted
//delete
//update
program.parse(process.argv);