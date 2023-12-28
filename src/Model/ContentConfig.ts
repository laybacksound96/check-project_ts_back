import mongoose from "mongoose";
import { ContentConfigDocument } from "../Types/types";

const contentConfig = new mongoose.Schema<ContentConfigDocument>({
  name: { type: String, required: true },
  categories: {
    type: [
      {
        categoryName: { type: String, required: true },
        contents: {
          type: [
            {
              name: { type: String, required: true },
              data: [
                {
                  difficulty: { type: String, required: true },
                  gates: [
                    {
                      level: { type: Number, required: true },
                      gold: { type: Number, required: true },
                    },
                  ],
                },
              ],
            },
          ],
          required: true,
        },
      },
    ],
    required: true,
  },
});
const ContentConfig = mongoose.model("ContentConfig", contentConfig);
export default ContentConfig;
