const express = require("express");
const multer = require("multer");
const path = require("path");
const nanoid = require("nanoid");

const config = require("../config");
const Fotos = require("../models/Foto");
const auth = require("../middlewares/middleware");
const permit = require("../middlewares/permit");

const storage = multer.diskStorage({
    destination(req, file, cd){
        cd(null, config.uploadPath)
    },
    filename(req, file, cd){
        cd(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});


const router = express.Router();
router.get("/", auth, async (req, res)=>{
    let rr=[];
    let tmp = await Fotos.find();
    for(let i=0; i<tmp.length; i++){
        rr.push(JSON.parse(JSON.stringify(tmp[i])));
        rr[i].button='0';
        if(req.user.role === 'admin'){
            rr[i].button='1';
        }else{
            rr[i].button='0';
        }
    }
    res.send(rr);

});
router.post("/", [auth, permit('admin'), upload.single("image")], (req, res) => {
    const artistData = req.body;
    if (req.file) artistData.image = req.file.filename;
    const artist = new Fotos(artistData);
    artist.userId = req.user._id;
    artist.save()
        .then( () => res.send(artistData))
        .catch(e => res.send(e).status(500))

});

router.delete('/delete/:id', [auth, permit('admin')],(req, res)=>{
    Fotos.deleteOne({_id: req.params.id})
        .then(result => res.send(result))
        .catch((e)=>res.send(e).status(500))
});

module.exports = router;