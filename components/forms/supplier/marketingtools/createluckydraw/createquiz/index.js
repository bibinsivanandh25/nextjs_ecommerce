/* eslint-disable react/no-array-index-key */
import { Box, Grid } from "@mui/material";
import InputBox from "components/atoms/InputBoxComponent";
import ButtonComponent from "components/atoms/ButtonComponent";
import RadiobuttonComponent from "components/atoms/RadiobuttonComponent";
import { forwardRef, useState, useImperativeHandle, useEffect } from "react";
import validateMessage from "constants/validateMessages";
import toastify from "services/utils/toastUtils";

const CreateQuiz = forwardRef(({ numberOfQuestions = 3 }, ref) => {
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
  const temperrObj = {
    question: "",
    options: {
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    },
  };
  const [questions, setQuestions] = useState([
    {
      ...JSON.parse(JSON.stringify(tempquestionObj)),
    },
    {
      ...JSON.parse(JSON.stringify(tempquestionObj)),
    },
    {
      ...JSON.parse(JSON.stringify(tempquestionObj)),
    },
  ]);
  const [errorObj, setErrorObj] = useState([
    {
      ...temperrObj,
    },
    {
      ...temperrObj,
    },
    {
      ...temperrObj,
    },
  ]);

  useEffect(() => {
    if (questions.length === numberOfQuestions) return;
    if (questions.length < numberOfQuestions) {
      const temp = JSON.parse(JSON.stringify(questions));
      temp.push(JSON.parse(JSON.stringify(tempquestionObj)));
      temp.push(JSON.parse(JSON.stringify(tempquestionObj)));
      setQuestions([...temp]);
      const temp1 = [...errorObj];
      temp1.push({ ...JSON.parse(JSON.stringify(temperrObj)) });
      temp1.push({ ...JSON.parse(JSON.stringify(temperrObj)) });
      setErrorObj(temp1);
    } else {
      const temp = JSON.parse(JSON.stringify(questions));
      temp.pop();
      temp.pop();
      setQuestions([...temp]);
      const temp1 = [...errorObj];
      temp1.pop();
      temp1.pop();
      setErrorObj([...temp1]);
    }
  }, [numberOfQuestions]);

  const validate = () => {
    let flag = false;
    const error = JSON.parse(JSON.stringify(errorObj));
    questions.forEach((item, ind) => {
      if (!item.question) {
        flag = true;
        error[ind].question = validateMessage.field_required;
      } else {
        error[ind].question = "";
      }
      if (item.options.option1.option === "") {
        flag = true;
        error[ind].options.option1 = validateMessage.field_required;
      } else {
        error[ind].options.option1 = "";
      }
      if (item.options.option2.option === "") {
        error[ind].options.option2 = validateMessage.field_required;
        flag = true;
      } else {
        error[ind].options.option2 = "";
      }
      if (item.options.option3.option === "") {
        flag = true;
        error[ind].options.option3 = validateMessage.field_required;
      } else {
        error[ind].options.option3 = "";
      }
      if (item.options.option4.option === "") {
        flag = true;
        error[ind].options.option4 = validateMessage.field_required;
      } else {
        error[ind].options.option4 = "";
      }
      const temp = [
        item.options.option1.correct,
        item.options.option2.correct,
        item.options.option3.correct,
        item.options.option4.correct,
      ];
      if (!temp.some((ele) => ele)) {
        toastify(
          `Please Select The Correct Answer For Question ${ind + 1}`,
          "warning"
        );
        flag = true;
      }
    });
    setErrorObj(error);
    return flag;
  };

  useImperativeHandle(ref, () => {
    return {
      validate,
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
                error={errorObj[index].question !== ""}
                helperText={errorObj[index].question}
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
                error={errorObj[index].options.option1 !== ""}
                helperText={errorObj[index].options.option1}
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
                error={errorObj[index].options.option2 !== ""}
                helperText={errorObj[index].options.option2}
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
                error={errorObj[index].options.option3 !== ""}
                helperText={errorObj[index].options.option3}
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
                error={errorObj[index].options.option4 !== ""}
                helperText={errorObj[index].options.option4}
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});
CreateQuiz.displayName = "CreateQuiz";
export default CreateQuiz;
