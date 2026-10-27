self.addEventListener('push',event=>{
  let data={title:'Push test',body:'It works!'};
  try { if(event.data)data=event.data.json(); } catch(e) {}
  event.waitUntil(self.registration.showNotification(data.title||'Push test',{body:data.body||'Notification received',icon:'/icon-192.png',badge:'/icon-192.png',data:{url:data.url||'/'}}));
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(async wins=>{
    const target=new URL(event.notification.data?.url||'/',self.location.origin).href;
    for(const w of wins){if(w.url===target && 'focus' in w)return w.focus();}
    return clients.openWindow(target);
  }));
});
