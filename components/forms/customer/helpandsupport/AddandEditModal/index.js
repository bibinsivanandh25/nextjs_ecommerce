import { Box, Grid, Paper } from "@mui/material";
import Image from "next/image";

const { default: TextArea } = require("@/atoms/SimpleTextArea");

const EditQuestion = ({ setreplyInput, replyInput, errEditMessage }) => {
  return (
    <Box className="mt-3">
      <TextArea
        placeholder="Reply here"
        widthClassName="w-100"
        onInputChange={(e) => {
          setreplyInput(e.target.value);
        }}
        value={replyInput}
        error={errEditMessage !== ""}
        helperText={errEditMessage}
      />
    </Box>
  );
};
const ReplyQuestion = ({
  setproductReplyInput,
  productReplyInput,
  errProductReply,
}) => {
  return (
    <Box className="mt-3">
      <TextArea
        placeholder="Reply here"
        widthClassName="w-100"
        onInputChange={(e) => {
          setproductReplyInput(e.target.value);
        }}
        value={productReplyInput}
        error={errProductReply !== ""}
        helperText={errProductReply}
      />
    </Box>
  );
};
const ViewQuestions = ({ getParagraph, viewQuertData }) => {
  return (
    <Grid container spacing={3}>
      <Grid xs={12} item className="fs-15 fw-500">
        {getParagraph("Cutomer Name", viewQuertData?.customerId)}
        {getParagraph(
          "Product Image",
          <Grid className="d-flex justify-content-between">
            {viewQuertData?.images?.map((item) => {
              return (
                <Paper>
                  <Image
                    src={item?.toString()}
                    height={70}
                    width={70}
                    alt="img"
                    layout="intrinsic"
                    className="d-flex justify-content-center align-items-center"
                  />
                </Paper>
              );
            })}
          </Grid>
        )}
        {getParagraph("Question", viewQuertData?.customerQuestion)}
        {getParagraph("Date and Time", viewQuertData?.dateAndTime)}
      </Grid>
    </Grid>
  );
};
export { EditQuestion, ReplyQuestion, ViewQuestions };
