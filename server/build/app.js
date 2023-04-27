"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("@pnp/sp-commonjs/webs");
require("@pnp/sp-commonjs/items");
const sp_commonjs_1 = require("@pnp/sp-commonjs");
const nodejs_commonjs_1 = require("@pnp/nodejs-commonjs");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const userRoute = require("./routes/userRoute");
const app = (0, express_1.default)();
const port = 3001;
``;
app.use((0, cors_1.default)({ origin: "*" }));
app.use((0, morgan_1.default)('tiny'));
app.use((0, express_fileupload_1.default)());
sp_commonjs_1.sp.setup({
    sp: { fetchClientFactory: () => {
            return new nodejs_commonjs_1.SPFetchClient("https://2mxff3.sharepoint.com/sites/UserVibitha", "878bb089-9698-4f38-a93f-f50270a1946b", "DJbs0nlHUfxDlsAas59slxey6pDNLJeka5nzXH+NpHs=");
        } },
});
app.use(express_1.default.json());
app.use("/api", userRoute);
app.listen(port, () => {
    console.log(`connected successfully on port ${port}`);
});
