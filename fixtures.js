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
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    console.log('collection is dropped');

    const [admin] = await User.create({
        username:'user',
        password: '123',
        role: "user"
},{
        username:'admin',
        password: '123',
        role: "admin"
    });
    console.log('user created');

    const [] = await Foto.create({
        name: "Дженнифер Лопес",
        image: "A20HeLR_nFlg8bzq6WCm-.jpeg",
        information: "Американская актриса, певица, танцовщица, модельер, продюсер.",
        userId: admin._id
    },{
        name: "Иосиф Кобзон",
        image: "sKkIgl5LMuYs4ZsuuCj4T.jpeg",
        information: "Советский и российский эстрадный певец, российский политический.",
        userId: admin._id
    },{
        name: "Лев Лещенко",
        image: "sXSPvEY6RSRhtMbuu5IEo.jpeg",
        information: "Советский и российский эстрадный певец. Народный артист РСФСР.",
        userId: admin._id
    },{
        name: "Валерий Кипелов",
        image: "cPOCPS1QSRIBKjxmQ30pj.jpeg",
        information: "Российская рок-группа под руководством Валерия Кипелова.",
        userId: admin._id
    },{
        name: "Виктор Цой",
        image: "3ayvCLb9jkq9gEWFe7pue.jpeg",
        information: " советский рок-музыкант. Основатель и лидер рок-группы «Кино».",
        userId: admin._id
    },{
        name: "Земфира Рамазанова",
        image: "anWMvGy1dg4i9gv-xiOJ8.jpeg",
        information: "российская рок-певица, музыкант, композитор, продюсер и автор песен.",
        userId: admin._id
    },{
        name: "Полина Гагарина",
        image: "KmI9tCxByyYWmrNQyZ_9l.jpeg",
        information: "российская певица, композитор, актриса, модель.",
        userId: admin._id
    },{
        name: "Андрей Макаревич",
        image: "Oxza8-PtPrnuRi1ehNTFH.jpeg",
        information: " советский и российский музыкант, певец, поэт, бард, композитор.",
        userId: admin._id
    });

    console.log("Foto created");


    db.close();
});
