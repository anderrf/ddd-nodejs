import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to delete answer comment', async () => {
    const answer = makeAnswer()
    await inMemoryAnswersRepository.create(answer)
    const answerComment = makeAnswerComment({ authorId: answer.authorId })
    await inMemoryAnswerCommentsRepository.create(answerComment)
    await sut.execute({
      authorId: answer.authorId.toString(),
      answerCommentId: answerComment.id.toString(),
    })
    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete answer comment from another author', async () => {
    const answer = makeAnswer()
    await inMemoryAnswersRepository.create(answer)
    const answerComment = makeAnswerComment()
    await inMemoryAnswerCommentsRepository.create(answerComment)
    await expect(() =>
      sut.execute({
        authorId: 'author-2',
        answerCommentId: answerComment.id.toString(),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
