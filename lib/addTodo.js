const {CREATE_TODO_TABLE, CREATE_TODO_ENTRY} = require('./queries')
const inquirer = require('inquirer');
const initDB = require("./initDB")

const createTodoRecord = (db, {title,deadline,desc}) => {
    db.serialize(() =>{
        db.run(CREATE_TODO_TABLE,(err) =>{
            if(err){
                console.log(err)
            }})
        db.run(CREATE_TODO_ENTRY,[title,deadline,desc],(err) => {
            if(err){
                console.log(err)
            }else{
                console.log("Todo added 🤜")
            }
        })
    })
}

const addTodo = async () => {
        const {title,deadline,desc}  =await  inquirer.prompt([{
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

        const db = initDB()
        createTodoRecord(db,{title,deadline,desc})
        db.close()
}

module.exports = addTodo