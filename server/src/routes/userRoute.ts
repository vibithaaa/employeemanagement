const router = require("express").Router();
import { Application,Request,Response } from "express";
import { sp } from "@pnp/sp-commonjs";
import { error } from "console";
import getContentType from "../utils/getContentType";


 //get users

router.get("/users",async(req:Request,res:Response)=>{
    try{
        const users= await sp.web.lists.getByTitle("Contacts").items.getAll()

        res.status(200).json({
            "success": true,
            "message": "Fetched all employee",
           users

        })
    }catch{
        console.log("error fetching users")
        res.status(500).json({
            "success": false,
            "message": "internal server error",

        })
    }
})

//Add user

router.post("/adduser",async(req:Request,res:Response)=>{

    try{
        const response = await sp.web.lists.getByTitle("Contacts").items.add({
            Title:req.body.Title,
            email:req.body.email,
            designation :req.body.designation,
            

        });
        console.log("successfully added to list")
        const folderName = response.data.Id
        console.log(folderName)

        //Add folder

        const documentLibraryName = "test";
        const newFolderName =`${folderName}`;


        const documentLibrary=sp.web.lists.getByTitle(documentLibraryName);
        await documentLibrary.rootFolder.folders
        .addUsingPath(newFolderName)
        .then(()=>{
            console.log(`folder ${newFolderName} created succesfully`);
        })
       .catch((error)=>{
            console.log(`error creating folder:${error}`)
        });

        res.status(200).json({
            success: true,          
            message: "New user added",
            folderName
            
            });
       
     }catch(error){
    console.log(error)
     }
    
})

router.delete("/delete/:Id",async(req:Request,res:Response)=>{
    const{Id}= req.params
    console.log(Id)
    const id = parseInt(Id)
    //delete list
    const resp = await sp.web.lists.getByTitle("Contacts").items.getById(id).delete();
    //delete folder
    const folderUrl=`test/${Id}`
    await sp.web.getFolderByServerRelativePath(folderUrl).delete()
    .then(()=>{
        console.log(`folder ${Id} deleted successully `);
    })
    .catch((error:any)=>{
        console.error(`Error deleting folder:${error}`);
    });
})

router.put("/updateuser",async(req:Request,res:Response)=>{
    const newUser = req.body
    const id = parseInt(newUser.Id)
    await sp.web.lists.getByTitle("Contacts").items.getById(id).update({
        Title:newUser.Title,
        email:newUser.Email,
        designation:newUser.Designation,
        City:newUser.City,
        Phone:newUser.Phone,
        DOB:newUser.DOB,
        Gender:newUser.Gender,
});
})


//get file


router.get("/files/:Id", async(req : Request, res : Response)=>{
    const {Id} = req.params
   try {
    const folder = await sp.web.getFolderByServerRelativePath(`test/${Id}`).files.get()
    console.log(folder,"ff")
    const files = folder.map((file : any)=>{
      console.log(file,"filess")
      return file
    })
  res.status(200).json(files)
   }catch (error) {
    console.error(error)
   }
  })


// document page upload
  router.put("/document/:Id", async(req : Request, res : Response)=>{
    const {Id} = req.params
    const file = (req?.files as any)?.file
    console.log("imagetype",file)
  
     if (!file) {
      console.error('No file selected');
      return res.status(400).json({
        success: false,
        message: 'No file selected',
      });
    }
  
    const documentLibraryName = `test/${Id}`;
    const fileNamePath = file.name;
  
    let result: any;
    if (file?.size <= 10485760) {
      // small upload
      console.log('Starting small file upload');
      result = await sp.web.getFolderByServerRelativePath
      (documentLibraryName).files.addUsingPath(fileNamePath, file.data, { Overwrite: true });
    } else {
      // large upload
      console.log('Starting large file upload');
      result = await sp.web.getFolderByServerRelativePath(documentLibraryName).files.addChunked(fileNamePath, file, ()  => {
        console.log(`Upload progress: `);
      }, true);
    }
  
    res.status(200).json("success");
  })
    




  //image upload




  router.put("/image/:Id", async(req : Request, res : Response)=>{
    const { Id } = req.params;
    console.log(Id)
    let image = (req?.files as any)?.image;
   const id = parseInt(Id)
    console.log("imagetype",image)
  
    if (!image) {
      console.error('No file selected');
      return res.status(400).json({
        success: false,
        message: 'No file selected',
      });
    }
  
    const documentLibraryName = `test/${id}`;
    const fileNamePath = `image.jpg`;
  
    let result: any;
    if (image?.size <= 10485760) {

      // small upload
      console.log('Starting small file upload');
      result = await sp.web.getFolderByServerRelativePath
      (documentLibraryName).files.addUsingPath(fileNamePath, image.data, { Overwrite: true });
    } else {

      // large upload
      console.log('Starting large file upload');
      result = await sp.web.getFolderByServerRelativePath(documentLibraryName).files.addChunked(fileNamePath, image, ()  => {
        console.log(`Upload progress: `);
      }, true);
    }
  
    console.log('Server relative URL:', result?.data?.ServerRelativeUrl);
    const url = `https://2mxff3.sharepoint.com${result?.data?.ServerRelativeUrl}`;
  
    const list = sp.web.lists.getByTitle('Contacts');
  
    try {
      await list.items.getById(id).update({
        ImageUrl: url,
      });
  
      console.log('File upload successful');
      res.status(200).json({
        success: true,
        message: 'Image uploaded successfully',
      });
    } catch (error) {
      console.error('Error while updating item:', error);
      res.status(500).json({
        success: false,
        message: 'Error while updating item',
      });
    }
  })
  


  
  
  router.get("/document/download",async (req:Request, res: Response)=>{
    const serverRelativePath = req.query.serverRelativePath as string;
    const file = sp.web.getFileByServerRelativePath(serverRelativePath);
    const buffer: ArrayBuffer = await file.getBuffer();
    
    const fileName = serverRelativePath.split('/').pop() || ''; // get the file name with extension
    const contentType = getContentType(fileName); // get the content type based on file extension
  
    res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-type', contentType);
    res.status(200).send(Buffer.from(buffer));
  })



module.exports= router