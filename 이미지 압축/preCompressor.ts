import imageCompression from "browser-image-compression";
import { allowedImageMimeTypes } from "shared/bigpictureAllowedMimeType";
import { z } from "zod";

export type ProgressCallback = (args: {
  progress: number;
  currentFileIndex: number;
  totalFiles: number;
}) => void;

export const imageCompressionErrorSchema = z.object({
  type: z.enum([
    "UNSUPPORTED_FILE_TYPE",
    "COMPRESSION_FAILED",
    "VALIDATION_ERROR",
  ]),
  message: z.string(),
  originalError: z.instanceof(Error).optional(),
  fileName: z.string().optional(),
});

export type ImageCompressionError = z.infer<typeof imageCompressionErrorSchema>;

export type ImageCompressionOptions = {
  onProgress?: ProgressCallback;
  maxSizeMB?: number;
  useWebWorker?: boolean;
};

type ImageCompressorParams = {
  files: File[];
  options?: ImageCompressionOptions;
};

export function imageCompressor({
  files,
  options = {},
}: ImageCompressorParams): Promise<File[]> {
  return compressImages({ files, options });
}

async function compressImages({
  files,
  options,
}: ImageCompressorParams): Promise<File[]> {
  if (!files.length) {
    return [];
  }

  // 파일 타입 검증
  validateFileTypes({ files });

  // 압축 설정
  const compressionOptions = {
    maxSizeMB: options?.maxSizeMB ?? 5,
    useWebWorker: options?.useWebWorker ?? true,
  };

  try {
    // 모든 이미지를 동시에 압축
    const compressionPromises = files.map(async (file, index) => {
      try {
        const compressedFile = await imageCompression(file, {
          ...compressionOptions,
          onProgress: (progress) => {
            options?.onProgress?.({
              progress,
              currentFileIndex: index,
              totalFiles: files.length,
            });
          },
        });

        return compressedFile;
      } catch (error) {
        throw createCompressionError({
          type: "COMPRESSION_FAILED",
          message: `Failed to compress ${file.name}`,
          originalError: error,
          fileName: file.name,
        });
      }
    });

    const compressedFiles = await Promise.all(compressionPromises);
    return compressedFiles;
  } catch (error) {
    if (isImageCompressionError(error)) {
      throw error;
    }
    throw createCompressionError({
      type: "COMPRESSION_FAILED",
      message: "An unexpected error occurred while compressing images",
      originalError: error,
    });
  }
}

function validateFileTypes({ files }: { files: File[] }): void {
  for (const file of files) {
    if (!allowedImageMimeTypes.includes(file.type)) {
      throw createCompressionError({
        type: "UNSUPPORTED_FILE_TYPE",
        message: `Unsupported file type: ${file.type}`,
        fileName: file.name,
      });
    }
  }
}

function createCompressionError({
  type,
  message,
  originalError,
  fileName,
}: {
  type: ImageCompressionError["type"];
  message: string;
  originalError?: unknown;
  fileName?: string;
}): ImageCompressionError {
  return {
    type,
    message,
    originalError: originalError instanceof Error ? originalError : undefined,
    fileName,
  };
}

/**
 * 주어진 객체가 이미지 압축 에러인지 확인합니다.
 *
 * @param error - 확인할 객체
 * @returns 이미지 압축 에러 여부
 */
export function isImageCompressionError(
  error: unknown,
): error is ImageCompressionError {
  return imageCompressionErrorSchema.safeParse(error).success;
}
