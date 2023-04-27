"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const sp_commonjs_1 = require("@pnp/sp-commonjs");
const getContentType_1 = __importDefault(require("../utils/getContentType"));
//get users
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield sp_commonjs_1.sp.web.lists.getByTitle("Contacts").items.getAll();
        res.status(200).json({
            "success": true,
            "message": "Fetched all employee",
            users
        });
    }
    catch (_a) {
        console.log("error fetching users");
        res.status(500).json({
            "success": false,
            "message": "internal server error",
        });
    }
}));
//Add user
router.post("/adduser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield sp_commonjs_1.sp.web.lists.getByTitle("Contacts").items.add({
            Title: req.body.Title,
            email: req.body.email,
            designation: req.body.designation,
        });
        console.log("successfully added to list");
        const folderName = response.data.Id;
        console.log(folderName);
        //Add folder
        const documentLibraryName = "test";
        const newFolderName = `${folderName}`;
        const documentLibrary = sp_commonjs_1.sp.web.lists.getByTitle(documentLibraryName);
        yield documentLibrary.rootFolder.folders
            .addUsingPath(newFolderName)
            .then(() => {
            console.log(`folder ${newFolderName} created succesfully`);
        })
            .catch((error) => {
            console.log(`error creating folder:${error}`);
        });
        res.status(200).json({
            success: true,
            message: "New user added",
            folderName
        });
    }
    catch (error) {
        console.log(error);
    }
}));
router.delete("/delete/:Id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Id } = req.params;
    console.log(Id);
    const id = parseInt(Id);
    //delete list
    const resp = yield sp_commonjs_1.sp.web.lists.getByTitle("Contacts").items.getById(id).delete();
    //delete folder
    const folderUrl = `test/${Id}`;
    yield sp_commonjs_1.sp.web.getFolderByServerRelativePath(folderUrl).delete()
        .then(() => {
        console.log(`folder ${Id} deleted successully `);
    })
        .catch((error) => {
        console.error(`Error deleting folder:${error}`);
    });
}));
router.put("/updateuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    const id = parseInt(newUser.Id);
    yield sp_commonjs_1.sp.web.lists.getByTitle("Contacts").items.getById(id).update({
        Title: newUser.Title,
        email: newUser.Email,
        designation: newUser.Designation,
        City: newUser.City,
        Phone: newUser.Phone,
        DOB: newUser.DOB,
        Gender: newUser.Gender,
    });
}));
//get file
router.get("/files/:Id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Id } = req.params;
    try {
        const folder = yield sp_commonjs_1.sp.web.getFolderByServerRelativePath(`test/${Id}`).files.get();
        console.log(folder, "ff");
        const files = folder.map((file) => {
            console.log(file, "filess");
            return file;
        });
        res.status(200).json(files);
    }
    catch (error) {
        console.error(error);
    }
}));
// document page upload
router.put("/document/:Id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { Id } = req.params;
    const file = (_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.file;
    console.log("imagetype", file);
    if (!file) {
        console.error('No file selected');
        return res.status(400).json({
            success: false,
            message: 'No file selected',
        });
    }
    const documentLibraryName = `test/${Id}`;
    const fileNamePath = file.name;
    let result;
    if ((file === null || file === void 0 ? void 0 : file.size) <= 10485760) {
        // small upload
        console.log('Starting small file upload');
        result = yield sp_commonjs_1.sp.web.getFolderByServerRelativePath(documentLibraryName).files.addUsingPath(fileNamePath, file.data, { Overwrite: true });
    }
    else {
        // large upload
        console.log('Starting large file upload');
        result = yield sp_commonjs_1.sp.web.getFolderByServerRelativePath(documentLibraryName).files.addChunked(fileNamePath, file, () => {
            console.log(`Upload progress: `);
        }, true);
    }
    res.status(200).json("success");
}));
//image upload
router.put("/image/:Id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    const { Id } = req.params;
    console.log(Id);
    let image = (_c = req === null || req === void 0 ? void 0 : req.files) === null || _c === void 0 ? void 0 : _c.image;
    const id = parseInt(Id);
    console.log("imagetype", image);
    if (!image) {
        console.error('No file selected');
        return res.status(400).json({
            success: false,
            message: 'No file selected',
        });
    }
    const documentLibraryName = `test/${id}`;
    const fileNamePath = `image.jpg`;
    let result;
    if ((image === null || image === void 0 ? void 0 : image.size) <= 10485760) {
        // small upload
        console.log('Starting small file upload');
        result = yield sp_commonjs_1.sp.web.getFolderByServerRelativePath(documentLibraryName).files.addUsingPath(fileNamePath, image.data, { Overwrite: true });
    }
    else {
        // large upload
        console.log('Starting large file upload');
        result = yield sp_commonjs_1.sp.web.getFolderByServerRelativePath(documentLibraryName).files.addChunked(fileNamePath, image, () => {
            console.log(`Upload progress: `);
        }, true);
    }
    console.log('Server relative URL:', (_d = result === null || result === void 0 ? void 0 : result.data) === null || _d === void 0 ? void 0 : _d.ServerRelativeUrl);
    const url = `https://2mxff3.sharepoint.com${(_e = result === null || result === void 0 ? void 0 : result.data) === null || _e === void 0 ? void 0 : _e.ServerRelativeUrl}`;
    const list = sp_commonjs_1.sp.web.lists.getByTitle('Contacts');
    try {
        yield list.items.getById(id).update({
            ImageUrl: url,
        });
        console.log('File upload successful');
        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
        });
    }
    catch (error) {
        console.error('Error while updating item:', error);
        res.status(500).json({
            success: false,
            message: 'Error while updating item',
        });
    }
}));
router.get("/document/download", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serverRelativePath = req.query.serverRelativePath;
    const file = sp_commonjs_1.sp.web.getFileByServerRelativePath(serverRelativePath);
    const buffer = yield file.getBuffer();
    const fileName = serverRelativePath.split('/').pop() || ''; // get the file name with extension
    const contentType = (0, getContentType_1.default)(fileName); // get the content type based on file extension
    res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-type', contentType);
    res.status(200).send(Buffer.from(buffer));
}));
module.exports = router;
