let credentialdata=JSON.parse(localStorage.getItem("credential"))
if(credentialdata==undefined)
  credentialdata={email:"",name:"",token:""}
const initialvalue = {
    credentials:{email:credentialdata.email || "",name:credentialdata.name||"",token:credentialdata.token||""},
    isLoggedin:credentialdata.isLoggedin
};
export default initialvalue;