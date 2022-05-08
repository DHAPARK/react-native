const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const admin = require("firebase-admin");
const firestore = require("firebase-admin/firestore");
const auth = require("firebase-admin/auth");
const serviceAccount = require("./hscoin-d8ff7-firebase-adminsdk-unmpe-a6a77a60b5.json");
const { send } = require('process');
const PORT = 80;

//Hscoin 관련 정보
const NODE_HOST = `https://ropsten.infura.io/v3/${'9d7d720107794fe49bf52b5fa9965761'}`; // infura Test 프로젝트 id
const HSCOIN_ADDRESS = '0x37f7f7d072079B7970188180F7658137122Cb099'; // hscoin 컨트랙트 주소
const HSCOIN_JSON_FILE = '../hscoin-contract/build/contract/Hscoin.json';
const HSCOIN_JSON_PARSED = JSON.parse(fs.readFileSync(jsonFile));
const HSCOIN_ABI = HSCOIN_JSON_PARSED.abi;

let accountList;
let hsContract;
let web3;

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
    await hsContract.methods.transfer(accountAddress, new BigNumber(100 * 10 ** 18)).send({from:accountList[0]});
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
            try{
                console.log(`이렇게온다 : ${docSnapshot}`);
                password = docSnapshot["_fieldsProto"]["userpw"]["stringValue"];
                userid = docSnapshot["_fieldsProto"]["userid"]["stringValue"];
                userAccount = docSnapshot["_fieldsProto"]["accountAddress"]["stringValue"]

                if (password == pw){
                    member = {
                        "userid":`${id}`,
                        "password":`${password}`,
                        "userAccount":`${userAccount}`
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
            }catch(e){
                console.log(`1_moduletest.js userlogin 메서드에서 ${e} 오류발생`);
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


//jsonlink.com json 문법 검증
app.use(bodyParser.urlencoded({extended:false}));
//const getDocs = require('firebase/firestore');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

initWeb3();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const login = auth.getAuth();
const db = firestore.getFirestore();
const module1 = require('./router/module1')(app,fs,admin,firestore,serviceAccount,join,userlogin,checkIdDuplicate,balanceInquiry)

app.listen(PORT,()=>{
    console.log(`${PORT}번호로 서버 실행중...`);
});
