module.exports = (app,fs,admin,firestore,serviceAccount,join,userlogin)=>{
    
    
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
}
