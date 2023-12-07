import { Entity } from '../../core/entities/entity';
import { UniqueEntityId } from '../../core/entities/unique-entity-id';
import { Optional } from '../../core/types/optional';
import { Slug } from './value-objects/slug';

interface QuestionProps{
    title: string
    content: string
    authorId: UniqueEntityId
    bestAnswerId?: UniqueEntityId
    createdAt: Date
    updatedAt?: Date
    slug: Slug
}

export class Question extends Entity<QuestionProps>{
    
    static create(props: Optional<QuestionProps, 'createdAt' | 'slug'>, id?: string){
        return new Question({
            ...props,
            createdAt: props.createdAt ?? new Date(),
            slug: props.slug ?? Slug.createFromText(props.title)
        }, id)
    }

    get title(){
        return this.props.title
    }

    get content(){
        return this.props.content
    }

    get authorId(){
        return this.props.authorId
    }

    get bestAnswerId(){
        return this.props.bestAnswerId
    }

    get createdAt(){
        return this.props.createdAt
    }

    get updatedAt(){
        return this.props.updatedAt
    }

    get slug(){
        return this.props.slug
    }

    get excerpt(){
        return this.content.substring(0, 120).trimEnd().concat('...')
    }
    
    set title(title){
        this.props.title = title
        this.props.slug = Slug.createFromText(title)
        this.touch()
    }
    
    set bestAnswerId(bestAnswerId: UniqueEntityId | undefined){
        this.props.bestAnswerId = bestAnswerId
        this.touch()
    }

    set content(content){
        this.props.content = content
        this.touch()
    }

    private touch(){
        this.props.updatedAt = new Date()
    }


}