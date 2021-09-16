const {GET_ALL_TODO} = require("./queries")
const initDB = require('./initDB')
const {Table} = require("console-table-printer")

const showTodos = () => {
    const db = initDB()
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
        db.close()
    })
}

module.exports = showTodos