const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const Replicate = require("replicate");
require("dotenv").config();

// Replicate 서비스 로그인
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// 웹사이트에서 호출할 'generateInteriorV2' API 생성
exports.generateInteriorV2 = onRequest({ cors: true }, async (req, res) => {
  // 보안: POST 방식의 요청만 받음
  if (req.method !== "POST") {
    return res.status(405).send("POST 요청만 허용됩니다.");
  }

  try {
    logger.info("프론트엔드에서 요청이 들어왔습니다!", req.body);

    // AI 모델 호출 (방 사진 구조 유지 + 스타일 변경)
    const output = await replicate.run(
      "jagilley/controlnet-hough:854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
      {
        input: {
          image: req.body.imageUrl, // 유저가 웹에서 올린 사진 URL
          prompt: req.body.prompt || "a beautiful modern living room, bright light, minimalist furniture", // 원하는 스타일
          num_samples: 1,
        },
      }
    );

    // AI 변환 성공 시, 생성된 이미지 링크를 프론트엔드로 다시 보내줌
    res.status(200).json({ resultImage: output[1] });
    
  } catch (error) {
    logger.error("AI 변환 중 에러 발생:", error);
    res.status(500).json({ error: "이미지 변환 중 문제가 발생했습니다." });
  }
});
