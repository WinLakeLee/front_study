import exif from "blueimp-load-image";
import { z } from "zod";

export type ProcessedImage = {
  file: File;
};

export type ProcessImageOptions = {
  orientation: boolean;
  meta: boolean;
  canvas: boolean;
};

const options: ProcessImageOptions = {
  orientation: true,
  meta: true,
  canvas: true,
};

export const imageExifErrorSchema = z.object({
  type: z.enum(["FAILED_TO_REPLACE_HEAD", "FAILED_TO_CREATE_BLOB_FROM_CANVAS"]),
  message: z.string(),
  originalError: z.instanceof(Error).optional(),
  fileName: z.string().optional(),
});

export type ImageExifError = z.infer<typeof imageExifErrorSchema>;

export function processImageWithExif(files: File[]): Promise<ProcessedImage[]> {
  return Promise.all(files.map((file) => exifProcessor(file)));
}

export function exifProcessor(file: File): Promise<ProcessedImage> {
  return new Promise((resolve, reject) => {
    exif(
      file,
      function (img, data) {
        if (data?.imageHead && data?.exif && data?.exifOffsets) {
          // EXIF 데이터가 있는 경우 Orientation 값을 1(정방향)로 변경
          exif.writeExifData(
            data.imageHead,
            { exifOffsets: data.exifOffsets, exif: data.exif },
            "Orientation",
            1,
          );

          (img as HTMLCanvasElement).toBlob(function (blob) {
            if (blob) {
              if (data.imageHead) {
                exif.replaceHead(blob, data.imageHead, (newFile) => {
                  if (newFile) {
                    resolve({
                      file: new File([newFile], file.name, {
                        type: file.type,
                      }),
                    });
                  } else {
                    reject(
                      createExifError({
                        type: "FAILED_TO_REPLACE_HEAD",
                        message: "Failed to replace head",
                      }),
                    );
                  }
                });
              }
            } else {
              reject(
                createExifError({
                  type: "FAILED_TO_CREATE_BLOB_FROM_CANVAS",
                  message: "Failed to create blob from canvas",
                }),
              );
            }
          }, file.type);
        } else {
          // EXIF 데이터가 없는 경우 원본 파일 그대로 사용
          resolve({
            file,
          });
        }
      },
      options,
    );
  });
}

function createExifError({
  type,
  message,
  originalError,
  fileName,
}: {
  type: ImageExifError["type"];
  message: string;
  originalError?: unknown;
  fileName?: string;
}): ImageExifError {
  return {
    type,
    message,
    originalError: originalError instanceof Error ? originalError : undefined,
    fileName,
  };
}

export function isImageExifError(error: unknown): error is ImageExifError {
  return imageExifErrorSchema.safeParse(error).success;
}
