#! /usr/bin/env node

const printHelp = require("../lib/printHelp")
const addTodo = require("../lib/addTodo");
const showTodos = require("../lib/showTodos");
const markTodoAsDone = require("../lib/markTodoAsDone");
const deleteTodos = require("../lib/deleteTodo");

if(process.argv.length == 2 || process.argv.includes("--help")){
    printHelp()
}
else{
    if(process.argv[2] === "add"){
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
}


