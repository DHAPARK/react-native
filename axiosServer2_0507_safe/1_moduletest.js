//도현

//Hscoin 관련 정보
const HSCOIN_ADDRESS = '0x0Ab89981bBdAf549b0401f221bDD4F3EC3aC52Ee'; // hscoin 컨트랙트 주소
const HSCOIN_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"name_","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"symbol_","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
const node_host = `https://ropsten.infura.io/v3/${'9d7d720107794fe49bf52b5fa9965761'}`; // infura Test 프로젝트 id
const Web3 = require('web3');
const BigNumber = require('bignumber.js');
let accountList; 
let hsContract;
let web3;

//jsonlink.com json 문법 검증

const express = require('express');
const app = express();
const fs = require('fs');
//const port = 80;
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

initWeb3();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const login = auth.getAuth();

const db = firestore.getFirestore();
async function initWeb3() {
    web3 = new Web3('http://127.0.0.1:8545');
    accountList = await web3.eth.getAccounts();
    hsContract = new web3.eth.Contract(HSCOIN_ABI, HSCOIN_ADDRESS);
}

/**
 * sender to receiver (amount)
 * @param {string} senderAddress 전송측 주소
 * @param {string} receiverAddress 송신측 주소
 * @param {int} amount 보낼 금액
 */
 async function transferHSC(senderAddress, receiverAddress, amount) {
    let decimals = await hsContract.methods.decimals();
    await hsContract.methods.transfer(receiverAddress, amount * 10 ** decimals).send({from:senderAddress});
}

/**
 * 송금 함수 (sender to receiver)
 * @param {*} senderAddress 전송측 주소
 * @param {*} receiverAddress 송신측 주소
 * @param {*} amount 보낼 금액
 * @returns {boolean} 성공 여부
 */
async function remittance(senderAddress, receiverAddress, amount) {

    transferHSC(senderAddress, receiverAddress, amount);
}

/**
 * 가맹점 주소로 결제 진행
 * @param {string} senderAddress 전송측 주소
 * @param {string} receiverAddress 송신측 주소
 * @param {int} amount 보낼 금액
 * @returns {boolean} 성공 여부
 */
// 
async function payment(senderAddress, receiverAddress, amount) {
    let isSuccess = false;
    let senderBalance = await balanceInquiry(senderAddress);
    senderBalance < amount ? isSuccess = false : isSuccess = true;
}

// 계좌 잔액 조회(보내는 사람 주소) => HSC값으로 리턴(소수점 자리 클 수 있음)
/**
 * 계정의 HSC 보유값 리턴
 * @param {string} inquiryAddress 조회할 계정 주소
 * @returns {float} ETH 값으로 리턴
 */
 async function balanceInquiry(inquiryAddress) {
    let hsBalanceWei = await hsContract.methods.balanceOf(inquiryAddress).call();
    let hsBalanceEth = web3.utils.fromWei(hsBalanceWei, 'ether');
    return hsBalanceEth;
}

async function isAddressInDB(inquiryAddress) {
    
}

// 이용내역(조회할 주소)
async function checkUsageDetails(inquiryAddress) {

}



//회원가입 firebase 이용
async function join(userid,userpw,username,useremail,userphone,year,month,day) {
    let accountAddress = await web3.eth.personal.newAccount(userpw);
    db.collection("users").doc(userid).set({
        userid: userid,
        userpw: userpw,
        username: username,
        useremail: useremail,
        userphone: userphone,
        //usergender: usergender,
        year: year,
        month: month,
        day: day,
        accountAddress: accountAddress
    });
}

//아이디 중복때문에 체크
function checkIdDuplicate(userid){
    var password = "";
    return new Promise((resolve,reject)=>{
        let ps = db.collection('users').doc(userid);
        
        //패스워드 유무를 확인하기위한 스냅샷
        ps.onSnapshot(docSnapshot => {
            try{
                password = docSnapshot["_fieldsProto"]["userpw"]["stringValue"];
                userid = docSnapshot["_fieldsProto"]["userid"]["stringValue"];
                console.log("userpw = "+ password);
                
                console.log(`input_pw : ${pw}`)
                console.log(`password type : ${typeof(password)}`)
                console.log(`same : ${password == pw}`)
            }catch(e){
                //없으면 중복이 없는거니까 에러가 나면 성공이고 200을 보내고
                if(password === ""){
                    resolve('200');
                    //console.log(e);
                    console.log('중복이 없다. 200을 보냄');
                    return false;
                }
            }finally{
                if(password !== ""){
                    console.log(`password가 뭐라찍히길래?  ${password}`);
                    resolve('100');
                    console.log('중복이 있다. 100을 보냄');
                    //에러가 나지않으면 실패니까 (중복이니까) 100을 보내준다.
                }
            }
            
            
            
        },(err)=>{
            console.log(`${err}`);
        })
    
        //패스워드 유무를 확인하기위한 스냅샷
    })
}
//아이디 중복때문에 체크



//로그인
//회원가입 firebase 이용
function userlogin(id,pw) {
    return new Promise((res,rej)=>{
    let ps = db.collection('users').doc(id);
    //let userid = "";
    let password= "";
    let member = {};
    
        ps.onSnapshot(docSnapshot => {
            password = docSnapshot["_fieldsProto"]["userpw"]["stringValue"];
            userid = docSnapshot["_fieldsProto"]["userid"]["stringValue"];
            userAccount = docSnapshot["_fieldsProto"]["accountAddress"]["stringValue"];
            console.log(`지갑주소${userAccount}`);
            
            if (password == pw){
                member = {
                    "userid":`${id}`,
                    "password":`${password}`,
                    "userAccount" : `${userAccount}`
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



const module1 = require('./router/module1')(app,fs,admin,firestore,serviceAccount,join,userlogin,checkIdDuplicate,balanceInquiry);


app.listen(port,()=>{
    console.log(`${port}번호로 서버 실행중...`);
});