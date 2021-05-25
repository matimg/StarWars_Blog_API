import {
    Entity, Column, PrimaryGeneratedColumn,
    BaseEntity, JoinTable, OneToMany
} from 'typeorm';
import { Favorite } from './Favorite';

@Entity()
export class Planet extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    diameter: number;

    @Column()
    rotation_period: number;

    @Column()
    orbital_period: number;

    @Column()
    gravity: string;

    @Column()
    population: number;

    @Column()
    climate: string;

    @Column()
    terrain: string;

    @Column()
    surface_water: number;

    @Column()
    description: string;

    @Column()
    urlImage: string;

    @OneToMany(() => Favorite, favorite => favorite.planet)
    favorite: Favorite[];
}