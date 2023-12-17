import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Either, right } from '@/core/either'

interface createQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

type createQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: createQuestionUseCaseRequest): Promise<createQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })
    await this.questionsRepository.create(question)
    return right({
      question,
    })
  }
}
