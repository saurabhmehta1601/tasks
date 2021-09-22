const initDB = require("../lib/initDB")
const {DELETE_ALL_TODOS} = require("./queries")
const deleteAllTodos = () => {
    const db = initDB()
    db.run(DELETE_ALL_TODOS,function(err){
        if(err){
            console.log("There are not todos to delete") 
        }else{
            console.log("Deleted all Todos 🗑")
        }
        db.close()
    })
}

module.exports = deleteAllTodos
