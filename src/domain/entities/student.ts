import { Entity } from '../../core/entities/entity'

interface StudentProps {
  name: string
}

export class Instructor extends Entity<StudentProps> {
  static create(props: StudentProps, id?: string) {
    return new Instructor(props, id)
  }

  get name() {
    return this.props.name
  }
}
