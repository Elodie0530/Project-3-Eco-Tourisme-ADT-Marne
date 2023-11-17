const models = require("../models");

const createAnswer = async (req, res) => {
  try {
    const [result] = await models.user.insert();

    const userId = result.insertId;

    const { questions } = req.body;
    await questions.forEach(async (question) => {
      await models.answer.insert({
        user_id: userId,
        question_id: question.id,
        response: question.response ?? "Ne sait pas",
      });
    });

    res.status(201).json({ userId });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const findAllWithQuestionDetails = (req, res) => {
  models.answer
    .findAllWithQuestionDetails()
    .then((result) => {
      const answers = result[0];
      res.json(answers);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getUserResponses = (req, res) => {
  const { userId } = req.params;

  models.answer
    .getAllByUserId(userId)
    .then(([userQuestionsAndResponses]) => {
      const userResponses = userQuestionsAndResponses.map((item) => {
        return {
          questionId: item.question_id,
          questionContent: item.content,
          response: item.response,
          email: item.email,
          firstname: item.firstname,
          lastname: item.lastname,
          company_name: item.company_name,
          phone_number: item.phone_number,
        };
      });

      res.json(userResponses);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  createAnswer,
  findAllWithQuestionDetails,
  getUserResponses,
};
