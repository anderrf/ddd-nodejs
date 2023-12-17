import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { describe, it, beforeEach } from 'vitest'
import { EditQuestionUseCase } from './edit-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)
    const result = await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
      title: 'Updated title',
      content: 'Updated new content',
    })
    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0].title).toEqual('Updated title')
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: 'question-1',
      title: 'Updated title',
      content: 'Updated new content',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
