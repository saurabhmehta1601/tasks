const inquirer = require("inquirer");
const {  MARK_TODO_COMPLETED} = require("../lib/queries");
const initDB = require("./initDB");

const markTodoAsDone = () => {
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
                    db.close()
                 }
)            }
        })
}

module.exports = markTodoAsDone