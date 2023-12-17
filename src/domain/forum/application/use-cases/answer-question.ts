import { Answer } from './../../enterprise/entities/answer'
import { AnswersRepository } from './../repositories/answers-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Either, right } from '@/core/either'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

type AnswerQuestionUseResponse = Either<null, { answer: Answer }>

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseResponse> {
    const answer = Answer.create({
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })
    await this.answersRepository.create(answer)
    return right({ answer })
  }
}
