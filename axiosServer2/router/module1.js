module.exports = (app,fs,admin,firestore,serviceAccount,join,userlogin,checkIdDuplicate,balanceInquiry)=>{
    
    

    
    //app.post('/joinMember/:userid/:userpw/:username/:useremail/:userphone/:userWalletDist',(req,res)=>{
    app.post('/joinMember/:userid',(req,res)=>{
        //요청온 컴퓨터의 사양
        const userAgent = req.header('user-agent');
        console.log(userAgent);
        console.log(req.body)
        const userid = req.params.userid;
        const userpw = req.body["password"];
        const username = req.body["name"];
        const useremail = req.body["useremail"];
        const userphone = req.body["userphone"];
        //const usergender = req.body["usergender"];
        const year = req.body["year"];
        const month = req.body["month"];
        const day = req.body["day"];
        join(userid,userpw,username,useremail,userphone,year,month,day);
        
        //response 임시 코드
        const result = {};
        result["success"] = 200
        result["msg"] = "join success";
        res.json(result);
        //response 임시 코드
        

    });

    app.get('/getMember/:userid/:userpw',(req,res)=>{
        //요청온 컴퓨터의 사양
        const userAgent = req.header('user-agent');
        console.log(userAgent);
        console.log(req.body)
        const userid = req.params.userid;
        const userpw = req.params.userpw;
        
        //const member = userlogin(userid,userpw);
        userlogin(userid,userpw).then((member)=>{
            console.log(`member : ${member}`);
            //console.log(`member은 ${member}`);
            //console.log(`member module사이드 은 ${typeof(member)}`);
            res.json(member);
        });
    });

    app.get('/checkIdDuplicate/:userid',(req,res)=>{
        const userAgent = req.header('user-agent');
        console.log(userAgent);
        const userid = req.params.userid;
        const doit = async ()=>{
            var checkUserid = await checkIdDuplicate(userid);
            console.log(`db내부에 아이디가 있나?${checkUserid}`);
            console.log(`db내부에 아이디가 있나2?${JSON.stringify(checkUserid)}`);
            
            if(checkUserid === '200'){
                //중복이 없을때 (회원가입 해도될때) 200을 보냄
                res.json('200');
            }else{
                //중복이 있을때 (회원가입 하면 안될때) 100을 보냄
                res.json('100');
            }
            
        }
        doit();
    })


    app.get('/getMyBalance/:userAccount',(req,res)=>{
        const userAgent = req.header('user-agent');
        console.log(userAgent);
        const userAccount = req.params.userAccount;
        console.log(`getMyBalance 의 유저 어카운트 : ${userAccount}`);
        //balanceInquiry(userAccount);
        const userAccountValue = {
            'userAccountValue':1200
        }
        res.json(userAccountValue);
        //res.json(balanceInquiry(userAccount));
    })

}
