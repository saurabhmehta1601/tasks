const {GET_ALL_TODO} = require("./queries")
const initDB = require('./initDB')
const {Table} = require("console-table-printer")

const showTodos = () => {
    const db = initDB()
    db.all(GET_ALL_TODO,[],(err,rows) => {
        if(!err){
            if(Array.isArray(rows) && rows.length < 1){
                console.log("There are no todos !! ")
            }
            else{
                const table = new Table({ title:"Todos"})
                rows.forEach(row => {
                    const color = row.completed ==="NO" ? "blue" : "green"
                    table.addRow(row,{color})
                })
                table.printTable()
            }
        }
        db.close()
    })
}

module.exports = showTodos