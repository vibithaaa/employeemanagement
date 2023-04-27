import express,{Application,Request,Response} from 'express'
require("@pnp/sp-commonjs/webs");
require("@pnp/sp-commonjs/items");
import { sp } from "@pnp/sp-commonjs";
import { SPFetchClient } from "@pnp/nodejs-commonjs";
import cors from 'cors';
import morgan from 'morgan'
import fileUpload from "express-fileupload"
 const userRoute = require("./routes/userRoute")


const app:Application=express();
const port:number=3001;``

app.use(cors({ origin: "*" }));
app.use(morgan('tiny'))
app.use(fileUpload())
sp.setup({

 sp: {fetchClientFactory: () =>{ return new SPFetchClient(

"https://2mxff3.sharepoint.com/sites/UserVibitha",
"878bb089-9698-4f38-a93f-f50270a1946b",
 "DJbs0nlHUfxDlsAas59slxey6pDNLJeka5nzXH+NpHs=")}}, });


 app.use(express.json())
app.use("/api",userRoute)
app.listen(port,()=>{

 console.log(`connected successfully on port ${port}`)

})