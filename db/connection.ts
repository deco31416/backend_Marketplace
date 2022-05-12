import { model, connect } from 'mongoose';

const db = async () => {
    
    try {

        await connect(process.env.CS, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('DB Online');
    
    } catch(e) {
        console.log(e);
        throw e;
    }

};

export default db;
