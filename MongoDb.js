const { MongoClient, CommandStartedEvent } =require('mongodb');
const url='mongodb://localhost:27017';
const client=new MongoClient(url);
async function getDb()
{
    let result=await client.connect();
    let db=result.db('student');
    return db.collection('student_record');
}
module.exports=getDb;