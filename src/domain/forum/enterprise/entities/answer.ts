import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'
import { AnswerAttachmentList } from './answer-attachment-list'
import { QuestionAttachmentList } from './question-attachment-list'

export interface AnswerProps {
  content: string
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  createdAt: Date
  updatedAt?: Date
  attachments: AnswerAttachmentList
}

export class Answer extends Entity<AnswerProps> {
  static create(
    props: Optional<AnswerProps, 'createdAt' | 'attachments'>,
    id?: UniqueEntityId,
  ) {
    return new Answer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        attachments: props.attachments ?? new AnswerAttachmentList(),
      },
      id,
    )
  }

  get content() {
    return this.props.content
  }

  set content(content) {
    this.props.content = content
    this.touch()
  }

  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get attachments(): AnswerAttachmentList {
    return this.props.attachments
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }
}
