import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: "danw1yrjm",
  api_key: "635461316387877",
  api_secret: "52NjBXRMQzs7eB-hxNVfuUBRj44",
});

interface CloudinaryUploadResult {
  public_id: string;
  [key: string]: string | number | boolean | object; // Not sure -- tweek as needed
}

const uploadOnCloudinary = async (file: File) => {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "next-cloudinary-uploads" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        );
        uploadStream.end(buffer);
      }
    );
    return NextResponse.json(
      {
        publicId: result.public_id,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("UPload image failed", error);
    return NextResponse.json({ error: "Upload image failed" }, { status: 500 });
  }
};

export { uploadOnCloudinary };

// Configuration
// cloudinary.config({
//     cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
// });

// export async function POST(request: NextRequest) {
//     try {
//         const formData = await request.formData();
//         const file = formData.get("file") as File | null;

//         if(!file){
//             return NextResponse.json({error: "File not found"}, {status: 400})
//         }

//         const bytes = await file.arrayBuffer()
//         const buffer = Buffer.from(bytes)

//         const result = await new Promise<CloudinaryUploadResult>(
//             (resolve, reject) => {
//                 const uploadStream = cloudinary.uploader.upload_stream(
//                     {folder: "next-cloudinary-uploads"},
//                     (error, result) => {
//                         if(error) reject(error);
//                         else resolve(result as CloudinaryUploadResult);
//                     }
//                 )
//                 uploadStream.end(buffer)
//             }
//         )
//         return NextResponse.json(
//             {
//                 publicId: result.public_id
//             },
//             {
//                 status: 200
//             }
//         )

//     } catch (error) {
//         console.log("UPload image failed", error)
//         return NextResponse.json({error: "Upload image failed"}, {status: 500})
//     }

// }
