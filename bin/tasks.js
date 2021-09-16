#! /usr/bin/env node

const inquirer = require("inquirer")
const {Table} = require('console-table-printer')
const printHelp = require("../lib/printHelp")
const initDB = require("../lib/initDB")
const addTodo = require("../lib/addTodo");
const { GET_ALL_TODO, MARK_TODO_COMPLETED, DELETE_SELECTED_TODOS } = require("../lib/queries");

if(process.argv.length == 2 || process.argv.includes("--help")){
    printHelp()
}
else{
    if(process.argv[2] === "add"){
        inquirer.prompt([{
            type:'input',
            message:"What is your todo ?",
            name:'title'
        },
        {
            type:'input',
            message:"What is Deadline for todo ?",
            name:'deadline'
        },
        {
        type:'input',
        message:"Wanna explain in detail about todo ?",
        name:'desc'
        }
        ])
        .then(({title,deadline,desc}) => {
            const db = initDB()
            addTodo(db,{title,deadline,desc})
            db.close()
        })
    } 
    else if(process.argv[2] === "show"){
            const db = initDB
            db.all(GET_ALL_TODO,[],(err,rows) => {
                if(err){
                    console.log(err)
                }
                else{
                    const table = new Table({ title:"Todos"})
                    rows.forEach(row => {
                        const color = row.completed ==="NO" ? "red" : "green"
                        table.addRow(row,{color})
                    })
                    table.printTable()
                }
            })
            db.close()
    }
    else if(process.argv[2] === "markdone"){
        const db = initDB()
        db.all("SELECT title FROM todos",[],(err,rows) => {
            if(err){
                console.log(err)
            }
            else{
                inquirer.prompt([{
                    message:'Select the todo to be marked as done. ',
                    name:'selectedTodo',
                    type:'list',
                    choices: rows.map(row => row.title)
                 }])
                 .then(({selectedTodo}) =>{
                    db.run(MARK_TODO_COMPLETED,[selectedTodo])
                 }
)            }
        })
        db.close()
    }
    else if(process.argv[2] === 'delete'){
        const db = initDB()
        db.all("SELECT title FROM todos",[],(err,rows) => {
            inquirer.prompt([{
                name:'selectedTodos',
                type:'checkbox',
                choices: rows.map(row => row.title)
            }])
            .then(({selectedTodos})=>{
               const todos = selectedTodos.join(', ');
               db.run(DELETE_SELECTED_TODOS,[todos]) 
            })        
        })
        db.close()
    }

}


