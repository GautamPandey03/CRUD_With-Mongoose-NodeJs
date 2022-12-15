const getDb = require('./MongoDb');
const connect = require('./MongoDb');

const updateData = async () => {
    const data = await getDb();
    console.log(data);
    let value = await data.updateOne({ name: 'Chetak' },{ $set: { position: 'Matser'} }
    
    );
    console.log(value)
}
updateData();