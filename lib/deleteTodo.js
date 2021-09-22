const inquirer = require("inquirer")
const {  DELETE_SELECTED_TODO } = require("../lib/queries");
const initDB = require("../lib/initDB")

const deleteTodos = () => {
        const db = initDB()
        db.all("SELECT title FROM todos",[],async (err,rows) => {
            if(Array.isArray(rows) && rows.length == 0){
                console.log("No todos to delete")
            }
            else{
                const {selectedTodo} = await inquirer.prompt([{
                    name:'selectedTodo',
                    type:'list',
                    choices: rows.map(row => row.title)
                }])
                db.run(DELETE_SELECTED_TODO,[selectedTodo]) 
            }
            db.close()
        })
}

module.exports = deleteTodos
