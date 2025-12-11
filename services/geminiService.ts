import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_IMAGE = 'gemini-2.5-flash-image';
const MODEL_TEXT = 'gemini-2.5-flash';

// Helper to strip data URL prefix if present
const stripBase64Header = (base64: string) => {
  return base64.replace(/^data:image\/[a-z]+;base64,/, '');
};

export const generatePostItCaricature = async (drawingBase64: string): Promise<string> => {
  try {
    const cleanBase64 = stripBase64Header(drawingBase64);
    
    const prompt = `이미지에서 포스트잇 부분을 추출하여 귀엽고 친근한 캐리커쳐 스타일로 변환하고, 예쁜 액자/앨범에 담아주세요.

중요한 지침:
1. 포스트잇을 잡고 있는 손가락, 테이블, 벽 등 포스트잇이 아닌 모든 배경은 완전히 제거해주세요
2. 포스트잇에 쓰여진 모든 텍스트는 정확히 그대로 유지해주세요
3. 그림 부분만 부드럽고 따뜻한 캐리커쳐로 다시 그려주세요
4. 파스텔 톤 색상을 사용하고, 선은 부드럽게 그려주세요
5. 캐리커쳐로 변환된 포스트잇을 예쁜 액자나 앨범 프레임 안에 자연스럽게 배치해주세요
6. 액자/프레임 스타일은 다음 중 하나를 선택해주세요:
   - 우드 톤의 따뜻한 나무 액자
   - 화이트/파스텔 컬러의 깔끔한 액자
   - 골드/실버 테두리의 우아한 액자
7. 액자는 세련되고 고급스러우면서도 캐리커쳐와 잘 어울리도록 디자인해주세요
8. 배경은 깨끗하고 단순하게 처리하되, 액자를 돋보이게 만들어주세요
9. 전체적으로 친근하고 사랑스러우면서도 멋진 느낌으로 만들어주세요
10. 최종 결과물은 액자에 담긴 포스트잇 캐리커쳐가 완성작처럼 보이도록 해주세요`;

    const response = await ai.models.generateContent({
      model: MODEL_IMAGE,
      contents: {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: 'image/png',
              data: cleanBase64
            }
          }
        ]
      }
    });

    // Extract image from response
    // The response for image generation usually contains inlineData in parts
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image generated for Post-it caricature");

  } catch (error) {
    console.error("Error generating post-it caricature:", error);
    throw error;
  }
};

export const generatePhotoCaricature = async (faceBase64: string, pose: string): Promise<string> => {
  try {
    const cleanBase64 = stripBase64Header(faceBase64);
    
    const prompt = `이 실사 사진 속 인물을 "${pose}" 포즈로 귀엽고 친근한 캐리커쳐 스타일로 그려주세요.

중요한 지침:
1. 사진 속 인물의 얼굴 특징(눈, 코, 입, 헤어스타일, 안경 등)을 잘 살려서 캐리커쳐로 표현해주세요
2. 선택된 포즈 "${pose}"를 자연스럽게 취하고 있는 모습으로 그려주세요
3. 파스텔 톤과 부드러운 선으로 친근하고 따뜻한 느낌을 표현해주세요
4. 전신 또는 상반신을 포함한 캐리커쳐로 그려주세요
5. 배경은 단순하고 깨끗하게 처리해주세요
6. 얼굴의 특징을 약간 과장하되 귀여운 느낌을 유지해주세요
7. 정사각형 비율로 그려주세요`;

    const response = await ai.models.generateContent({
      model: MODEL_IMAGE,
      contents: {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: 'image/png',
              data: cleanBase64
            }
          }
        ]
      }
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image generated for Photo caricature");
  } catch (error) {
    console.error("Error generating photo caricature:", error);
    throw error;
  }
};

export const analyzeImages = async (drawingBase64: string, faceBase64: string): Promise<AnalysisResult> => {
  try {
    const cleanDrawing = stripBase64Header(drawingBase64);
    const cleanFace = stripBase64Header(faceBase64);

    const prompt = `두 개의 이미지를 분석해주세요:
1. 첫 번째 이미지는 손으로 그린 그림이고, 두 번째 이미지는 실제 얼굴 사진입니다.
2. 두 이미지의 싱크로율을 0-100% 사이의 점수로 분석해주세요. (얼굴 형태, 눈 모양, 입 모양, 헤어스타일, 전체적인 분위기 등을 고려)
3. 실제 얼굴 사진을 관상학적 관점에서 분석해주세요. 친근하고 유머러스한 말투로 작성해주세요.`;

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        syncRate: { type: Type.NUMBER, description: "Percentage of similarity between 0 and 100" },
        syncAnalysis: { type: Type.STRING, description: "Fun analysis of the similarity" },
        physiognomy: { type: Type.STRING, description: "Friendly and humorous physiognomy analysis" }
      },
      required: ["syncRate", "syncAnalysis", "physiognomy"]
    };

    const response = await ai.models.generateContent({
      model: MODEL_TEXT,
      contents: {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: 'image/png',
              data: cleanDrawing
            }
          },
          {
            inlineData: {
              mimeType: 'image/png',
              data: cleanFace
            }
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    const text = response.text;
    if (!text) throw new Error("No text response for analysis");
    
    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Error analyzing images:", error);
    // Return fallback if AI fails (to avoid crashing the whole result flow)
    return {
      syncRate: 85,
      syncAnalysis: '분석 중 오류가 발생했지만, 두 이미지가 상당히 비슷해 보입니다! 😊',
      physiognomy: '밝고 긍정적인 에너지가 느껴지는 관상이네요! (AI 분석 오류로 인한 기본 메시지입니다)'
    };
  }
};
