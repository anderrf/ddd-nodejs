import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository'
import { describe, it, beforeEach } from 'vitest'
import { FindQuestionBySlugUseCase } from './find-question-by-slug'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FindQuestionBySlugUseCase

describe('Get Question by Slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FindQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })
    await inMemoryQuestionsRepository.create(newQuestion)
    const { question } = await sut.execute({ slug: 'example-question' })
    expect(question.id).toBeTruthy()
  })
})