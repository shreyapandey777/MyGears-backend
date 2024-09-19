import { connect } from "mongoose";

connect("mongodb+srv://AbhiCode04:abhinav05@mygear.m3szxsz.mongodb.net/myGear?retryWrites=true&w=majority&appName=myGear")
    .then(() => console.log('Mongodb Connected'))
    .catch((err) => console.log('There is some error', err))