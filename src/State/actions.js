export const CREDENTIALS = 'CREDENTIALS'
export const ISLOGGEDIN = 'ISLOGGEDIN'
// Action creators


export const credentials=(data)=>{
    console.log(data)
    return ({
    type: CREDENTIALS,
    data: data
})}

export const loggedin=(data)=>({
    type: ISLOGGEDIN,
    data: data
})