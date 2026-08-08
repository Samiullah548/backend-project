import fs from "fs";
import os from "os";
import path from "path";
import multer from "multer";

const uploadDir = path.join(os.tmpdir(), "my-uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname) || "";
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  }
});

export const upload = multer({ storage });