import { GoogleGenAI } from '@google/genai';

interface UpcycleDesignInput {
  garmentType?: string;
  condition?: string;
  material?: string;
  desiredStyle?: string;
  notes?: string;
  userPhotoBase64?: string;
}

interface UpcycleDesignResponse {
  success: true;
  source: 'curated-fallback' | 'gemini-3.8-flash' | 'error-fallback';
  ideas: unknown[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readString(input: Record<string, unknown>, key: keyof UpcycleDesignInput) {
  const value = input[key];
  return typeof value === 'string' ? value : undefined;
}

function getCuratedUpcycleIdeas(garmentType: string, desiredStyle: string) {
  return [
    {
      title: `${garmentType} Sashiko Reconstruction`,
      aesthetic: `${desiredStyle || 'Streetwear Kontemporer'} x Wabi-Sabi`,
      difficulty: 'Sedang',
      estimatedTailorHours: 4,
      estimatedCost: 'Rp 110.000 - Rp 140.000',
      deconstructionSteps: [
        `Bongkar panel utama dari ${garmentType.toLowerCase()} pada garis kelim samping`,
        'Bentuk pola siluet cropped boxy dengan aksen drop-shoulder',
        'Tambahkan sulam dekoratif sashiko motif ombak (seigaiha) pada saku dan panel bahu',
        'Finishing dengan piping kain katun perca kontras',
      ],
      tailoringTips: 'Gunakan jarum jahit denim no. 16 dan benang katun tebal untuk aksen sulam agar jahitan tegas.',
      recommendedAdditionalFabrics: 'Kain perca denim washed 12oz atau kanvas katun organik',
      fitProfile: 'Regular Fit',
      previewColorPrimary: '#2C4C64',
      previewColorAccent: '#D97706',
    },
    {
      title: 'Modular Utility Cargo Rework',
      aesthetic: 'Gorpcore Utilitarian Urban',
      difficulty: 'Mudah',
      estimatedTailorHours: 3,
      estimatedCost: 'Rp 85.000 - Rp 115.000',
      deconstructionSteps: [
        'Potong bagian lengan dan buat armhole berlekuk santai',
        'Alih fungsikan saku celana atau kemeja bekas menjadi 3 kantong kompartemen depan',
        'Pasang buckle rilis samping atau tali webbing untuk pengaturan kelonggaran baju',
      ],
      tailoringTips: 'Jahit bartack pada setiap sudut saku untuk menahan beban barang bawaan harian.',
      recommendedAdditionalFabrics: 'Tali webbing katun 2.5cm dan ritsleting gigi besi',
      fitProfile: 'Relaxed Fit',
      previewColorPrimary: '#3F4E3E',
      previewColorAccent: '#1B4332',
    },
    {
      title: 'Asymmetric Patchwork Corset Vest',
      aesthetic: 'Avant-Garde Sustainable Chic',
      difficulty: 'Mahir',
      estimatedTailorHours: 5.5,
      estimatedCost: 'Rp 140.000 - Rp 180.000',
      deconstructionSteps: [
        'Iris kain menjadi 8 panel geometris vertikal mengikuti lekuk pinggang',
        'Pasang piping boning plastik elastis pada 4 seam utama agar siluet tetap tegak',
        'Pasang eyelet logam dan tali pita katun di punggung belakang untuk sistem lace-up fit',
      ],
      tailoringTips: 'Beri lining kain furing katun adem di bagian dalam agar nyaman bersentuhan langsung dengan kulit.',
      recommendedAdditionalFabrics: 'Kain perca flanel kotak atau linen natural',
      fitProfile: 'Slim Fit',
      previewColorPrimary: '#4A3B32',
      previewColorAccent: '#B45309',
    },
  ];
}

export async function generateUpcycleDesign(
  payload: unknown,
  apiKey: string | undefined
): Promise<UpcycleDesignResponse> {
  const body = isRecord(payload) ? payload : {};
  const input: UpcycleDesignInput = {
    garmentType: readString(body, 'garmentType'),
    condition: readString(body, 'condition'),
    material: readString(body, 'material'),
    desiredStyle: readString(body, 'desiredStyle'),
    notes: readString(body, 'notes'),
    userPhotoBase64: readString(body, 'userPhotoBase64'),
  };

  const garmentType = input.garmentType || 'Baju Bekas';
  const desiredStyle = input.desiredStyle || 'Streetwear';

  if (!apiKey) {
    console.log('No GEMINI_API_KEY found in environment. Using curated AI concepts.');
    return {
      success: true,
      source: 'curated-fallback',
      ideas: getCuratedUpcycleIdeas(input.garmentType || 'Pakaian Bekas', input.desiredStyle || 'Streetwear'),
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const promptText = `Anda adalah Direktur Kreatif & Kepala Pola Upcycling Fashion di TRIVEST.
Buatkan 3 konsep desain upcycling (daur ulang baju bekas) yang sangat kreatif, modis, dan siap dijahit oleh penjahit lokal.

Data Pakaian Bekas:
- Jenis Pakaian: ${input.garmentType || 'Baju Bekas'}
- Kondisi Bahan: ${input.condition || 'Layak pakai'}
- Material: ${input.material || 'Katun / Denim'}
- Gaya Target: ${input.desiredStyle || 'Streetwear Kontemporer'}
- Catatan Khusus: ${input.notes || 'Prioritaskan potongan pakaian yang pas di badan dan minim sisa kain'}

KEMBALIKAN HANYA JSON ARRAY MURNI (VALID JSON) tanpa markdown formatting atau kutipan pembuka, dengan struktur persis berikut untuk 3 konsep:
[
  {
    "title": "Nama konsep desain menarik (misal: Boro Sashiko Denim Rework)",
    "aesthetic": "Deskripsi gaya estetika singkat",
    "difficulty": "Mudah" | "Sedang" | "Mahir",
    "estimatedTailorHours": 4,
    "estimatedCost": "Rp 90.000 - Rp 130.000",
    "deconstructionSteps": [
      "Langkah dekonstruksi 1",
      "Langkah pola & potong 2",
      "Langkah rekonstruksi 3",
      "Langkah finishing 4"
    ],
    "tailoringTips": "Instruksi teknis praktis untuk penjahit lokal",
    "recommendedAdditionalFabrics": "Saran bahan perca tambahan jika dibutuhkan",
    "fitProfile": "Relaxed Fit" | "Regular Fit" | "Slim Fit",
    "previewColorPrimary": "#2C4C64",
    "previewColorAccent": "#D97706"
  }
]`;

    const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [
      { text: promptText },
    ];

    if (input.userPhotoBase64?.includes('base64,')) {
      const match = input.userPhotoBase64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      if (match) {
        parts.push({
          inlineData: {
            mimeType: match[1],
            data: match[2],
          },
        });
      }
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [{ role: 'user', parts }],
    });

    const cleanedText = (response.text || '')
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/, '')
      .trim();

    try {
      const parsed: unknown = JSON.parse(cleanedText);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return {
          success: true,
          source: 'gemini-3.8-flash',
          ideas: parsed,
        };
      }
    } catch (parseError) {
      console.warn('JSON parse error from Gemini output, falling back:', parseError);
    }

    return {
      success: true,
      source: 'curated-fallback',
      ideas: getCuratedUpcycleIdeas(garmentType, desiredStyle),
    };
  } catch (error: unknown) {
    console.error('Error generating upcycle design with Gemini:', error);
    return {
      success: true,
      source: 'error-fallback',
      ideas: getCuratedUpcycleIdeas('Baju Bekas', 'Streetwear'),
    };
  }
}
