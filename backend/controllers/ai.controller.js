import dotenv from 'dotenv'
dotenv.config()

import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });



export const aiController = async (req, res) => {
  try {
    const data = req.body.question;
    let ans = await generate(data);

    console.log("raw ans is:", ans);

    // Remove ```json and ``` from the string if present
    ans = ans.replace(/```json\s*|\s*```/g, '');

    // Parse the cleaned string to JSON
    const parsedAns = JSON.parse(ans);

    return res.status(200).json({
      message: "Answer fetched successfully",
      data: parsedAns
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}



const generate = async(data)=>{

 const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: data,
  });
//   console.log(response.text);
   return response.text

}