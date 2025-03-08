import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
        return (_jsx(motion.div, { initial: { opacity: 0, y: -50, x: randomX }, animate: { opacity: 1, y: window.innerHeight }, transition: { duration: randomDuration, ease: 'linear' }, className: "absolute text-pink-400 text-4xl", style: { position: 'absolute' }, children: randomFlower }));
    };
    const [petals, setPetals] = useState([]);
    useEffect(() => {
        const interval = setInterval(() => {
            setPetals((prev) => [...prev, _jsx(Petal, {}, Math.random())]);
        }, 200);
        return () => clearInterval(interval);
    }, []);
    if (!questionsByUser)
        return (_jsxs(StyledContainer, { children: [_jsx(FlowersContainer, { className: "absolute top-0 left-0 w-full h-full pointer-events-none", children: petals }), _jsx("div", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." })] }));
    if (!selectedUser) {
        return (_jsxs(StyledContainer, { children: [_jsx(FlowersContainer, { className: "absolute top-0 left-0 w-full h-full pointer-events-none", children: petals }), _jsx(Card, { sx: { p: 2, textAlign: 'center' }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h4", children: "\u041A\u0430\u043A\u043E\u0439 \u0442\u044B \u0446\u0432\u0435\u0442\u043E\u0447\u0435\u043A?" }), _jsx(Typography, { variant: "h6", children: "\u0412\u044B\u0431\u0435\u0440\u0438 \u0441\u0435\u0431\u044F:" }), _jsx(StyledChoose, { children: Object.entries(questionsByUser).map((user, userQuestions) => {
                                    return (_jsx(StyledButton, { className: "choose", color: "secondary", onClick: () => setSelectedUser(user[0]), sx: { mt: 1 }, children: user[0] }, user[0]));
                                }) })] }) })] }));
    }
    const questions = questionsByUser[selectedUser].questions || [];
    const handleAnswer = (flower) => {
        const newAnswers = [...answers, flower];
        setAnswers(newAnswers);
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        }
        else {
            setResult(questionsByUser[selectedUser].flower);
        }
    };
    return (_jsxs(StyledContainer, { children: [_jsx(FlowersContainer, { className: "absolute top-0 left-0 w-full h-full pointer-events-none", children: petals }), _jsx(Card, { sx: { p: 2, textAlign: 'center', width: '100%', maxWidth: '400px' }, children: _jsx(CardContent, { children: result ? (_jsx(_Fragment, { children: _jsxs(StyledAnswers, { children: [_jsxs(Typography, { variant: "h5", children: ["\u0422\u044B \u2014 ", result, "!"] }), _jsx(StyledPhoto, { children: _jsx("img", { src: `/${questionsByUser[selectedUser].photo}`, alt: "" }) }), _jsx(StyledButton, { color: "secondary", children: "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043F\u043E\u0437\u0434\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435" })] }) })) : (_jsxs(_Fragment, { children: [_jsx(Typography, { variant: "h6", children: questions[currentQuestion].question }), _jsx(StyledAnswers, { children: questions[currentQuestion].options.map((option, index) => (_jsx(StyledButton, { color: "secondary", onClick: () => handleAnswer(option.flower), sx: { mt: 1 }, children: option.text }, `${currentQuestion}-${index}`))) })] })) }) })] }));
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
