
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart } from "lucide-react";

const loveLanguageQuestions = [
  {
    question: "What makes you feel most loved?",
    options: [
      { text: "When someone tells me they love me", type: "words" },
      { text: "When someone gives me their full attention", type: "time" },
      { text: "When someone brings me a thoughtful gift", type: "gifts" },
      { text: "When someone helps me with tasks", type: "acts" },
      { text: "When someone hugs or holds me", type: "touch" }
    ]
  },
  {
    question: "How do you prefer to show love to others?",
    options: [
      { text: "By telling them how much they mean to me", type: "words" },
      { text: "By spending uninterrupted time together", type: "time" },
      { text: "By surprising them with meaningful gifts", type: "gifts" },
      { text: "By doing things to make their life easier", type: "acts" },
      { text: "Through physical affection and closeness", type: "touch" }
    ]
  },
  {
    question: "What would hurt you most in a relationship?",
    options: [
      { text: "Hearing harsh or critical words", type: "words" },
      { text: "Being ignored or feeling unimportant", type: "time" },
      { text: "Forgotten special occasions", type: "gifts" },
      { text: "Having to do everything myself", type: "acts" },
      { text: "Lack of physical affection", type: "touch" }
    ]
  },
  {
    question: "What's your ideal romantic evening?",
    options: [
      { text: "Deep conversations about our dreams", type: "words" },
      { text: "A quiet dinner with no distractions", type: "time" },
      { text: "Exchanging handwritten love letters", type: "gifts" },
      { text: "Cooking a meal together", type: "acts" },
      { text: "Cuddling while watching the sunset", type: "touch" }
    ]
  },
  {
    question: "What makes you feel most appreciated?",
    options: [
      { text: "Compliments and words of affirmation", type: "words" },
      { text: "Having someone's undivided attention", type: "time" },
      { text: "Receiving something that shows they were thinking of me", type: "gifts" },
      { text: "Someone helping without being asked", type: "acts" },
      { text: "A warm embrace or gentle touch", type: "touch" }
    ]
  }
];

const loveLanguageResults = {
  words: {
    title: "Words of Affirmation",
    description: "You feel most loved through kind, encouraging words and verbal expressions of love.",
    icon: "💬",
    traits: ["Values compliments", "Loves verbal encouragement", "Appreciates 'I love you'", "Enjoys deep conversations"]
  },
  time: {
    title: "Quality Time",
    description: "You feel most loved when someone gives you their full, undivided attention.",
    icon: "⏰",
    traits: ["Values presence over presents", "Loves meaningful conversations", "Appreciates shared activities", "Enjoys uninterrupted time together"]
  },
  gifts: {
    title: "Receiving Gifts",
    description: "You feel most loved through thoughtful gifts that show someone was thinking of you.",
    icon: "🎁",
    traits: ["Treasures thoughtful gifts", "Values the thought behind gifts", "Remembers special occasions", "Loves surprises"]
  },
  acts: {
    title: "Acts of Service",
    description: "You feel most loved when someone does things to help and support you.",
    icon: "🤝",
    traits: ["Values helpful actions", "Appreciates support", "Loves when someone eases their burden", "Actions speak louder than words"]
  },
  touch: {
    title: "Physical Touch",
    description: "You feel most loved through physical affection and closeness.",
    icon: "🤗",
    traits: ["Values physical affection", "Loves hugs and cuddles", "Appreciates gentle touches", "Feels connected through touch"]
  }
};

export const LoveLanguageQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentQuestion < loveLanguageQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (allAnswers: string[]) => {
    const counts: { [key: string]: number } = {};
    allAnswers.forEach(answer => {
      counts[answer] = (counts[answer] || 0) + 1;
    });

    const maxCount = Math.max(...Object.values(counts));
    const topLanguage = Object.keys(counts).find(key => counts[key] === maxCount) || 'words';
    setResult(topLanguage);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  const progress = ((currentQuestion + 1) / loveLanguageQuestions.length) * 100;

  if (result) {
    const resultData = loveLanguageResults[result as keyof typeof loveLanguageResults];
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full romantic-glow">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">{resultData.icon}</div>
            <CardTitle className="text-3xl font-playfair">Your Love Language</CardTitle>
            <CardDescription className="text-xl">{resultData.title}</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-lg text-muted-foreground">{resultData.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              {resultData.traits.map((trait, index) => (
                <div key={index} className="bg-secondary p-3 rounded-lg">
                  <p className="text-sm font-medium">{trait}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={resetQuiz} variant="outline">
                Retake Quiz
              </Button>
              <Button className="romantic-gradient text-white">
                Save to Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Heart className="w-8 h-8 text-primary" />
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {loveLanguageQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="mb-4" />
          <CardTitle className="text-2xl font-playfair">
            {loveLanguageQuestions[currentQuestion].question}
          </CardTitle>
          <CardDescription>
            Choose the answer that resonates most with your heart
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loveLanguageQuestions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(option.type)}
              variant="outline"
              className="w-full text-left p-4 h-auto hover:romantic-glow transition-all"
            >
              {option.text}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
