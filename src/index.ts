import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();
const app = express();

if (process.env.MODE === "dev") {
  app.use(cors());
  app.use(morgan("dev"));
}

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const samples = [
  ' "운동량과 충격량" 에 대해 학습한 후, 충격량과 충격력의 관계를 더 자세히 이해하기 위해 다양한 상황들에 대해 대입해서 설명하는 모습을 보임.  충격량, 충격을 받는 시간의 관계에 대해 다양한 예시를 들어가며 여러 상황을 통해 학생들의 이해를 도움. 자동차의 에어백에 대해 충격을 받는 시간을 길게 하여 충격력을 줄이고자 만든 장치라고 설명하며 충격량 공식을 활용하여 완벽히 이해함. ',
  ,
  ' "운동량과 충격량" 단원에서 같은 충격량도 충돌 시간을 길게 하면 충격력이 작아진다는 내용을 공부한 후 실생활 예시에 대해 발표하는 데 있어 운동 종목마다 운동화의 구조가 다른 이유에 관해 설명함. 농구는 높게 점프 후 착지할 때 충격력을 온전히 무릎이 감당해야 하므로 충격을 최대한 완화하기 위해 에어와 같은 쿠션 역할의 보조재를 첨가하여 만들고 축구화는 빠른 이동과 미끄러짐을 방지하기 위해 쿠션보다는 울퉁불퉁한 바닥 소재를 사용한다고 설명함. 또한, 뉴턴의 가속도 법칙을 이용하여 몸무게가 무거울수록 충격력이 커져 운동선수의 안전에 유의해야 한다고 설명하며 학생들의 호응을 얻음.',
  ,
  ' "생물의 진화" 단원에서 자연 선택에 의한 진화로 항생제 내성을 나타내는 항생제 저항성 유전자를 가진 세균은 항생제를 지속해서 사용할수록 그 비율이 증가함을 알게 됨. 강력한 항생제에도 내성이 있는 슈퍼 박테리아의 출현을 막기 위한 방법에 대해 조별 토의 활동을 진행함. 동물 성장 촉진을 위하여 가축 사료에 항생제를 사용하는 사례를 제시하며 가축 사료에 항생제를 남용하지 않는 방법과 병원에서도 다량의 항생제를 오남용하지 말아야 한다는 내용을 주장함. 토의 활동에서 조원들의 의견을 적극 수용하며 자신의 의견을 적극적으로 표현할 줄 아는 학생임.',
  ' "중화반응" 단원에서 염산과 수산화나트륨 수용액의 반응을 반응식을 이용하여 나타내고 산과 염기 용액을 섞었을 때 일어나는 혼합 용액의 온도와 색깔 변화를 알아보는 실험을 직접 계획하여 설계함. 실험 중에 혼합 용액의 온도와 색깔 변화 등 관찰한 결과를 정리하고 온도 변화를 그래프로 나타내는 등 과학적 탐구 능력을 확인함. 중화반응 실험에서 오차 발생을 줄이기 위해 염산과 수산화나트륨 수용액을 실온에 오래 내버려 두어 두 시약의 온도를 같게 하는 등 실험의 정확성을 높임.',
  ' "신재생 에너지와 지속 가능한 발전" 단원에서 사회의 여건을 고려하여 삶의 질을 향상하는 단순한 수준의 기술인 적정 기술에 대해 발표 활동을 진행함. 다양한 적정 기술의 사례를 조사하여 고안된 배경과 과학 원리들에 대해 알아냄. 대표적 사례 중 휴대용 정수 빨대인 라이프 스트로우에 대해 조사함. 빈민 국가에서 많이 사용되지만 비싸다는 점을 알게 되고 적정 기술로서 적합하지 않지 않을까 하는 의문점을 남기고 바람직한 적정 기술은 어떤 것이고 가장 중요하게 고려해야 하는 조건에 대해 고민한다는 발표를 진행함.',
  ,
  ' "전기 에너지의 생산"에 대해 수업 후 전자기 유도 현상을 이용하여 발전기를 만든다는 점에 흥미를 가지고 발전기를 제작하는 방법에 대해 모색함. 발전기와 터빈을 이용하여 현재 우리가 사용하는 전기의 대부분이 생산된다는 것을 알고 여러 발전 방식을 조사하여 수력 발전, 풍력 발전, 핵발전 방식들의 장단점을 비교하는 모습을 보임. 그 중 원자력 발전으로 인해 전기의 대량 생산이 가능하지만 방사성 폐기물이 나온다는 한계에 대해 안타까움을 느끼고 문제 해결을 위해 현재 전기를 생산하는 발전소들에 대한 수업에 적극적으로 참여함. 친환경적인 에너지를 사용하기 위해 바람, 물, 태양에서 오는 에너지를 전환하여 전기 에너지로 쓰면 좋겠다는 아이디어를 제시하고 지금의 발전 방식과 비교하는 등 미래의 방향성을 제시함.',
];
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/test", async (req: Request, res: Response) => {
  const { subject, keyword } = req.body;
  console.log(req.body);
  res.status(200).json("ad");
});

app.post("/getText", async (req: Request, res: Response) => {
  const { subject, keyword } = req.body;
  if (!keyword) return res.sendStatus(404);
  const completion = await openai.chat.completions.create({
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
});

app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
