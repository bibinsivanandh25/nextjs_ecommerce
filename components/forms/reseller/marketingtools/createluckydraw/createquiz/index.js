import { Box, Grid } from "@mui/material";
import InputBox from "components/atoms/InputBoxComponent";
import ButtonComponent from "components/atoms/ButtonComponent";
import RadiobuttonComponent from "components/atoms/RadiobuttonComponent";
import { forwardRef, useEffect, useState, useImperativeHandle } from "react";

const CreateQuiz = forwardRef(({}, ref) => {
  const tempquestionObj = {
    question: "",
    options: {
      option1: {
        option: "",
        correct: false,
      },
      option2: {
        option: "",
        correct: false,
      },
      option3: {
        option: "",
        correct: false,
      },
      option4: {
        option: "",
        correct: false,
      },
    },
  };
  const [questions, setQuestions] = useState([
    { ...JSON.parse(JSON.stringify(tempquestionObj)) },
  ]);

  useImperativeHandle(ref, () => {
    return {
      handleSendFormData: () => {
        return ["quiz", [...questions]];
      },
    };
  });
  return (
    <Box className="w-100 d-flex  mx-3">
      <Grid container className="w-100 mt-4" spacing={4}>
        {questions.map((item, index) => (
          <Grid
            item
            md={4}
            lg={3}
            xl={2}
            container
            className="w-100"
            key={index}
            spacing={2}
          >
            <Grid item md={12}>
              Question {index + 1}:
              <InputBox
                label=""
                placeholder="Enter the question"
                value={item.question}
                onInputChange={(e) => {
                  const temp = JSON.parse(JSON.stringify(questions));
                  temp[index].question = e.target.value;
                  setQuestions([...temp]);
                }}
                textInputProps={{
                  style: { padding: 5 },
                }}
                fullWidth
              />
            </Grid>
            <Grid item md={12} className="d-flex mt-2">
              <RadiobuttonComponent
                label=""
                isChecked={item.options.option1.correct}
                onRadioChange={() => {
                  const temp = JSON.parse(JSON.stringify(questions));
                  Object.keys(temp[index].options).forEach((ele) => {
                    temp[index].options[ele].correct = false;
                  });
                  temp[index].options.option1.correct = true;
                  setQuestions([...temp]);
                }}
                size="small"
              />

              <InputBox
                label=""
                placeholder="Enter the option 1"
                value={item.options.option1.option}
                onInputChange={(e) => {
                  const temp = JSON.parse(JSON.stringify(questions));
                  temp[index].options.option1.option = e.target.value;
                  setQuestions([...temp]);
                }}
                textInputProps={{
                  style: { padding: 5 },
                }}
              />
            </Grid>
            <Grid item md={12} className="d-flex mt-2">
              <RadiobuttonComponent
                label=""
                isChecked={item.options.option2.correct}
                onRadioChange={() => {
                  const temp = JSON.parse(JSON.stringify(questions));
                  Object.keys(temp[index].options).forEach((ele) => {
                    temp[index].options[ele].correct = false;
                  });
                  temp[index].options.option2.correct = true;
                  setQuestions([...temp]);
                }}
                size="small"
              />

              <InputBox
                label=""
                value={item.options.option2.option}
                onInputChange={(e) => {
                  const temp = JSON.parse(JSON.stringify(questions));
                  temp[index].options.option2.option = e.target.value;
                  setQuestions([...temp]);
                }}
                textInputProps={{
                  style: { padding: 5 },
                }}
                placeholder="Enter the option 2"
              />
            </Grid>
            <Grid item md={12} className="d-flex mt-2">
              <RadiobuttonComponent
                label=""
                isChecked={item.options.option3.correct}
                onRadioChange={() => {
                  const temp = JSON.parse(JSON.stringify(questions));
                  Object.keys(temp[index].options).forEach((ele) => {
                    temp[index].options[ele].correct = false;
                  });
                  temp[index].options.option3.correct = true;
                  setQuestions([...temp]);
                }}
                size="small"
              />

              <InputBox
                label=""
                value={item.options.option3.option}
                onInputChange={(e) => {
                  const temp = JSON.parse(JSON.stringify(questions));
                  temp[index].options.option3.option = e.target.value;
                  setQuestions([...temp]);
                }}
                textInputProps={{
                  style: { padding: 5 },
                }}
                placeholder="Enter the option 3"
              />
            </Grid>
            <Grid item md={12} className="d-flex mt-2">
              <RadiobuttonComponent
                label=""
                isChecked={item.options.option4.correct}
                onRadioChange={() => {
                  const temp = JSON.parse(JSON.stringify(questions));
                  Object.keys(temp[index].options).forEach((ele) => {
                    temp[index].options[ele].correct = false;
                  });
                  temp[index].options.option4.correct = true;
                  setQuestions([...temp]);
                }}
                size="small"
              />

              <InputBox
                label=""
                value={item.options.option4.option}
                onInputChange={(e) => {
                  const temp = JSON.parse(JSON.stringify(questions));
                  temp[index].options.option4.option = e.target.value;
                  setQuestions([...temp]);
                }}
                textInputProps={{
                  style: { padding: 5 },
                }}
                placeholder="Enter the option 4"
              />
            </Grid>
          </Grid>
        ))}
        {questions.length < 5 ? (
          <Grid item md={12} className="d-flex justify-content-end">
            <ButtonComponent
              label="Add new Question"
              onBtnClick={() => {
                setQuestions((pre) => {
                  const temp = [...JSON.parse(JSON.stringify(pre))];
                  temp.push(JSON.parse(JSON.stringify(tempquestionObj)));
                  return [...temp];
                });
              }}
              muiProps="bg-black color-white"
            />
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
});
CreateQuiz.displayName = "CreateQuiz";
export default CreateQuiz;
