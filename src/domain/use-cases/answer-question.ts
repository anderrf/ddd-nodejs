import { AnswersRepository } from './../repositories/answers-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '../entities/answer'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
  title: string
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
    title,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      authorId: instructorId,
      questionId: new UniqueEntityId(questionId),
      content,
    })
    await this.answersRepository.create(answer)
    return answer
  }
}
