import dotenv from 'dotenv'
dotenv.config()

import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });



export const aiController = async(req,res)=>{
   try {
    
    const data = req.body.question
   const ans  = await generate(data);

   console.log("ans is :", ans);

   return res.status(200).json({
  message: "Answer fetched successfully",
  data: ans
});


  } catch (error) {
    console.log(error);
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