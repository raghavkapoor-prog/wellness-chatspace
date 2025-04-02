
import { toast } from 'sonner';

// Gemini API service with actual API implementation
export const getGeminiResponse = async (prompt: string): Promise<string> => {
  console.log('Prompt sent to Gemini:', prompt);
  
  try {
    const apiKey = 'AIzaSyB6AIyXA6VMlo_oR5ZmEfwVxhX7YpVczMI';
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    
    const response = await fetch(`${url}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a fitness and wellness expert assistant that provides evidence-based advice, tips, and information. 
                Focus on personalized fitness guidance, nutrition advice, weight management strategies, and overall health improvement. 
                Answer the following query in a helpful, accurate, and supportive manner: ${prompt}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the response text from the Gemini API response
    if (data.candidates && data.candidates.length > 0 && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error('Unexpected Gemini API response structure:', data);
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    
    // Fallback responses for when the API fails
    const fallbackResponses = [
      "I'm currently having trouble connecting to my knowledge base. For fitness advice, focus on consistency with both strength training and cardio, ensure adequate protein intake (about 1.6-2.2g per kg of bodyweight), and prioritize recovery through proper sleep and stress management.",
      "Sorry, I couldn't retrieve specific information right now. Generally, sustainable fitness progress comes from progressive overload in training, nutritional consistency, and lifestyle habits that support your goals.",
      "I apologize for the technical difficulties. In the meantime, remember that evidence-based fitness approaches typically include regular resistance training, cardiovascular exercise, proper nutrition with adequate protein, and sufficient recovery time."
    ];
    
    // Return a random fallback response
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
};
