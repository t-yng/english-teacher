import { correctEnglishText } from "@/app/api/gpt";

const main = async () => {
  const text = "I have a dog.";
  const result = await correctEnglishText(text);
  console.log(result);
};

main();
