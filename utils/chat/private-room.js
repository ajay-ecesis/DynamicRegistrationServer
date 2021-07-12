const users = []

module.exports={
    userJoin:(id,sender,receiver)=>{
        const user = {id,sender,receiver}

 if(sender!=''||receiver!='')
 {

        users.push(user)
   
        return user;
    }
    else
    {
        console.log("thsi is fake");
    }
    },
    getCurrentUser:(id)=>
    {
      
        return users.find(user=> user.id===id)
    }
}
