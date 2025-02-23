import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import styled from "styled-components";

const questions = [
  {
    question: "Какой твой идеальный день?",
    options: [
      { text: "Активный и насыщенный", flower: "Подсолнух" },
      { text: "Спокойный и умиротворенный", flower: "Лаванда" },
      { text: "Романтичный и мечтательный", flower: "Роза" },
      { text: "Веселый и яркий", flower: "Тюльпан" },
    ],
  },
  {
    question: "Выбери цвет, который тебе нравится больше всего:",
    options: [
      { text: "Желтый", flower: "Подсолнух" },
      { text: "Фиолетовый", flower: "Лаванда" },
      { text: "Красный", flower: "Роза" },
      { text: "Розовый", flower: "Тюльпан" },
    ],
  },
  {
    question: "Как бы тебя описали друзья?",
    options: [
      { text: "Энергичный и позитивный", flower: "Подсолнух" },
      { text: "Спокойный и добрый", flower: "Лаванда" },
      { text: "Чувственный и загадочный", flower: "Роза" },
      { text: "Легкий на подъем и веселый", flower: "Тюльпан" },
    ],
  },
];

const FlowerQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleAnswer = (flower) => {
    const newAnswers = [...answers, flower];
    setAnswers(newAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const flowerCounts = newAnswers.reduce((acc, flower) => {
        acc[flower] = (acc[flower] || 0) + 1;
        return acc;
      }, {});

      const mostCommonFlower = Object.keys(flowerCounts).reduce((a, b) =>
        flowerCounts[a] > flowerCounts[b] ? a : b
      );

      setResult(mostCommonFlower);
    }
  };

  const Petal = () => {
    const randomX = Math.random() * window.innerWidth;
    const randomDuration = Math.random() * 5 + 3;
    return (
      <motion.div
        initial={{ opacity: 0, y: -50, x: randomX }}
        animate={{ opacity: 1, y: window.innerHeight }}
        transition={{ duration: randomDuration, ease: "linear" }}
        className="absolute text-pink-400 text-4xl"
        style={{ position: "absolute" }}
      >
        🌹
      </motion.div>
    );
  };

  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPetals((prev) => [...prev, <Petal key={Math.random()} />]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledContainer
      className="relative flex items-center justify-center min-h-screen bg-pink-50 overflow-hidden"
      style={{ width: "100%" }}
    >
      {/* Контейнер для лепестков */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {petals}
      </div>

      {/* Контейнер опроса */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
        style={{ margin: "auto" }}
      >
        <Card
          sx={{
            backgroundColor: "#FFC0CB",
            borderRadius: 4,
            boxShadow: 3,
            maxWidth: 400,
            textAlign: "center",
            p: 2,
          }}
        >
          <CardContent>
            {result ? (
              <>
                <Typography variant="h5" fontWeight="bold">
                  Ты — {result}! 🌸
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Этот цветок отражает твою личность и энергию!
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 3, backgroundColor: "#E91E63" }}
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers([]);
                    setResult(null);
                  }}
                >
                  Пройти снова
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h6" fontWeight="bold">
                  {questions[currentQuestion].question}
                </Typography>
                <div style={{ marginTop: "1rem" }}>
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="contained"
                      fullWidth
                      sx={{ mt: 1, backgroundColor: "#F48FB1" }}
                      onClick={() => handleAnswer(option.flower)}
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </StyledContainer>
  );
};

export default FlowerQuiz;

const StyledContainer = styled(Stack)(() => ({
  minHeight: "100vw",
  display: "flex",
}));
