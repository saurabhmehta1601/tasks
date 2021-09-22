#! /usr/bin/env node

const printHelp = require("../lib/printHelp")
const addTodo = require("../lib/addTodo");
const showTodos = require("../lib/showTodos");
const markTodoAsDone = require("../lib/markTodoAsDone");
const deleteTodos = require("../lib/deleteTodo");
const deleteAllTodos = require("../lib/deleteAllTodos");

if(process.argv.length <= 2 ){
    printHelp()
}
else if(process.argv[2] === "add"){
    addTodo()
} 
else if(process.argv[2] === "show"){
    showTodos()
}
else if(process.argv[2] === "markdone"){
    markTodoAsDone()
}
else if(process.argv[2] === 'delete'){
    deleteTodos()
}
else if(process.argv[2] === 'deleteall'){
    deleteAllTodos()
}else{
    printHelp()
}


