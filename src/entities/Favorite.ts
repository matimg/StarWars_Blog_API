import {
    Entity, Column, PrimaryGeneratedColumn,
    BaseEntity, JoinTable, ManyToOne
} from 'typeorm';
import { Planet } from './Planet';
import { Users } from './Users';
import { People } from './People';

@Entity()
export class Favorite extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, user => user.favorite)
    user: Users;

    @ManyToOne(() => People, people => people.favorite)
    people: People;

    @ManyToOne(() => Planet, Planet => Planet.favorite)
    planet: Planet;
}