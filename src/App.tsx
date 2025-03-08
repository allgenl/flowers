import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, CardContent, Typography } from '@mui/material';
import styled from 'styled-components';

const flowers = ['🌹', '🌷', '🌺', '🏵', '🌼', '🌻', '🌸', '🪻'];

const FlowerQuiz = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [questionsByUser, setQuestionsByUser] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch('/users_questions.json')
      .then((response) => response.json())
      .then((data) => setQuestionsByUser(data))
      .catch((error) => console.error('Ошибка загрузки JSON:', error));
  }, []);

  const Petal = () => {
    const randomX = Math.random() * window.innerWidth;
    const randomDuration = Math.random() * 5 + 3;
    const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
    return (
      <motion.div
        initial={{ opacity: 0, y: -50, x: randomX }}
        animate={{ opacity: 1, y: window.innerHeight }}
        transition={{ duration: randomDuration, ease: 'linear' }}
        className="absolute text-pink-400 text-4xl"
        style={{ position: 'absolute' }}
      >
        {randomFlower}
      </motion.div>
    );
  };

  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // @ts-ignore
      setPetals((prev) => [...prev, <Petal key={Math.random()} />]);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (!questionsByUser)
    return (
      <StyledContainer>
        <FlowersContainer className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {petals}
        </FlowersContainer>
        <div>Загрузка...</div>
      </StyledContainer>
    );

  if (!selectedUser) {
    return (
      <StyledContainer>
        <FlowersContainer className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {petals}
        </FlowersContainer>

        <Card sx={{ p: 2, textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h4">Какой ты цветочек?</Typography>
            <Typography variant="h6">Выбери себя:</Typography>
            <StyledChoose>
              {Object.entries(questionsByUser).map((user, userQuestions) => {
                return (
                  <StyledButton
                    className="choose"
                    color="secondary"
                    key={user[0]}
                    // @ts-ignore
                    onClick={() => setSelectedUser(user[0])}
                    sx={{ mt: 1 }}
                  >
                    {user[0]}
                  </StyledButton>
                );
              })}
            </StyledChoose>
          </CardContent>
        </Card>
      </StyledContainer>
    );
  }
  // @ts-ignore
  const questions = questionsByUser[selectedUser].questions || [];
  // @ts-ignore
  const handleAnswer = (flower) => {
    const newAnswers = [...answers, flower];
    // @ts-ignore
    setAnswers(newAnswers);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // @ts-ignore
      setResult(questionsByUser[selectedUser].flower);
    }
  };

  return (
    <StyledContainer>
      <FlowersContainer className="absolute top-0 left-0 w-full h-full pointer-events-none">{petals}</FlowersContainer>
      <Card sx={{ p: 2, textAlign: 'center', width: '100%', maxWidth: '400px' }}>
        <CardContent>
          {result ? (
            <>
              <StyledAnswers>
                <Typography variant="h5">Ты — {result}!</Typography>
                <StyledPhoto>
                  {/* @ts-ignore */}
                  <img src={`/${questionsByUser[selectedUser].photo}`} alt="" />
                </StyledPhoto>
                <StyledButton color="secondary">Смотреть поздравление</StyledButton>
              </StyledAnswers>
            </>
          ) : (
            <>
              <Typography variant="h6">{questions[currentQuestion].question}</Typography>
              <StyledAnswers>
                {/* @ts-ignore */}
                {questions[currentQuestion].options.map((option, index) => (
                  <StyledButton
                    color="secondary"
                    key={`${currentQuestion}-${index}`}
                    onClick={() => handleAnswer(option.flower)}
                    sx={{ mt: 1 }}
                  >
                    {option.text}
                  </StyledButton>
                ))}
              </StyledAnswers>
            </>
          )}
        </CardContent>
      </Card>
    </StyledContainer>
  );
};

export default FlowerQuiz;

const FlowersContainer = styled('div')(() => ({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  pointerEvents: 'none',
}));

const StyledContainer = styled('div')(() => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
}));

const StyledAnswers = styled('div')(() => ({
  flexDirection: 'column',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
}));

const StyledButton = styled(Button)(() => ({
  width: '100%',
  backgroundColor: '#FFC0CB',
  color: 'white',
}));
const StyledPhoto = styled('div')(() => ({
  width: '100%',
  margin: '1rem 0',
  '& img': {
    borderRadius: '1rem',
    width: '100%',
    maxHeight: '80vh',
    objectFit: 'cover',
  },
}));
const StyledChoose = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px',
  '&  .choose': {
    fontSize: '12px !important',
  },
}));
