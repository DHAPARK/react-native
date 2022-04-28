//jsonlink.com json 문법 검증

const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
//firebase 이식
//const getDocs = require('firebase/firestore');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//var firebase = require("firebase");
var admin = require("firebase-admin");
var firestore = require("firebase-admin/firestore");
var auth = require("firebase-admin/auth");
var serviceAccount = require("./hscoin-d8ff7-firebase-adminsdk-unmpe-a6a77a60b5.json");



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const login = auth.getAuth();
const db = firestore.getFirestore();

//회원가입 firebase 이용
async function join(userid,userpw,username,useremail,userphone,year,month,day) {
    db.collection("users").doc(userid).set({
        userid: userid,
        userpw: userpw,
        username: username,
        useremail: useremail,
        userphone: userphone,
        //usergender: usergender,
        year: year,
        month: month,
        day: day
    });
}

//로그인
//회원가입 firebase 이용
function userlogin(id,pw) {
    return new Promise((res,rej)=>{
    let ps = db.collection('users').doc(id);
    let userid = "";
    let password= "";
    let member = {};
    
        ps.onSnapshot(docSnapshot => {
            password = docSnapshot["_fieldsProto"]["userpw"]["stringValue"];
            userid = docSnapshot["_fieldsProto"]["userid"]["stringValue"];
            console.log("userpw = "+ password);
            
            console.log(`input_pw : ${pw}`)
            console.log(`password type : ${typeof(password)}`)
            console.log(`same : ${password == pw}`)

            if (password == pw){
                member = {
                    "userid":`${id}`,
                    "password":`${password}`
                }
                console.log(`member은 ${member}`);
                console.log(`member은 ${JSON.stringify(member)}`);

                //원래는 return 하게 만들었었는데 동기/비동기에서 문제가 생김. 고로 여기서 res.send까지 해주는걸로 변경해야함
                //return member;
                res(JSON.stringify(member));
            }
            else{
                console.log("로그인 실패");
            }
        },(err)=>{
            console.log(`${err}`);
        })
    });
}
//vzvxc
//12341234

//로그인
//const docRef = doc(db, "users", "SF");
//const docSnap = await getDoc(docRef);

//if (docSnap.exists()) {
 // console.log("Document data:", docSnap.data());
//} else {
  // doc.data() will be undefined in this case
  //console.log("No such document!");
//}



const module1 = require('./router/module1')(app,fs,admin,firestore,serviceAccount,join,userlogin);


app.listen(port,()=>{
    console.log(`${port}번호로 서버 실행중...`);
});