const express = require('express');
const webpush = require('web-push');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({limit:'20kb'}));
app.use(express.static(path.join(__dirname,'public')));
// Demo-only: VAPID keys and subscription live in memory, so redeploy/restart resets them.
const keys = webpush.generateVAPIDKeys();
webpush.setVapidDetails('mailto:push-test@example.com',keys.publicKey,keys.privateKey);
let subscription = null;
app.get('/api/key',(req,res)=>res.json({publicKey:keys.publicKey}));
app.post('/api/subscribe',(req,res)=>{
  const s=req.body;
  if (!s?.endpoint || !s?.keys?.auth || !s?.keys?.p256dh) return res.status(400).json({error:'Invalid push subscription'});
  subscription=s;
  res.json({ok:true});
});
app.post('/api/test',(req,res)=>{
  if(!subscription) return res.status(400).json({error:'First enable notifications on your iPhone.'});
  res.json({ok:true,message:'Push scheduled in 15 seconds. Lock your iPhone now.'});
  setTimeout(async()=>{
    try { await webpush.sendNotification(subscription,JSON.stringify({title:'It works! 🎉',body:'This push arrived from the internet while your app was closed.',url:'/'})); console.log('Push sent'); }
    catch(e) { console.error('Push failed:',e.statusCode,e.message); if(e.statusCode===404||e.statusCode===410) subscription=null; }
  },15000);
});
app.listen(PORT,'0.0.0.0',()=>console.log(`Listening on ${PORT}`));
