import {
    Entity, Column, PrimaryGeneratedColumn,
    BaseEntity, JoinTable, OneToMany
} from 'typeorm';
import { Favorite } from './Favorite';

@Entity()
export class People extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    birth_year: string;

    @Column({nullable: true})
    gender: string;

    @Column({nullable: true})
    height: string;

    @Column({nullable: true})
    mass: number;

    @Column({nullable: true})
    hair_color: string;

    @Column({nullable: true})
    skin_color: string;

    @Column({nullable: true})
    eye_color: string;

    @Column()
    description: string;

    @Column({nullable: true})
    urlImage: string;

    @OneToMany(() => Favorite, favorite => favorite.people)
    favorite: Favorite[];
}