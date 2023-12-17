import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { describe, it, beforeEach } from 'vitest'
import { EditAnswerUseCase } from './edit-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryAnswersRepository.create(newAnswer)
    const result = await sut.execute({
      authorId: 'author-1',
      answerId: 'answer-1',
      content: 'Updated new content',
    })
    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0].content).toEqual(
      'Updated new content',
    )
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: 'answer-1',
      content: 'Updated new content',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
