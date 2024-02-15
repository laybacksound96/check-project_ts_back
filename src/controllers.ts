import { Request, Response } from "express";
import { openaiInstance } from ".";
import { researchSamples, samples } from "./controllerSamples";

export const getIntegratedScience = async (req: Request, res: Response) => {
  const { subject, keyword } = req.body;
  if (!keyword) return res.sendStatus(404);
  const completion = await openaiInstance.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You must write an article that evaluates a student's academic achievement level in less than 200 characters and return it to Korean,The Subject(단원) is ${subject}, and Keywords that should be included in the article should be any one of ${keyword} and be used in the text.
          Use the three quotations marks as an example. The speech should be written similar to the example. ''' ${samples.join(", ")}, '''`,
      },
    ],
    model: "gpt-4",
  });
  res.status(200).json(completion.choices[0].message.content);
};
export const getScienceResearch = async (req: Request, res: Response) => {
  const { subject, keyword } = req.body;
  console.log(subject);
  if (!keyword) return res.sendStatus(404);
  const completion = await openaiInstance.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        You must write an article that evaluates a student's scientific research activity in less than 400 characters and return it to Korean. The Subject(단원) is ${subject}, and Keywords that should be included in the article should be any one of ${keyword} and be used in the text. It can also include content about the progress of experiments related to the research topic. Use the three quotations marks as an example. The speech should be written similar to the example. ''' ${researchSamples.join(
          ", "
        )}, '''
        `,
      },
    ],
    model: "gpt-4",
  });
  res.status(200).json(completion.choices[0].message.content);
};
