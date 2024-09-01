"use client";
import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Radio, Header, Segment } from 'semantic-ui-react';
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation"

import { GET } from '@/services';
import { userSignupData } from '@/redux/reuducer/authSlice';

const Test = () => {
  const userData = useSelector(userSignupData)
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectAnswer, setSelectAnswer] = useState("");

  useEffect(() => {
    const callEffect = async () => {
      const { status, payload } = await GET("/tests/start-test", { testId: userData?.data?.testId })
      if (!status) return
      setCurrentQuestion(payload)
    }; callEffect()
  }, [])

  const handleNext = async () => {
    try {
      const { status, payload } = await GET("/tests/next-question", { testId: userData?.data?.testId, questionId: currentQuestion._id, selectAnswer })
      if (!status) return;
      if (!payload?.attemptQuestions) {
        setCurrentQuestion(payload);
        setSelectAnswer("");
        return
      };

      Swal.fire({
        title: "Thank you for completing this test.",
        text: `Questions attempted: ${payload?.attemptQuestions}, Correct answers: ${payload?.correctAnswer}`,
        icon: "success",
        confirmButtonText: "Okay",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/")
        }
      });
    } catch (error) { console.log(error) }
  };

  return (
    <Container>
      <Header as='h2'>Quiz</Header>
      <Form>
        <Segment>
          <Header as='h3'>{currentQuestion?.question}</Header>
          {(currentQuestion?.options || []).map((option) => (
            <Form.Field key={option._id}>
              <Radio
                label={option.text}
                name={currentQuestion?._id}
                value={option._id}
                onChange={() => setSelectAnswer(option.id)}
              />
            </Form.Field>
          ))}
        </Segment>
        <Button onClick={handleNext} disabled={selectAnswer ? false : true}>Next</Button>
      </Form>
    </Container>
  );
};
export default Test;