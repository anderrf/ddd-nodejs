import { makeQuestion } from 'test/factories/make-question'
import { describe, it, beforeEach, expect } from 'vitest'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2023, 11, 15) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2023, 11, 17) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2023, 11, 12) }),
    )
    const { questions } = await sut.execute({ page: 1 })
    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2023, 11, 12) }),
      expect.objectContaining({ createdAt: new Date(2023, 11, 15) }),
      expect.objectContaining({ createdAt: new Date(2023, 11, 17) }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }
    const { questions } = await sut.execute({ page: 2 })
    expect(questions).toHaveLength(2)
  })
})
