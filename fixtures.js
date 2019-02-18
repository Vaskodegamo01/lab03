const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/User');
const Foto = require('./models/Foto');


mongoose.connect(config.db.url + '/' + config.db.name);

const db = mongoose.connection;

db.once('open', async () => {
    try {
        await db.dropCollection('users');
        await db.dropCollection('fotos');
;

    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    console.log('collection is dropped');

    const [user, admin] = await User.create({
        username:'user',
        password: '123',
        role: "user"
},{
        username:'admin',
        password: '123',
        role: "admin"
    });
    console.log('user created');

    const [f1, f2, f3, f4] = await Foto.create({
        name: "Дженнифер Лопес",
        image: "0DJVbzgEZnNgJwl7Kxy7q.jpeg",
        information: "Американская актриса, певица, танцовщица, модельер, продюсер и бизнесвумен.",
        userId: admin._id
    },{
        name: "Иосиф Кобзон",
        image: "46FkMx5C7NvCjSCRmKEcT.jpeg",
        information: "Советский и российский эстрадный певец, российский политический и общественный деятель, музыкальный педагог.",
        userId: admin._id
    },{
        name: "Лев Лещенко",
        image: "bQBKiBx1FS-FZ3qTKFXau.jpeg",
        information: "Советский и российский эстрадный певец. Народный артист РСФСР.",
        userId: admin._id
    },{
        name: "Валерий Кипелов",
        image: "CfvQW1LW9ybKzoEJoucPd.jpeg",
        information: "Российская рок-группа под руководством Валерия Кипелова, играющая в стиле хеви-метал и симфоник-метал, основанная в 2002 году.",
        userId: admin._id
    });

    console.log("Foto created");


    db.close();
});
