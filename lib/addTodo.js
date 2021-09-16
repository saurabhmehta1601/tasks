const {CREATE_TODO_TABLE, CREATE_TODO_ENTRY} = require('./queries')
module.exports = (db, {title,deadline,desc}) => {
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
