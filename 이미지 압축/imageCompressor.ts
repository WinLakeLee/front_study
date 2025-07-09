/**
 * @fileoverview 이미지 파일 전처리 모듈
 *
 * 이 모듈은 업로드된 이미지 파일들을 처리하여 웹에서 사용할 수 있는 형태로 변환합니다.
 * 주요 기능은 다음과 같습니다:
 * 1. 이미지 압축을 통한 파일 크기 최적화
 * 2. 처리 진행상황 추적
 * 3. 에러 처리 및 복구
 */

import { z } from "zod";
import { exifProcessor, isImageExifError } from "./exif";
import { imageCompressor, isImageCompressionError } from "./preCompressor";

/**
 * 전처리 진행상황 콜백 함수 타입
 */
export type PreprocessorProgressCallback = (args: {
  /** 진행률 (0-100) */
  progress: number;
  /** 현재 처리 중인 파일 인덱스 */
  currentFileIndex: number;
  /** 전체 파일 개수 */
  totalFiles: number;
  /** 현재 처리 단계 */
  stage: "image_compression";
}) => void;

/**
 * 전처리 옵션 타입
 */
export type PreprocessorOptions = {
  /** 이미지 압축 설정 */
  imageCompression?: {
    /** 최대 파일 크기 (MB)
     * @default 1
     */
    maxSizeMB?: number;
  };
  /** 진행상황 콜백 */
  onProgress?: PreprocessorProgressCallback;
};

/**
 * 전처리 함수 파라미터 타입
 */
type PreprocessorParams = {
  /** 처리할 파일 배열 */
  files: File[];
  /** 전처리 옵션 */
  options?: PreprocessorOptions;
};

/**
 * 이미지 파일들을 전처리합니다.
 *
 * 이미지를 압축하여 최적화된 파일들을 반환합니다.
 *
 * @param params - 전처리 파라미터
 * @returns 전처리된 파일 배열
 * @throws PreprocessorError - 전처리 중 오류 발생 시
 */
export function preprocessor({
  files,
  options = {},
}: PreprocessorParams): Promise<File[]> {
  return processFiles({ files, options });
}

/**
 * 파일들을 순차적으로 처리합니다.
 *
 * @param params - 처리할 파일들과 옵션
 * @returns 처리된 파일 배열
 * @throws PreprocessorError - 처리 중 오류 발생 시
 */
async function processFiles({
  files,
  options,
}: {
  files: File[];
  options: PreprocessorOptions;
}): Promise<File[]> {
  if (files.length === 0) {
    return [];
  }

  try {
    const compressedFiles = await compressImages({
      files,
      options,
    });

    const processedExifFiles = await processExif({
      files: compressedFiles,
    });

    return processedExifFiles;
  } catch (error) {
    console.error(error);
    if (isPreprocessorError(error)) {
      throw error;
    }
    throw createPreprocessorError({
      type: "VALIDATION_ERROR",
      message: "An unexpected error occurred while processing files",
      originalError: error,
    });
  }
}

/**
 * 이미지들을 압축하여 파일 크기를 최적화합니다.
 *
 * @param params - 압축할 파일들과 옵션
 * @returns 압축된 파일 배열
 * @throws PreprocessorError - 압축 중 오류 발생 시
 */
async function compressImages({
  files,
  options,
}: {
  files: File[];
  options: PreprocessorOptions;
}): Promise<File[]> {
  try {
    const compressedFiles = await imageCompressor({
      files,
      options: {
        onProgress: ({
          progress,
          currentFileIndex,
          totalFiles,
        }: {
          progress: number;
          currentFileIndex: number;
          totalFiles: number;
        }) => {
          options.onProgress?.({
            progress,
            currentFileIndex,
            totalFiles,
            stage: "image_compression",
          });
        },
        maxSizeMB: options.imageCompression?.maxSizeMB,
      },
    });

    return compressedFiles;
  } catch (error) {
    throw createPreprocessorError({
      type: "IMAGE_COMPRESSION_FAILED",
      message: "Failed to compress images",
      originalError: error,
    });
  }
}

/**
 * EXIF 데이터를 처리합니다.
 * - 원본 이미지 파일에 EXIF 데이터가 있을 경우 회전 값(orientation)을 1로 변경합니다.
 *
 * @param files - 처리할 파일들
 * @returns 처리된 파일 배열
 * @throws PreprocessorError - EXIF 처리 중 오류 발생 시
 */
async function processExif({ files }: { files: File[] }): Promise<File[]> {
  try {
    const processedFiles = await Promise.all(
      files.map((file) => exifProcessor(file)),
    );

    return processedFiles.map((file) => file.file);
  } catch (error) {
    throw createPreprocessorError({
      type: "IMAGE_EXIF_FAILED",
      message: "Failed to process exif",
      originalError: error,
    });
  }
}

/**
 * 전처리 에러 스키마
 */
const preprocessorErrorSchema = z.object({
  /** 에러 타입 */
  type: z.enum([
    "IMAGE_COMPRESSION_FAILED",
    "VALIDATION_ERROR",
    "IMAGE_EXIF_FAILED",
  ]),
  /** 에러 메시지 */
  message: z.string(),
  /** 원본 에러 */
  originalError: z
    .union([
      z.instanceof(Error),
      z.object({
        type: z.string(),
        message: z.string(),
        originalError: z.instanceof(Error).optional(),
        fileName: z.string().optional(),
      }),
    ])
    .optional(),
  /** 에러가 발생한 파일명 */
  fileName: z.string().optional(),
});

/**
 * 전처리 에러 타입
 */
export type PreprocessorError = z.infer<typeof preprocessorErrorSchema>;

/**
 * 전처리 에러 객체를 생성합니다.
 *
 * @param params - 에러 정보
 * @returns 생성된 에러 객체
 */
function createPreprocessorError({
  type,
  message,
  originalError,
  fileName,
}: {
  type: PreprocessorError["type"];
  message: string;
  originalError?: unknown;
  fileName?: string;
}): PreprocessorError {
  return {
    type,
    message,
    originalError:
      isImageCompressionError(originalError) ||
      isImageExifError(originalError) ||
      originalError instanceof Error
        ? originalError
        : undefined,
    fileName,
  };
}

/**
 * 주어진 객체가 전처리 에러인지 확인합니다.
 *
 * @param error - 확인할 객체
 * @returns 전처리 에러 여부
 */
function isPreprocessorError(error: unknown): error is PreprocessorError {
  return preprocessorErrorSchema.safeParse(error).success;
}
