const fs = require('fs');
const path = require('path');

// Eleven Labs for TTS generation from Text flies
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = 'pNInz6obpgDQGcFmaJgB';    // Adam — professional male
const MODEL_ID = 'eleven_turbo_v2_5';       // Best cost-to-quality ratio
const MAX_CHARS = 4500;                     // ElevenLabs safe limit per request

function splitIntoChunks(text, maxChars) {
    if (text.length <= maxChars) return [text];

    const sentences = text.split(/(?<=[.!?])\s+/);
    const chunks = [];
    let current = '';

    for (const sentence of sentences) {
        if (sentence.length > maxChars) {
            if (current) {
                chunks.push(current.trim()); current = '';
            }

            const words = sentence.split(' ');
            let chunk = '';

            for (const word of words) {
                if ((chunk + ' ' + word).length > maxChars) {
                    chunks.push(chunk.trim());
                    chunk = word;
                }
                else {
                    chunk += (chunk ? ' ' : '') + word;
                }
            }
            if (chunk)
                current = chunk;
        }
        else if ((current + ' ' + sentence).length > maxChars) {
            chunks.push(current.trim());
            current = sentence;
        }
        else {
            current += (current ? ' ' : '') + sentence;
        }
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks;
}

async function generateAudio(text, outputPath) {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
            'xi-api-key': ELEVENLABS_API_KEY,
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg'
        },
        body: JSON.stringify({
            text,
            model_id: MODEL_ID,
            voice_settings: { stability: 0.5, similarity_boost: 0.75 }
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`ElevenLabs API error ${response.status}: ${errorText}`);
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(buffer));

    console.log(`  Saved: ${path.basename(outputPath)}`);
}

async function main() {
    if (!ELEVENLABS_API_KEY) {
        console.error('Error: ELEVENLABS_API_KEY environment variable is not set');
        process.exit(1);
    }

    const textFilesDir = path.resolve(__dirname, '..', 'text_files');
    const audioFilesDir = path.resolve(__dirname, '..', 'audio_files');

    const textFiles = fs.readdirSync(textFilesDir)
        .filter(f => f.endsWith('.txt'))
        .sort();

    console.log(`Found ${textFiles.length} text files\n`);

    for (const textFile of textFiles) {
        const baseName = textFile.replace(/_Text\.txt$/i, '').replace(/\.txt$/i, '');
        const outputDir = path.join(audioFilesDir, `Audio_Files_${baseName}`);

        if (fs.existsSync(outputDir)) {
            const existing = fs.readdirSync(outputDir).filter(f => f.endsWith('.mp3'));
            if (existing.length > 0) {
                console.log(`Skipping ${textFile} (${existing.length} part(s) already exist)`);
                continue;
            }
        }

        const text = fs.readFileSync(path.join(textFilesDir, textFile), 'utf8').trim();
        const chunks = splitIntoChunks(text, MAX_CHARS);

        console.log(`Processing ${textFile} → ${chunks.length} part(s)...`);
        fs.mkdirSync(outputDir, { recursive: true });

        for (let i = 0; i < chunks.length; i++) {
            const outputPath = path.join(outputDir, `${baseName}_Part_${i + 1}.mp3`);
            try {
                await generateAudio(chunks[i], outputPath);
            }
            catch (err) {
                console.error(`  Error on part ${i + 1}: ${err.message}`);
            }
            if (i < chunks.length - 1)
                await new Promise(r => setTimeout(r, 300));
        }

        await new Promise(r => setTimeout(r, 200));
    }

    console.log('\nAll done!');
}

main().catch(console.error);
