import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to delete question comment', async () => {
    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)
    const questionComment = makeQuestionComment({ authorId: question.authorId })
    await inMemoryQuestionCommentsRepository.create(questionComment)
    await sut.execute({
      authorId: question.authorId.toString(),
      questionCommentId: questionComment.id.toString(),
    })
    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete question comment from another author', async () => {
    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)
    const questionComment = makeQuestionComment()
    await inMemoryQuestionCommentsRepository.create(questionComment)
    await expect(() =>
      sut.execute({
        authorId: 'author-2',
        questionCommentId: questionComment.id.toString(),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
