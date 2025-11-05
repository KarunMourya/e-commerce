import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_request, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

export default multer({ storage }).single("file");
