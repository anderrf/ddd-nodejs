import { Answer } from '../entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

describe('Answer Question', () => {
  it('should be able to create an answer', async () => {
    const fakeAnswersRepository: AnswersRepository = {
      create: async (answer: Answer) =>
        new Promise<void>((resolve) => resolve()),
    }
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)
    const answer = await answerQuestion.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova Resposta',
      title: 'Nova Resposta',
    })
    expect(answer.content).toEqual('Nova Resposta')
  })
})
