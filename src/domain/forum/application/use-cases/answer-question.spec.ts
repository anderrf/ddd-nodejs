import { InMemoryAnswersRepository } from './../../../../../test/repositories/in-memory-answers-repository'
import { describe, it, beforeEach } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer Question Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const answer = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova Resposta',
      title: 'Nova Resposta',
    })
    expect(answer.content).toEqual('Nova Resposta')
  })
})
